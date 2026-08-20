class CompactMarkov {
  constructor(model) {
    this.vocab = model.vocab;
    this.order = model.order;
    this.chain = model.chain;
  }

  static async load(url) {
    const res = await fetch(url);
    const data = await res.json();
    return new CompactMarkov(data);
  }

  generate(maxLength = 30) {
    const keys = Object.keys(this.chain);
    let currentKey = keys[Math.floor(Math.random() * keys.length)];
    const wordIds = currentKey.split(',').map(Number);

    for (let i = 0; i < maxLength; i++) {
      const candidates = this.chain[currentKey];
      if (!candidates || candidates.length === 0) break;

      const nextId = candidates[Math.floor(Math.random() * candidates.length)];
      wordIds.push(nextId);
      currentKey = wordIds.slice(-this.order).join(',');
    }

    return wordIds.map(id => this.vocab[id]).join(' ');
  }
}
