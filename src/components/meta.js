/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Meta = ({ title, description, pathname, children }) => {
  const meta = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `).site.siteMetadata

  const metaDescription = description || meta.description
  const metaTitle = title ? `${title} — ${meta.title}` : meta.title
  const url = `${meta.siteUrl}${pathname || ""}`

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Meta
