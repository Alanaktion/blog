/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 90) {
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
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className="flex items-center mb-5">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        className="mr-2 sm:mr-3 transition-shadow"
        style={{
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p class="dark:text-gray-300">
        Written by{" "}
        <Link
          className="font-bold hover:underline focus:underline"
          to={"/about"}
        >
          {author.name}
        </Link>
        <br />
        <a
          className="text-indigo-600 dark:text-teal-600 hover:underline focus:underline"
          href={`https://twitter.com/${social.twitter}`}
        >
          @alanaktion
        </a>
      </p>
    </div>
  )
}

export default Bio
