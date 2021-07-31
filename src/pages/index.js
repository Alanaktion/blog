import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Meta from "../components/meta"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges
  const { title, author } = data.site.siteMetadata

  const header = (
    <header className="relative overflow-hidden py-8 bg-purple-50 dark:bg-purpleGray-950 sm:py-16 md:py-20 lg:py-28 xl:py-32 mb-8 sm:mb-16">
      <div className="container">
        <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-800 dark:text-gray-200 sm:text-5xl sm:leading-none md:text-6xl">
          {title} Blog
        </h2>
        <div className="flex items-center mt-2 md:mt-4">
          <Image
            fixed={[
              data.avatar.childImageSharp.fixed,
              {
                ...data.avatarLg.childImageSharp.fixed,
                media: "(min-width: 768px)",
              },
            ]}
            className="mr-2 sm:mr-3 rounded-full transition-shadow"
            alt={author.name}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
          <Link
            className="block text-xl text-purple-600 dark:text-yellow-400 hover:underline focus:underline"
            to={"/about"}
          >
            {author.name}
          </Link>
        </div>
      </div>
      <svg
        className="hidden md:block absolute -right-20 lg:right-0 top-0 transform -translate-x-4 translate-y-4"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="svg-pattern-squares-1"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              className="text-purple-200 dark:text-purple-900"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#svg-pattern-squares-1)" />
      </svg>
    </header>
  )

  return (
    <Layout location={location} header={header}>
      <Meta title="Blog" />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} className="mb-8 sm:mb-16 md:mb-24">
            <header className="mb-4 sm:mb-6 lg:mb-8">
              <h3 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-800 dark:text-gray-300 sm:text-4xl sm:leading-none md:text-5xl">
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <div className="text-lg font-medium text-purple-600 dark:text-purple-400 md:mt-1">
                {node.frontmatter.date}
              </div>
            </header>
            <section
              className="prose lg:prose-lg xl:prose-xl"
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          </article>
        )
      })}

      <div className="md:mb-24">
        <Link
          className="bg-purple-500 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white font-bold py-2 px-5 md:text-md md:py-3 md:px-6 rounded-full"
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
        fixed(width: 32, height: 32, quality: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    avatarLg: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 48, height: 48, quality: 90) {
          ...GatsbyImageSharpFixed
        }
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
