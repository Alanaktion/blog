import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Meta from "../components/meta"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges
  const { title, author } = data.site.siteMetadata

  const header = (
    <div className="mt-6 pt-4 sm:py-8 md:py-12 font-display">
      <h1 className="text-4xl md:text-5xl">{title} Blog</h1>
      <div className="flex gap-3 md:gap-4 items-center mt-4">
        <GatsbyImage
          image={data.avatar.childImageSharp.gatsbyImageData}
          className="rounded-full w-8 md:w-auto"
          alt={`Profile image for ${author.name}.`}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <Link
          className="text-xl hover:underline focus:underline"
          to={"/about"}
        >
          {author.name}
        </Link>
      </div>
    </div>
  )

  return (
    <Layout location={location} header={header}>
      <Meta title="Blog" />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} className="mb-8 sm:mb-16 md:mb-24">
            <header className="mb-4 sm:mb-6 lg:mb-8 font-display">
              <h3 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-800 dark:text-gray-300 sm:text-4xl sm:leading-none md:text-5xl">
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <div className="text-lg font-medium text-cyan-600 dark:text-cyan-400 md:mt-1">
                {node.frontmatter.date}
              </div>
            </header>
            <section
              className="prose-all"
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          </article>
        )
      })}

      <div className="md:mb-24">
        <Link
          className="bg-cyan-500 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white font-bold py-2 px-5 md:text-md md:py-3 md:px-6 rounded-full"
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
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData(placeholder: DOMINANT_COLOR, width: 48, height: 48, quality: 90)
      }
    }
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
