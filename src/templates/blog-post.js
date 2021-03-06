import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Meta from "../components/meta"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Meta
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className="py-8 sm:py-12 lg:py-20">
          <h1 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-800 dark:text-gray-200 sm:text-4xl sm:leading-none md:text-5xl">
            {post.frontmatter.title}
          </h1>
          <div className="block text-lg font-medium text-purple-600 dark:text-purple-400 md:mt-1">
            {post.frontmatter.date}
          </div>
        </header>
        <section
          className="prose lg:prose-lg xl:prose-xl"
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
                className="text-purple-600 dark:text-purple-400 hover:underline focus:underline"
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
                className="text-purple-600 dark:text-purple-400 hover:underline focus:underline"
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
    site {
      siteMetadata {
        title
      }
    }
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
