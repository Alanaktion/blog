import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const dateSlug = (date: Date) => {
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0")
  const day = `${date.getUTCDate()}`.padStart(2, "0")
  return `${date.getUTCFullYear()}/${month}/${day}`
}

const blog = defineCollection({
  // Load Markdown files in the `content/blog/` directory.
  loader: glob({
    base: "./content/blog",
    pattern: "**/*.md",
    generateId: ({ entry, data }) => {
      const parts = entry.replace(/^\/|\/$/g, "").split("/")
      parts.pop() // Remove index.md suffix
      return `${dateSlug(data.date as Date)}/${parts.pop()}`
    },
  }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
    }),
})

export const collections = { blog }
