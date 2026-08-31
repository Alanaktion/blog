// chat.js
//
// Wires up the floating chat widget, toggling between two reply engines:
// - "markov": BidirectionalChat, a tiny local Markov-chain model (markov-chat.js)
// - "llm": a small language model run off the main thread in chat-worker.js
//
// Both engines are loaded lazily (only once their mode is actually used) and
// cached for the rest of the page's life once loaded.

import { BidirectionalChat } from "./markov-chat.js"

const wrapper = document.querySelector(".chat-wrapper")
const toggleBtn = wrapper?.querySelector("#chatToggleBtn")
const chatWindow = wrapper?.querySelector("#chatWindow")
const iconOpen = wrapper?.querySelector(".icon-open")
const iconClose = wrapper?.querySelector(".icon-close")
const chatBox = wrapper?.querySelector("#chatBox")
const chatForm = wrapper?.querySelector("#chatForm")
const userInput = wrapper?.querySelector("#userInput")
const sendBtn = wrapper?.querySelector("#sendBtn")
const statusEl = wrapper?.querySelector("#chatStatus")
const modeButtons = wrapper?.querySelectorAll(".chat-mode-btn") ?? []

if (
  !(wrapper instanceof HTMLElement) ||
  !(toggleBtn instanceof HTMLButtonElement) ||
  !(chatWindow instanceof HTMLElement) ||
  !(chatBox instanceof HTMLElement) ||
  !(chatForm instanceof HTMLFormElement) ||
  !(userInput instanceof HTMLInputElement) ||
  !(sendBtn instanceof HTMLButtonElement) ||
  !(statusEl instanceof HTMLElement) ||
  modeButtons.length === 0
) {
  // If the chat markup is missing, do not initialize behavior.
  // This script is shared and should fail safely.
  console.warn("Chat markup is incomplete")
} else {
  const modelUrl = wrapper.dataset.modelUrl
  const llmModelUrl = wrapper.dataset.llmModelUrl

  let mode = "markov" // "markov" | "llm"
  let markovBot = null
  let worker = null
  let workerReady = false
  let resolveWorkerReady = null
  let streamingEl = null
  let greeted = false

  toggleBtn.addEventListener("click", loadEngine, { once: true })
  toggleBtn.addEventListener("click", () => {
    const isHidden = chatWindow.classList.toggle("hidden")
    iconOpen?.classList.toggle("hidden", !isHidden)
    iconClose?.classList.toggle("hidden", isHidden)
    if (!isHidden) userInput.focus()
  })

  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => switchMode(btn.dataset.mode))
  })

  function appendMessage(text, sender) {
    const msgEl = document.createElement("div")

    msgEl.className =
      sender === "user"
        ? "self-end max-w-[82%] rounded-xl rounded-br-sm bg-indigo-600 px-3 py-2 text-xs leading-relaxed text-white break-words"
        : "self-start max-w-[82%] rounded-xl rounded-bl-sm bg-mauve-100 px-3 py-2 text-xs leading-relaxed text-mauve-900 break-words dark:bg-mauve-800 dark:text-mauve-100"

    msgEl.textContent = text
    chatBox.appendChild(msgEl)
    chatBox.scrollTop = chatBox.scrollHeight
    return msgEl
  }

  function setStatus(state) {
    statusEl.classList.remove("bg-mauve-400", "bg-green-400", "bg-red-400")
    if (state === "ready") {
      statusEl.classList.add("bg-green-400")
      statusEl.setAttribute("aria-label", "Ready")
    } else if (state === "error") {
      statusEl.classList.add("bg-red-400")
      statusEl.setAttribute("aria-label", "Error")
    } else {
      statusEl.classList.add("bg-mauve-400")
      statusEl.setAttribute("aria-label", "Loading...")
    }
  }

  function updateModeButtons() {
    modeButtons.forEach(btn => {
      const active = btn.dataset.mode === mode
      btn.setAttribute("aria-pressed", String(active))
      btn.classList.toggle("bg-indigo-600", active)
      btn.classList.toggle("text-white", active)
      btn.classList.toggle("text-mauve-600", !active)
      btn.classList.toggle("dark:text-mauve-300", !active)
    })
  }

  function setUIBusy(busy) {
    userInput.disabled = busy
    sendBtn.disabled = busy
    modeButtons.forEach(btn => (btn.disabled = busy))
  }

  async function ensureMarkovReady() {
    if (markovBot) return true
    try {
      markovBot = await BidirectionalChat.load(modelUrl)
      return true
    } catch (err) {
      console.error(err)
      appendMessage("Failed to load Markov model.", "bot")
      return false
    }
  }

  function getWorker() {
    if (worker) return worker

    // Bundled by Vite: resolves to a hashed, ES-module worker chunk. Its own
    // CDN imports (onnxruntime-web, transformers.js) stay external rather
    // than getting inlined - see the `vite.worker.format` note in
    // astro.config.mjs.
    worker = new Worker(new URL("./chat-worker.js", import.meta.url), {
      type: "module",
    })
    worker.onmessage = event => {
      const { type, text, backend } = event.data

      switch (type) {
        case "backend":
          console.log(`chat-worker backend: ${backend}`)
          break
        case "ready":
          workerReady = true
          resolveWorkerReady?.(true)
          break
        case "token":
          if (streamingEl) {
            streamingEl.textContent = text
            chatBox.scrollTop = chatBox.scrollHeight
          }
          break
        case "done":
          if (streamingEl) streamingEl.textContent = text || "…"
          streamingEl = null
          setUIBusy(false)
          userInput.focus()
          break
        case "error":
          console.error(text)
          if (streamingEl) {
            streamingEl.textContent = `Error: ${text}`
            streamingEl = null
          } else if (workerReady) {
            // Not an init failure (that's reported by ensureLlmReady instead).
            appendMessage(`Error: ${text}`, "bot")
          }
          resolveWorkerReady?.(false)
          setUIBusy(false)
          break
      }
    }

    return worker
  }

  async function ensureLlmReady() {
    if (workerReady) return true

    const ready = new Promise(resolve => {
      resolveWorkerReady = resolve
    })
    getWorker().postMessage({
      type: "init",
      payload: { modelUrl: llmModelUrl },
    })
    const ok = await ready
    if (!ok) appendMessage("Failed to load LLM model.", "bot")
    return ok
  }

  async function loadEngine() {
    setUIBusy(true)
    sendBtn.textContent = "Loading model..."
    setStatus("loading")

    const ok =
      mode === "markov" ? await ensureMarkovReady() : await ensureLlmReady()

    sendBtn.textContent = "Send"
    if (ok) {
      setStatus("ready")
      setUIBusy(false)
      if (!greeted) {
        appendMessage("I'm a blog. Let's chat!", "bot")
        greeted = true
      }
      userInput.focus()
    } else {
      setStatus("error")
    }
  }

  async function switchMode(newMode) {
    if (newMode === mode || sendBtn.disabled) return

    mode = newMode
    updateModeButtons()

    const alreadyLoaded = mode === "markov" ? !!markovBot : workerReady
    if (alreadyLoaded) {
      setStatus("ready")
      return
    }

    await loadEngine()
  }

  chatForm.addEventListener("submit", e => {
    e.preventDefault()
    const text = userInput.value.trim()
    if (!text) return

    appendMessage(text, "user")
    userInput.value = ""

    if (mode === "markov") {
      if (!markovBot) return
      setTimeout(() => {
        const responseText = markovBot.reply(text)
        appendMessage(responseText, "bot")
      }, 50)
      return
    }

    if (!workerReady) return
    setUIBusy(true)
    streamingEl = appendMessage("…", "bot")
    worker.postMessage({
      type: "generate",
      payload: {
        prompt: text,
        options: {
          maxNewTokens: 120,
          temperature: 0.7,
          topP: 0.9,
          repetitionPenalty: 1.15,
        },
      },
    })
  })
}
