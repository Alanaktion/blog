import { getCollection } from "astro:content"
import { stripMarkdown } from "../../consts"

const TOKEN_MATCH = /\b\w+(?:[./':-]\w+)*\b|\.\.\.|[^\w\s]/g

function buildBidirectionalMarkov(corpusText: string, order = 2) {
  const tokens = corpusText.toLowerCase().match(TOKEN_MATCH) || []
  const vocabMap = new Map()
  const vocabList: string[] = []

  function getWordId(word: string) {
    if (!vocabMap.has(word)) {
      vocabMap.set(word, vocabList.length)
      vocabList.push(word)
    }
    return vocabMap.get(word)
  }

  const forwardMap = new Map()
  const reverseMap = new Map()

  // Sliding window across the corpus
  for (let i = 0; i <= tokens.length - (order + 1); i++) {
    const window = tokens.slice(i, i + order + 1).map(getWordId)

    // Forward Key: First 'order' words -> Next word
    const fwdKey = window.slice(0, order).join(",")
    const fwdNext = window[order]

    if (!forwardMap.has(fwdKey)) forwardMap.set(fwdKey, [])
    forwardMap.get(fwdKey).push(fwdNext)

    // Reverse Key: Last 'order' words -> Previous word
    const revKey = window.slice(1).join(",")
    const revPrev = window[0]

    if (!reverseMap.has(revKey)) reverseMap.set(revKey, [])
    reverseMap.get(revKey).push(revPrev)
  }

  // Convert Maps to plain serializable objects
  const forward = Object.fromEntries(forwardMap)
  const reverse = Object.fromEntries(reverseMap)

  return { vocab: vocabList, order, forward, reverse }
}

export const prerender = true

export async function GET() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  )

  const corpus = posts.reduce(
    (text, post) => text + "\n" + stripMarkdown(post.body ?? "", true),
    "",
  )
  const modelData = buildBidirectionalMarkov(corpus, 2)
  return new Response(JSON.stringify(modelData), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}
