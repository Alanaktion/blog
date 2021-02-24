import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <div className="py-8 md:py-12">
        <h1 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 dark:text-gray-300 sm:text-4xl sm:leading-none md:text-5xl mb-3 md:mb-5">
          Not Found
        </h1>
        <p class="dark:text-gray-200">
          This page doesn't exist{" "}
          <span role="img" aria-label="upside-down face">
            🙃
          </span>
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
