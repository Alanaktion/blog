export function cleanMarkdown(rawText) {
  return rawText
    // Remove YAML Frontmatter (common in static site generators / blog posts)
    .replace(/^---[\s\S]*?---\n/g, '')
    // Remove code blocks (```code``` and `code`)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove Markdown links [Text](URL) -> keep 'Text'
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images ![Alt](URL)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove headers (# Header)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove emphasis (*bold*, _italic_, **bold**)
    .replace(/(\*\*|__|\*|_)(.*?)\1/g, '$2')
    // Remove blockquotes (>) and bullet points (*, -)
    .replace(/^[>*\-\+]\s+/gm, '')
    // Normalize multiple spaces / newlines into clean single spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// export const tokenMatch = /\b[\w'-]+\b|[^\w\s]/g;
// export const tokenMatch = /\.\.\.|[\w'-]+|[^\w\s]/g;
export const tokenMatch = /\b\w+(?:[./':-]\w+)*\b|\.\.\.|[^\w\s]/g;
