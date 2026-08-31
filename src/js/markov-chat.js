// markov-chat.js
//
// Bidirectional Markov-chain chatbot. Given a small model of forward/reverse
// n-gram transitions (built offline from the blog's own text), it seeds a
// reply from whichever transition keys match words in the user's message,
// then walks the chain backward and forward from there.

export class BidirectionalChat {
  constructor(model) {
    this.vocab = model.vocab
    this.order = model.order
    this.forward = model.forward
    this.reverse = model.reverse
    this.vocabIndex = new Map(this.vocab.map((w, idx) => [w, idx]))
  }

  static async load(url) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    const data = await res.json()
    return new BidirectionalChat(data)
  }

  findSeed(userInput) {
    const stopWords = new Set([
      "the",
      "is",
      "at",
      "which",
      "and",
      "a",
      "an",
      "to",
      "in",
    ])
    const tokens =
      userInput.toLowerCase().match(/\b\w+(?:[./':-]\w+)*\b|\.\.\.|[^\w\s]/g) ||
      []

    const matchedIds = tokens
      .filter(w => !stopWords.has(w) && this.vocabIndex.has(w))
      .map(w => this.vocabIndex.get(w))

    if (matchedIds.length === 0) return null

    const fwdKeys = Object.keys(this.forward)
    const validKeys = fwdKeys.filter(key => {
      const ids = key.split(",").map(Number)
      return ids.some(id => matchedIds.includes(id))
    })

    if (validKeys.length === 0) return null
    return validKeys[Math.floor(Math.random() * validKeys.length)]
  }

  reply(userInput, maxHalfLength = 12, maxTotalLimit = 40) {
    let seedKey = this.findSeed(userInput)

    if (!seedKey) {
      const keys = Object.keys(this.forward)
      seedKey = keys[Math.floor(Math.random() * keys.length)]
    }

    // 1. Backward Pass (with alphanumeric start check)
    const prefix = []
    let currentRevKey = seedKey

    for (let i = 0; i < maxHalfLength; i++) {
      const prevCandidates = this.reverse[currentRevKey]
      if (!prevCandidates || prevCandidates.length === 0) break

      const prevId =
        prevCandidates[Math.floor(Math.random() * prevCandidates.length)]
      const word = this.vocab[prevId]

      // Don't prepend isolated non-alphanumeric symbols as the very first word
      if (i === maxHalfLength - 1 && !/^[a-zA-Z0-9]/.test(word)) {
        break
      }

      prefix.unshift(prevId)

      const keyParts = currentRevKey.split(",").map(Number)
      currentRevKey = [prevId, ...keyParts.slice(0, -1)].join(",")
    }

    // 2. Forward Pass (generates until sentence-ending punctuation)
    const suffix = seedKey.split(",").map(Number)
    let currentFwdKey = seedKey
    let steps = 0

    while (steps < maxTotalLimit) {
      const nextCandidates = this.forward[currentFwdKey]
      if (!nextCandidates || nextCandidates.length === 0) break

      const nextId =
        nextCandidates[Math.floor(Math.random() * nextCandidates.length)]
      const word = this.vocab[nextId]

      suffix.push(nextId)
      steps++

      // Stop if we reach a token ending in sentence punctuation (. ! ?)
      // and we've reached at least a reasonable minimum length
      if (steps >= maxHalfLength / 2 && /[.!?]$/.test(word)) {
        break
      }

      const keyParts = currentFwdKey.split(",").map(Number)
      currentFwdKey = [...keyParts.slice(1), nextId].join(",")
    }

    const tokens = [...prefix, ...suffix].map(id => this.vocab[id])
    return this.formatTokens(tokens)
  }

  formatTokens(tokens) {
    return tokens
      .join(" ")
      .replace(/\s+([,.:!?%;])/g, "$1")
      .replace(/\s+(\.\.\.)/g, "$1")
      .replace(/\s+('s|'t|'re|'ve|'ll|'d)\b/g, "$1")
      .replace(/\s+/g, " ")
      .trim()
  }
}
