// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Phpizza"
export const SITE_DESCRIPTION = "Mostly meta-blogging at this point."

export const stripMarkdown = (
  value: string,
  strip_frontmatter: boolean = false,
) => {
  if (strip_frontmatter) {
    value = value.replace(/^---[\s\S]*?---\n/g, "")
  }
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/\[[^\]]+\]\([^\)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/[>*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
