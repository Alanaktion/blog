import lunr from "lunr"
import { getCollection } from "astro:content"
import { stripMarkdown } from "../../consts"

interface IndexedPost {
  id: string
  title: string
  description: string
  body: string
}

interface SearchDocument {
  id: string
  title: string
  description: string
  url: string
}

const toSnippet = (value: string, limit = 190) => {
  if (value.length <= limit) {
    return value
  }
  return `${value.slice(0, limit).trimEnd()}...`
}

export const prerender = true

export async function GET() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  )

  const indexedPosts: IndexedPost[] = posts.map(post => {
    const body = stripMarkdown(post.body ?? "")
    return {
      id: post.id,
      title: post.data.title,
      description: post.data.description || "",
      body,
    }
  })

  const documents: SearchDocument[] = posts.map(post => {
    const body = stripMarkdown(post.body ?? "")
    const description = post.data.description || toSnippet(body)

    return {
      id: post.id,
      title: post.data.title,
      description,
      url: `/${post.id}/`,
    }
  })

  const index = lunr(function (this: lunr.Builder) {
    this.ref("id")
    this.field("title", { boost: 20 })
    this.field("description", { boost: 8 })
    this.field("body")

    indexedPosts.forEach(post => {
      this.add(post)
    })
  })

  return new Response(
    JSON.stringify({
      index: index.toJSON(),
      documents,
    }),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  )
}
