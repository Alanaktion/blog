import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Meta from "../components/meta"

const Archive = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges

  const header = (
    <div className="mt-6 lg:mt-8 pt-4 sm:py-8 md:py-12 font-display">
      <h1 className="text-4xl md:text-5xl font-bold text-shadow-title text-indigo-500 dark:text-indigo-300">Blog Archive</h1>
    </div>
  )

  const colors = ["indigo", "amber", "teal"]
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
          indigo: "text-indigo-700 dark:text-indigo-300",
          teal: "text-teal-700 dark:text-teal-300",
          amber: "text-amber-700 dark:text-amber-300",
        }
        const cardClasses = {
          indigo: "border-indigo-200 dark:border-indigo-600 bg-indigo-200 dark:bg-indigo-400 dark:focus-within:bg-indigo-300 shadow-indigo-500 hover:bg-indigo-300 dark:hover:bg-indigo-300 focus-within:bg-indigo-300",
          teal: "border-teal-200 dark:border-teal-600 bg-teal-200 dark:bg-teal-400 dark:focus-within:bg-teal-300 shadow-teal-500 hover:bg-teal-300 dark:hover:bg-teal-300 focus-within:bg-teal-300",
          amber: "border-amber-200 dark:border-amber-600 bg-amber-200 dark:bg-amber-400 dark:focus-within:bg-amber-300 shadow-amber-500 hover:bg-amber-300 dark:hover:bg-amber-300 focus-within:bg-amber-300",
        }
        const linkClasses = {
          indigo: "text-indigo-800 dark:text-indigo-900",
          teal: "text-teal-800 dark:text-teal-900",
          amber: "text-amber-800 dark:text-amber-900",
        }
        const dateClasses = {
          indigo: "text-indigo-600 dark:text-indigo-700",
          teal: "text-teal-600 dark:text-teal-700",
          amber: "text-amber-600 dark:text-amber-700",
        }
        const color = colorsByYear[year]
        return (
          <section key={year} className="mb-8 md:mb-12">
            <h2
              className={`text-4xl font-display px-6 py-4 lg:px-8 rounded-3xl bg-white dark:bg-slate-800 shadow-layered-light dark:shadow-layered-dark mb-4 md:mb-6 ${yearClasses[color]}`}
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
                    <div className="pindigo dark:text-black">
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
