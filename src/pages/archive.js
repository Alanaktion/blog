import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Meta from "../components/meta"

const Archive = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges

  const header = (
    <div className="mt-6 lg:mt-8 pt-4 sm:py-8 md:py-12 font-display">
      <h1 className="text-4xl md:text-5xl font-bold text-shadow-title text-rose-500 dark:text-rose-300">Blog Archive</h1>
    </div>
  )

  const colors = ["rose", "purple", "lime"]
  const colorsByYear = {}
  const years = []
  posts.forEach(({ node }) => {
    const d = new Date(node.frontmatter.date)
    const y = d.getFullYear()
    if (years.indexOf(y) === -1) {
      years.push(y)
      colorsByYear[y] = colors[y % colors.length]
    }
  })

  const postsByYear = {}
  posts.forEach(({ node }) => {
    const d = new Date(node.frontmatter.date)
    const y = d.getFullYear()
    if (postsByYear[y] === undefined) {
      postsByYear[y] = []
    }
    postsByYear[y].push(node)
  })

  return (
    <Layout location={location} header={header}>
      {years.map(year => {
        const yearClasses = {
          rose: "text-rose-700 dark:text-rose-300",
          lime: "text-lime-700 dark:text-lime-300",
          purple: "text-purple-700 dark:text-purple-300",
        }
        const cardClasses = {
          rose: "border-rose-200 dark:border-rose-600 bg-rose-200 dark:bg-rose-400 dark:focus-within:bg-rose-300 shadow-rose-500 hover:bg-rose-300 dark:hover:bg-rose-300 focus-within:bg-rose-300",
          lime: "border-lime-200 dark:border-lime-600 bg-lime-200 dark:bg-lime-400 dark:focus-within:bg-lime-300 shadow-lime-500 hover:bg-lime-300 dark:hover:bg-lime-300 focus-within:bg-lime-300",
          purple: "border-purple-200 dark:border-purple-600 bg-purple-200 dark:bg-purple-400 dark:focus-within:bg-purple-300 shadow-purple-500 hover:bg-purple-300 dark:hover:bg-purple-300 focus-within:bg-purple-300",
        }
        const linkClasses = {
          rose: "text-rose-800 dark:text-rose-900",
          lime: "text-lime-800 dark:text-lime-900",
          purple: "text-purple-800 dark:text-purple-900",
        }
        const dateClasses = {
          rose: "text-rose-600 dark:text-rose-700",
          lime: "text-lime-600 dark:text-lime-700",
          purple: "text-purple-600 dark:text-purple-700",
        }
        const color = colorsByYear[year]
        return (
          <section key={year} className="mb-8 md:mb-12">
            <h2
              className={`text-4xl font-display px-6 py-4 lg:px-8 rounded-3xl bg-white dark:bg-neutral-800 shadow-layered-light dark:shadow-layered-dark mb-4 md:mb-6 ${yearClasses[color]}`}
            >
              {year}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {postsByYear[year].map(node => {
                return (
                  <article
                    key={node.fields.slug}
                    className={`relative p-4 md:px-6 rounded-2xl border shadow-solid overflow-hidden ${cardClasses[color]}`}
                  >
                    <h3
                      className={`text-xl md:text-2xl ${linkClasses[color]} font-display`}
                    >
                      <Link
                        className="hover:underline focus-visible:underline lg:decoration-2 lg:underline-offset-2"
                        to={node.fields.slug}
                      >
                        <div className="absolute inset-0"></div>
                        {node.frontmatter.title}
                      </Link>
                    </h3>
                    <p
                      className={`${dateClasses[color]} md:text-lg font-display mb-2`}
                    >
                      {node.frontmatter.date}
                    </p>
                    <div className="prose dark:text-black">
                      <p
                        className="leading-snug"
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                      />
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )
      })}
    </Layout>
  )
}

export default Archive

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "D MMMM YYYY")
            description
          }
        }
      }
    }
  }
`

export const Head = () => <Meta title="Archive" />
