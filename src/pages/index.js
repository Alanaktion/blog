import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Meta from "../components/meta"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges

  const header = (
    <div className="mt-6 lg:mt-8 pt-4 sm:py-8 md:py-12 font-display">
      <h1 className="text-4xl md:text-5xl font-bold text-shadow-title text-indigo-500 dark:text-indigo-400">
        My Blog
      </h1>
    </div>
  )

  return (
    <Layout location={location} header={header}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article
            key={node.fields.slug}
            className="flex flex-col mb-8 sm:mb-16 md:mb-24"
          >
            <header className="sm:mb-6 lg:mb-8 font-display px-6 py-4 lg:px-8 -mx-4 sm:mx-0 sm:rounded-xl lg:rounded-3xl text-indigo-900 bg-indigo-50 sm:bg-white dark:sm:bg-indigo-300 border-b-2 border-indigo-800 md:shadow-solid shadow-indigo-800 sm:self-start">
              <h3 className="text-3xl leading-10 sm:text-4xl sm:leading-none">
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <div className="text-lg text-indigo-600 md:mt-1">
                {node.frontmatter.date}
              </div>
            </header>
            <section
              className="prose-all prose-indigo shadow-layered-light bg-white dark:shadow-layered-dark dark:bg-slate-800 px-6 py-4 lg:px-8 -mx-4 sm:mx-0 sm:rounded-xl lg:rounded-3xl"
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          </article>
        )
      })}

      <div className="md:mb-24">
        <Link
          className="bg-gradient-starlight hover:brightness-110 text-white font-bold py-2 px-5 md:text-md md:py-3 md:px-6 rounded-full"
          to={"/archive"}
        >
          See more posts →
        </Link>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 5) {
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

export const Head = () => <Meta title="Blog" />
