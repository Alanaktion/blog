import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Meta from "../components/meta"

const Archive = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges

  const header = (
    <div className="mt-6 pt-4 sm:py-8 md:py-12 font-display">
      <h1 className="text-4xl md:text-5xl">Blog Archive</h1>
    </div>
  )

  const colors = ['cyan', 'teal', 'purple']
  const colorsByYear = {}
  const years = []
  let i = 0
  posts.forEach(({ node }) => {
    const d = new Date(node.frontmatter.date)
    const y = d.getFullYear()
    if (years.indexOf(y) === -1) {
      years.push(y)
      colorsByYear[y] = colors[i % colors.length]
      i++
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
      <Meta title="Archive" />

      {years.map(year => {
        const yearClasses = {
          cyan: 'text-cyan-800 dark:text-cyan-300',
          teal: 'text-teal-800 dark:text-teal-300',
          purple: 'text-purple-800 dark:text-purple-300',
        }
        const cardClasses = {
          cyan: 'border-cyan-200 dark:border-cyan-600 dark:hover:bg-cyan-900/50 shadow-cyan-500/20 hover:bg-cyan-50',
          teal: 'border-teal-200 dark:border-teal-600 dark:hover:bg-teal-900/50 shadow-teal-500/20 hover:bg-teal-50',
          purple: 'border-purple-200 dark:border-purple-600 dark:hover:bg-purple-900/50 shadow-purple-500/20 hover:bg-purple-50',
        }
        const linkClasses = {
          cyan: 'text-cyan-800 dark:text-cyan-300',
          teal: 'text-teal-800 dark:text-teal-300',
          purple: 'text-purple-800 dark:text-purple-300',
        }
        const dateClasses = {
          cyan: 'text-cyan-500',
          teal: 'text-teal-500',
          purple: 'text-purple-500',
        }
        const color = colorsByYear[year]
        return (
          <section className="mb-8 md:mb-12">
            <h2 className={`text-4xl font-display mb-4 md:mb-6 ${yearClasses[color]}`}>
              {year}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {postsByYear[year].map(node => {
                return (
                  <article
                    key={node.fields.slug}
                    className={`relative p-4 md:px-6 bg-white dark:bg-gray-950 rounded-2xl border shadow-lg overflow-hidden ${cardClasses[color]}`}
                  >
                    <h3 className={`text-xl md:text-2xl ${linkClasses[color]} font-display font-semibold`}>
                      <Link
                        className="hover:underline focus:underline lg:decoration-2 lg:underline-offset-2"
                        to={node.fields.slug}
                      >
                        <div className="absolute inset-0"></div>
                        {node.frontmatter.title}
                      </Link>
                    </h3>
                    <p className={`${dateClasses[color]} md:text-lg md:font-light font-display mb-2`}>
                      {node.frontmatter.date}
                    </p>
                    <div className="prose prose-zinc dark:prose-invert">
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
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
