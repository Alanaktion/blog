/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
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
    <div className="flex items-center mb-5 font-display">
      <img src="/oobavi.svg" class="w-12 h-12 mr-2 sm:mr-3 rounded-full bg-cyan-100 dark:bg-cyan-800" alt={`Profile image for ${author.name}.`} />
      <p className="dark:text-gray-300">
        Written by{" "}
        <Link
          className="font-bold hover:underline focus-visible:underline"
          to={"/about"}
        >
          {author.name}
        </Link>
        <br />
        <a
          className="text-cyan-600 dark:text-cyan-400 hover:underline focus-visible:underline"
          href={`https://twitter.com/${social.twitter}`}
        >
          @alanaktion
        </a>
      </p>
    </div>
  )
}

export default Bio
