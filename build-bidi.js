import fs from 'node:fs';

import { cleanMarkdown, tokenMatch } from './build_helpers.mjs';

function buildBidirectionalMarkov(corpusText, order = 2) {
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

  const forwardMap = new Map();
  const reverseMap = new Map();

  // Sliding window across the corpus
  for (let i = 0; i <= tokens.length - (order + 1); i++) {
    const window = tokens.slice(i, i + order + 1).map(getWordId);

    // Forward Key: First 'order' words -> Next word
    const fwdKey = window.slice(0, order).join(',');
    const fwdNext = window[order];

    if (!forwardMap.has(fwdKey)) forwardMap.set(fwdKey, []);
    forwardMap.get(fwdKey).push(fwdNext);

    // Reverse Key: Last 'order' words -> Previous word
    const revKey = window.slice(1).join(',');
    const revPrev = window[0];

    if (!reverseMap.has(revKey)) reverseMap.set(revKey, []);
    reverseMap.get(revKey).push(revPrev);
  }

  // Convert Maps to plain serializable objects
  const forward = Object.fromEntries(forwardMap);
  const reverse = Object.fromEntries(reverseMap);

  return { vocab: vocabList, order, forward, reverse };
}

// Read raw text archive and output compact JSON
const corpus = fs.readFileSync('./corpus.txt', 'utf-8');
const cleanedCorpus = cleanMarkdown(corpus);
const modelData = buildBidirectionalMarkov(cleanedCorpus, 2);

fs.writeFileSync('./markov_model-bidi.json', JSON.stringify(modelData));
console.log(`Model built: ${modelData.vocab.length} unique words.`);
