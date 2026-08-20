class BidirectionalChat {
  constructor(model) {
    this.vocab = model.vocab;
    this.order = model.order;
    this.forward = model.forward;
    this.reverse = model.reverse;

    // Reverse lookup for string-to-ID conversion
    this.vocabIndex = new Map(this.vocab.map((w, idx) => [w, idx]));
  }

  static async load(url) {
    const res = await fetch(url);
    const data = await res.json();
    return new BidirectionalChat(data);
  }

  // Find a matching key tuple containing one of the user's words
  findSeed(userInput) {
    const stopWords = new Set(['the', 'is', 'at', 'which', 'and', 'a', 'an', 'to', 'in']);
    const tokens = userInput.toLowerCase().match(/\w+/g) || [];

    const matchedIds = tokens
      .filter(w => !stopWords.has(w) && this.vocabIndex.has(w))
      .map(w => this.vocabIndex.get(w));

    if (matchedIds.length === 0) return null;

    // Search forward keys for any key containing one of our matched IDs
    const fwdKeys = Object.keys(this.forward);
    const validKeys = fwdKeys.filter(key => {
      const ids = key.split(',').map(Number);
      return ids.some(id => matchedIds.includes(id));
    });

    if (validKeys.length === 0) return null;
    return validKeys[Math.floor(Math.random() * validKeys.length)];
  }

  reply(userInput, maxHalfLength = 15) {
    let seedKey = this.findSeed(userInput);

    // Fallback if user input has no vocabulary matches
    if (!seedKey) {
      const keys = Object.keys(this.forward);
      seedKey = keys[Math.floor(Math.random() * keys.length)];
    }

    // 1. Walk Backward
    const prefix = [];
    let currentRevKey = seedKey;

    for (let i = 0; i < maxHalfLength; i++) {
      const prevCandidates = this.reverse[currentRevKey];
      if (!prevCandidates || prevCandidates.length === 0) break;

      const prevId = prevCandidates[Math.floor(Math.random() * prevCandidates.length)];
      prefix.unshift(prevId);

      // Shift window left: [prevId, first_part_of_currentKey]
      const keyParts = currentRevKey.split(',').map(Number);
      currentRevKey = [prevId, ...keyParts.slice(0, -1)].join(',');
    }

    // 2. Walk Forward
    const suffix = seedKey.split(',').map(Number);
    let currentFwdKey = seedKey;

    for (let i = 0; i < maxHalfLength; i++) {
      const nextCandidates = this.forward[currentFwdKey];
      if (!nextCandidates || nextCandidates.length === 0) break;

      const nextId = nextCandidates[Math.floor(Math.random() * nextCandidates.length)];
      suffix.push(nextId);

      // Shift window right: [last_part_of_currentKey, nextId]
      const keyParts = currentFwdKey.split(',').map(Number);
      currentFwdKey = [...keyParts.slice(1), nextId].join(',');
    }

    // Combine prefix + seed + suffix
    const fullSequence = [...prefix, ...suffix];
    const tokens = fullSequence.map(id => this.vocab[id]);
    return tokens
        .join(' ')
        // Remove space before standard trailing punctuation: , . ! ? : ; %
        .replace(/\s+([,.:!?%;]+)/g, '$1')
        // Clean up extra inner white space
        .replace(/\s+/g, ' ')
        .trim();
  }
}
