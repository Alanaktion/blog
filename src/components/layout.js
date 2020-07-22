import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import Nav from "./nav"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const bio = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      avatarLg: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 48, height: 48) {
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
    }
  `)

  let header
  if (location.pathname === rootPath) {
    const { title, author } = bio.site.siteMetadata;
    header = (
      <header className="relative overflow-hidden py-8 bg-gray-100 sm:py-16 md:py-20 lg:py-28 xl:py-32 mb-8 sm:mb-16">
        <div className="container">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            {title} Blog
          </h2>
          <div className="flex items-center mt-2 md:mt-4">
            <Image
              fixed={[
                bio.avatar.childImageSharp.fixed,
                {
                  ...bio.avatarLg.childImageSharp.fixed,
                  media: '(min-width: 768px)',
                }
              ]}
              className="mr-2 sm:mr-3 rounded-full"
              alt={author.name}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <Link
              className="block text-xl text-indigo-600 hover:underline focus:underline"
              to={'/about'}
            >
              {author.name}
            </Link>
          </div>
        </div>
        <svg
          className="hidden md:block absolute right-0 top-0 transform -translate-x-4 translate-y-4"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true">
          <defs>
            <pattern id="svg-pattern-squares-1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#svg-pattern-squares-1)" />
        </svg>
      </header>
    )
  }

  return (
    <>
      <Nav title={title} location={location} />
      {header}
      <div className="container mb-12 md:mb-16">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
