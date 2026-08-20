class WordMarkov {
  constructor(order = 2) {
    this.order = order;
    this.chain = new Map();
  }

  train(text) {
    const tokens = text.toLowerCase().match(/\w+|[^\w\s]/g) || [];
    for (let i = 0; i <= tokens.length - this.order; i++) {
      const key = tokens.slice(i, i + this.order).join(' ');
      const nextToken = tokens[i + this.order];
      if (!this.chain.has(key)) this.chain.set(key, []);
      if (nextToken) this.chain.get(key).push(nextToken);
    }
  }

  generate(maxLength = 30) {
    const keys = Array.from(this.chain.keys());
    let currentKey = keys[Math.floor(Math.random() * keys.length)];
    const result = currentKey.split(' ');

    for (let i = 0; i < maxLength; i++) {
      const candidates = this.chain.get(currentKey);
      if (!candidates || candidates.length === 0) break;
      const nextWord = candidates[Math.floor(Math.random() * candidates.length)];
      result.push(nextWord);
      currentKey = result.slice(-this.order).join(' ');
    }
    return result.join(' ');
  }
}
