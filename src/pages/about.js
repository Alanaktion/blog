import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogAbout = ({ data, location }) => {
  const { author } = data.site.siteMetadata
  const header = (
    <header className="relative overflow-hidden py-8 bg-gray-100 sm:py-16 md:py-20 lg:py-28 mb-8 sm:mb-16">
      <div className="container text-center">
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          className="mx-auto mb-4 rounded-full"
          alt={author.name}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <h2 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-4xl sm:leading-none md:text-5xl sm:mb-2 md:mb-3">
          {author.name}
        </h2>
        <a
          className="inline-flex items-center text-indigo-600 hover:underline focus:underline"
          href="https://twitter.com/alanaktion"
          target="_blank"
          rel="noopener noreferrer"
        >
          @alanaktion
          <svg
            className="inline-block ml-1"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="img"
            aria-label="Twitter icon"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </a>
      </div>
      <svg
        className="hidden xl:block absolute left-0 top-0 transform translate-x-4 translate-y-4"
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
              class="text-gray-200"
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
      <SEO title="About" />
    </Layout>
  )
}

export default BlogAbout

export const pageQuery = graphql`
  query {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 128, height: 128, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
        }
        social {
          twitter
        }
      }
    }
  }
`
