import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className="py-8 sm:py-12 lg:py-20">
          <h1 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-4xl sm:leading-none md:text-5xl">
            {post.frontmatter.title}
          </h1>
          <div className="block text-lg font-medium text-indigo-600 md:mt-1">
            {post.frontmatter.date}
          </div>
        </header>
        <section
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr className="my-4 md:my-8 lg:my-12" />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="md:mt-8 lg:mt-12">
        <ul className="sm:flex flex-wrap justify-space-between list-style-none p-0">
          {previous && (
            <li>
              <Link
                className="text-indigo-600 hover:underline focus:underline"
                to={previous.fields.slug}
                rel="prev"
              >
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}
          {next && (
            <li className="sm:ml-auto">
              <Link
                className="text-indigo-600 hover:underline focus:underline"
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
        date(formatString: "DD MMMM, YYYY")
        description
      }
    }
  }
`
