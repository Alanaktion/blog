class MarkovChat extends CompactMarkov {
  // Extract candidate tokens from user input
  extractKeywords(input) {
    const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'and', 'or', 'to', 'in', 'of', 'it', 'that', 'you', 'i']);
    return input
      .toLowerCase()
      .match(/\w+/g)
      ?.filter(word => !stopWords.has(word) && this.vocab.includes(word)) || [];
  }

  // Find a starting key index matching user input
  findSeedKey(input) {
    const keywords = this.extractKeywords(input);
    if (keywords.length === 0) return null;

    // Convert keywords to vocab IDs
    const keywordIds = keywords.map(w => this.vocab.indexOf(w));
    const allKeys = Object.keys(this.chain);

    // Look for keys containing any of the keyword IDs
    const matchingKeys = allKeys.filter(key => {
      const ids = key.split(',').map(Number);
      return ids.some(id => keywordIds.includes(id));
    });

    if (matchingKeys.length > 0) {
      return matchingKeys[Math.floor(Math.random() * matchingKeys.length)];
    }

    return null;
  }

  reply(userInput, maxLength = 30) {
    let startKey = this.findSeedKey(userInput);

    // Fallback: Pick a random key if no direct keyword match exists
    if (!startKey) {
      const keys = Object.keys(this.chain);
      startKey = keys[Math.floor(Math.random() * keys.length)];
    }

    const wordIds = startKey.split(',').map(Number);
    let currentKey = startKey;

    for (let i = 0; i < maxLength; i++) {
      const candidates = this.chain[currentKey];
      if (!candidates || candidates.length === 0) break;

      const nextId = candidates[Math.floor(Math.random() * candidates.length)];
      wordIds.push(nextId);
      currentKey = wordIds.slice(-this.order).join(',');
    }

    const tokens = wordIds.map(id => this.vocab[id]);
    return tokens
        .join(' ')
        // Remove space before standard trailing punctuation: , . ! ? : ; %
        .replace(/\s+([,.:!?%;]+)/g, '$1')
        // Clean up extra inner white space
        .replace(/\s+/g, ' ')
        .trim();
  }
}
