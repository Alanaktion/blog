import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Meta from "../components/meta"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  const colors = ["pink", "cyan", "yellow"]
  const yearColor = colors[new Date(post.frontmatter.date).getFullYear() % colors.length]
  const textClasses = {
    pink: "text-pink-600 dark:text-pink-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    cyan: "text-cyan-600 dark:text-cyan-400",
  }
  const textClass = textClasses[yearColor]
  const proseClass = {
    pink: "prose-pink",
    yellow: "prose-yellow",
    cyan: "prose-cyan",
  }[yearColor]

  return (
    <Layout location={location} color={yearColor}>
      <article>
        <header className="py-8 sm:py-12 lg:py-20 font-display">
          <h1 className="text-3xl leading-10 text-zinc-800 dark:text-zinc-200 sm:text-4xl sm:leading-none md:text-5xl">
            {post.frontmatter.title}
          </h1>
          <div className={`block text-lg font-medium ${textClass} md:mt-1`}>
            {post.frontmatter.date}
          </div>
        </header>
        <section
          className={`prose-all ${proseClass}`}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="md:mt-8 lg:mt-12">
        <ul className="flex flex-wrap justify-space-between list-style-none p-0">
          {previous && (
            <li className="mr-4 mb-4 sm:mb-0">
              <Link
                className={`${textClass} hover:underline focus-visible:underline`}
                to={previous.fields.slug}
                rel="prev"
              >
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}
          {next && (
            <li className="ml-auto">
              <Link
                className={`${textClass} hover:underline focus-visible:underline`}
                to={next.fields.slug}
                rel="next"
              >
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
        description
      }
    }
  }
`

export const Head = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Meta
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}
