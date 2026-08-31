// tokenizer.js
//
// Wraps @xenova/transformers' AutoTokenizer purely for tokenization. We do
// NOT use its model-loading side (Ember-2's custom recurrent/XSA
// architecture isn't one of its registered archs) — the actual forward pass
// happens in worker.js via onnxruntime-web against the ONNX export. All this
// needs is a standard HF fast tokenizer (tokenizer.json), which
// AutoTokenizer.save_pretrained() already produced in the exported model
// folder, so no custom code is required here.

import {
  AutoTokenizer,
  env,
} from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js"

// Load tokenizer.json etc. from /model/ instead of huggingface.
env.allowLocalModels = true
env.allowRemoteModels = false
env.localModelPath = "/"

export async function loadTokenizer(modelFolder = "model") {
  const tok = await AutoTokenizer.from_pretrained(modelFolder)

  // tokenizer_config.json here has tokenizer_class "TokenizersBackend",
  // which transformers.js 2.x doesn't recognize, so it falls back to the
  // generic PreTrainedTokenizer and never wires up tok.eos_token /
  // tok.eos_token_id (verified: both come back undefined). Read eos_token
  // straight from tokenizer_config.json ourselves and resolve it through
  // the BPE model's own vocab instead.
  let eosTokenId
  try {
    const res = await fetch(`/${modelFolder}/tokenizer_config.json`)
    const cfg = await res.json()
    if (cfg.eos_token) {
      eosTokenId = tok.model?.tokens_to_ids?.get(cfg.eos_token)
    }
  } catch (err) {
    console.warn(
      "Could not resolve eos_token_id; generation will run to maxNewTokens.",
      err,
    )
  }

  return {
    encode(text) {
      return tok.encode(text)
    },
    decode(ids) {
      return tok.decode(ids, { skip_special_tokens: true })
    },
    eosTokenId,
  }
}
