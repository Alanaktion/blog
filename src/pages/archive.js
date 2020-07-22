import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const years = []
  posts.forEach(({ node }) => {
    const d = new Date(node.frontmatter.date)
    const y = d.getFullYear()
    if (years.indexOf(y) === -1) {
      years.push(y)
    }
  })

  const postsByYear = {}
  posts.forEach(({ node }) => {
    const d = new Date(node.frontmatter.date)
    const y = d.getFullYear()
    if (postsByYear[y] === undefined) {
      postsByYear[y] = []
    }
    postsByYear[y].push(node)
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Archive" />

      {years.map(year => {
        return (
          <div className="sm:flex mt-4 mb-8 sm:mt-8 md:my-12">
            <h2 className="mb-2 sm:mb-0 sm:mr-6 md:mr-8 lg:mr-12 sm:mb-4 text-3xl tracking-tight leading-10 font-extrabold text-gray-500 sm:text-4xl sm:leading-none md:text-5xl">
              {year}
            </h2>
            <div className="flex-1 lg:max-w-3xl">
              {postsByYear[year].map(node => {
                return (
                  <article
                    key={node.fields.slug}
                    className="relative mb-4 sm:mb-6"
                  >
                    <header className="mb-2">
                      <h3 className="font-bold text-gray-900 text-xl sm:text-2xl md:text-3xl">
                        <Link className="hover:underline focus:underline" to={node.fields.slug}>
                          {node.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="text-indigo-600 text-lg">
                        {node.frontmatter.date}
                      </p>
                    </header>
                    <section className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
                      <p
                        className="leading-snug"
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </section>
                  </article>
                )
              })}
            </div>
          </div>
        )
      })}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
        }
      }
    }
  }
`
