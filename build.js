import fs from 'node:fs';

import { cleanMarkdown, tokenMatch } from './build_helpers.mjs';

function buildCompactMarkov(corpusText, order = 2) {
  const tokens = corpusText.toLowerCase().match(tokenMatch) || [];
  const vocabMap = new Map();
  const vocabList = [];

  function getWordId(word) {
    if (!vocabMap.has(word)) {
      vocabMap.set(word, vocabList.length);
      vocabList.push(word);
    }
    return vocabMap.get(word);
  }

  // Raw chain mapping string key -> array of next word IDs
  const rawChain = new Map();

  for (let i = 0; i <= tokens.length - order; i++) {
    const key = tokens.slice(i, i + order).map(getWordId).join(',');
    const nextId = tokens[i + order] !== undefined ? getWordId(tokens[i + order]) : null;

    if (!rawChain.has(key)) rawChain.set(key, []);
    if (nextId !== null) rawChain.get(key).push(nextId);
  }

  // Convert map to plain object
  const chain = {};
  for (const [key, nextIds] of rawChain.entries()) {
    chain[key] = nextIds;
  }

  return { vocab: vocabList, order, chain };
}

// Read raw text archive and output compact JSON
const corpus = fs.readFileSync('./corpus.txt', 'utf-8');
const cleanedCorpus = cleanMarkdown(corpus);
const data = buildCompactMarkov(cleanedCorpus, 2);

fs.writeFileSync('./markov_model.json', JSON.stringify(data));
