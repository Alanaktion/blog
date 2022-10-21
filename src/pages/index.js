import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Meta from "../components/meta"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges
  const { title, author } = data.site.siteMetadata

  const header = (
    <div className="mt-6 pt-4 sm:py-8 md:py-12 font-display">
      <h1 className="text-4xl md:text-5xl">{title} Blog</h1>
      <div className="flex gap-3 md:gap-4 items-center mt-4">
        <img src="/oobavi.svg" className="rounded-full w-8 h-8 md:w-12 md:h-12 bg-pink-200 dark:bg-pink-800" alt={`Cartoon render of ${author.name} based on an Ooblets character.`} />
        <Link
          className="text-xl hover:underline focus-visible:underline"
          to={"/about"}
        >
          {author.name}
        </Link>
      </div>
    </div>
  )

  return (
    <Layout location={location} header={header} color="pink">
      <Meta title="Blog" />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} className="mb-8 sm:mb-16 md:mb-24">
            <header className="mb-4 sm:mb-6 lg:mb-8 font-display">
              <h3 className="text-3xl leading-10 text-zinc-800 dark:text-zinc-300 sm:text-4xl sm:leading-none md:text-5xl">
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <div className="text-lg text-pink-600 dark:text-pink-400 md:mt-1">
                {node.frontmatter.date}
              </div>
            </header>
            <section
              className="prose-all prose-pink"
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          </article>
        )
      })}

      <div className="md:mb-24">
        <Link
          className="bg-gradient-rainbow hover:brightness-105 text-white font-bold py-2 px-5 md:text-md md:py-3 md:px-6 rounded-full"
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
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
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
