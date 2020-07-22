import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article
            key={node.fields.slug}
            className="mb-8 sm:mb-16 md:mb-24">
            <header className="mb-4 sm:mb-6 lg:mb-8">
              <h3 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-4xl sm:leading-none md:text-5xl">
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <div className="text-lg font-medium text-indigo-600 md:mt-1">
                {node.frontmatter.date}
              </div>
            </header>
            <section
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          </article>
        )
      })}

      <div className="md:mb-24">
        <Link
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-5 md:text-md md:py-3 md:px-6 rounded-full"
          to={'/archive'}
        >
          See more posts →
        </Link>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`
