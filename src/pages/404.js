import React from "react"

import Layout from "../components/layout"
import Meta from "../components/meta"

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <div className="py-8 md:py-12">
        <h1 className="text-3xl leading-10 text-stone-900 dark:text-stone-300 sm:text-4xl sm:leading-none md:text-5xl mb-3 md:mb-5">
          Not Found
        </h1>
        <p className="dark:text-stone-200">
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

export const Head = () => <Meta title="404: Not Found" />
