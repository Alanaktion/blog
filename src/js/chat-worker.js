// chat-worker.js (Web Worker thread)

import * as ort from "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.19.2/dist/ort.webgpu.min.mjs"
import { loadTokenizer } from "./tokenizer.js"

ort.env.wasm.wasmPaths =
  "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.19.2/dist/"

let session = null
let tokenizer = null

async function init(modelUrl) {
  tokenizer = await loadTokenizer()

  try {
    session = await ort.InferenceSession.create(modelUrl, {
      executionProviders: ["webgpu"],
    })
    self.postMessage({ type: "backend", backend: "webgpu" })
  } catch (err) {
    console.warn(
      "WebGPU execution provider unavailable, falling back to wasm:",
      err,
    )
    session = await ort.InferenceSession.create(modelUrl, {
      executionProviders: ["wasm"],
    })
    self.postMessage({ type: "backend", backend: "wasm" })
  }
}

// Temperature + repetition penalty + nucleus (top-p) sampling over a single
// step's logits. `generatedIds` is a Set of token ids already emitted
// (prompt + generation so far).
function sampleNextToken(
  logits,
  generatedIds,
  { temperature, topP, repetitionPenalty },
) {
  const vocabSize = logits.length
  const scaled = new Float32Array(vocabSize)
  const temp = Math.max(temperature, 1e-6)

  for (let i = 0; i < vocabSize; i++) {
    let v = logits[i] / temp
    if (generatedIds.has(i)) {
      v = v > 0 ? v / repetitionPenalty : v * repetitionPenalty
    }
    scaled[i] = v
  }

  let max = -Infinity
  for (let i = 0; i < vocabSize; i++) if (scaled[i] > max) max = scaled[i]

  let sum = 0
  const exps = new Float32Array(vocabSize)
  for (let i = 0; i < vocabSize; i++) {
    exps[i] = Math.exp(scaled[i] - max)
    sum += exps[i]
  }
  const probs = exps.map(v => v / sum)

  const order = Array.from(probs.keys()).sort((a, b) => probs[b] - probs[a])
  let cum = 0
  const kept = []
  for (const idx of order) {
    kept.push(idx)
    cum += probs[idx]
    if (cum >= topP) break
  }

  const keptSum = kept.reduce((acc, idx) => acc + probs[idx], 0)
  let r = Math.random() * keptSum
  for (const idx of kept) {
    r -= probs[idx]
    if (r <= 0) return idx
  }
  return kept[kept.length - 1]
}

async function generate(prompt, options = {}) {
  const {
    maxNewTokens = 120,
    temperature = 0.7,
    topP = 0.9,
    repetitionPenalty = 1.15,
  } = options

  const promptIds = Array.from(tokenizer.encode(prompt))
  const ids = [...promptIds]
  const promptLen = ids.length
  const seen = new Set(ids)

  const start = performance.now()

  for (let step = 0; step < maxNewTokens; step++) {
    const seqLen = ids.length
    const inputIds = new ort.Tensor(
      "int64",
      BigInt64Array.from(ids.map(id => BigInt(id))),
      [1, seqLen],
    )
    const attentionMask = new ort.Tensor(
      "int64",
      BigInt64Array.from(ids.map(() => 1n)),
      [1, seqLen],
    )

    const results = await session.run({
      input_ids: inputIds,
      attention_mask: attentionMask,
    })
    const logitsTensor = results.logits
    const [, dimSeqLen, vocabSize] = logitsTensor.dims
    const lastLogits = logitsTensor.data.slice(
      (dimSeqLen - 1) * vocabSize,
      dimSeqLen * vocabSize,
    )

    const nextId = sampleNextToken(lastLogits, seen, {
      temperature,
      topP,
      repetitionPenalty,
    })
    ids.push(nextId)
    seen.add(nextId)

    if (tokenizer.eosTokenId !== undefined && nextId === tokenizer.eosTokenId) {
      break
    }

    const generatedCount = ids.length - promptLen
    const elapsedSec = (performance.now() - start) / 1000
    self.postMessage({
      type: "token",
      text: tokenizer.decode(ids.slice(promptLen)),
      tokensPerSecond: elapsedSec > 0 ? generatedCount / elapsedSec : 0,
    })
  }

  self.postMessage({
    type: "done",
    text: tokenizer.decode(ids.slice(promptLen)),
  })
}

self.onmessage = async event => {
  const { type, payload } = event.data
  try {
    if (type === "init") {
      await init(payload.modelUrl)
      self.postMessage({ type: "ready" })
    } else if (type === "generate") {
      await generate(payload.prompt, payload.options)
    }
  } catch (err) {
    self.postMessage({
      type: "error",
      text: String(err && err.message ? err.message : err),
    })
  }
}
