import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Meta from "../components/meta"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout location={location}>
      <article>
        <header className="pb-8 sm:pb-12 lg:pb-20 font-display">
          <h1 className="text-4xl md:text-5xl font-bold text-shadow-title text-rose-500 dark:text-rose-300 mb-2 md:mb-4">
            {post.frontmatter.title}
          </h1>
          <div className="inline-block px-3 rounded-xl text-lg font-bold bg-white shadow-solid text-rose-600 dark:bg-rose-50 shadow-rose-800 md:mt-2">
            {post.frontmatter.date}
          </div>
        </header>
        <section
          className="prose-all prose-rose shadow-layered-light bg-white dark:shadow-layered-dark dark:bg-stone-800 px-6 py-4 lg:px-8 -mx-4 sm:mx-0 sm:rounded-xl lg:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <nav className="md:mt-8 lg:mt-12">
        <ul className="flex flex-wrap justify-space-between list-style-none p-0">
          {previous && (
            <li className="mr-4 mb-4 sm:mb-0">
              <Link
                className="px-4 py-2 bg-rose-200 dark:bg-transparent rounded-full text-rose-900 dark:text-rose-50 hover:ring-3 focus:ring-3 ring-rose-600"
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
                className="px-4 py-2 bg-rose-200 dark:bg-transparent rounded-full text-rose-900 dark:text-rose-50 hover:ring-3 focus:ring-3 ring-rose-600"
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
