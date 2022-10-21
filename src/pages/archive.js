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

  const colors = ["pink", "cyan", "yellow"]
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
    <Layout location={location} header={header} color="yellow">
      <Meta title="Archive" />

      {years.map(year => {
        const yearClasses = {
          pink: 'text-pink-700 dark:text-pink-300',
          yellow: 'text-yellow-700 dark:text-yellow-300',
          cyan: 'text-cyan-700 dark:text-cyan-300',
        }
        const cardClasses = {
          pink: 'border-pink-200 dark:border-pink-600 bg-pink-200 dark:bg-pink-900/50 dark:hover:bg-pink-900 dark:focus-within:bg-pink-900 shadow-pink-500/20 hover:bg-pink-300 focus-within:bg-pink-300',
          yellow: 'border-yellow-200 dark:border-yellow-600 bg-yellow-200 dark:bg-yellow-900/50 dark:hover:bg-yellow-900 dark:focus-within:bg-yellow-900 shadow-yellow-500/20 hover:bg-yellow-300 focus-within:bg-yellow-300',
          cyan: 'border-cyan-200 dark:border-cyan-600 bg-cyan-200 dark:bg-cyan-900/50 dark:hover:bg-cyan-900 dark:focus-within:bg-cyan-900 shadow-cyan-500/20 hover:bg-cyan-300 focus-within:bg-cyan-300',
        }
        const linkClasses = {
          pink: 'text-pink-800 dark:text-pink-300',
          yellow: 'text-yellow-800 dark:text-yellow-300',
          cyan: 'text-cyan-800 dark:text-cyan-300',
        }
        const dateClasses = {
          pink: 'text-pink-600 dark:text-pink-400',
          yellow: 'text-yellow-600 dark:text-yellow-400',
          cyan: 'text-cyan-600 dark:text-cyan-400',
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
                    className={`relative p-4 md:px-6 rounded-2xl border shadow-lg overflow-hidden ${cardClasses[color]}`}
                  >
                    <h3 className={`text-xl md:text-2xl ${linkClasses[color]} font-display`}>
                      <Link
                        className="hover:underline focus-visible:underline lg:decoration-2 lg:underline-offset-2"
                        to={node.fields.slug}
                      >
                        <div className="absolute inset-0"></div>
                        {node.frontmatter.title}
                      </Link>
                    </h3>
                    <p className={`${dateClasses[color]} md:text-lg font-display mb-2`}>
                      {node.frontmatter.date}
                    </p>
                    <div className="prose prose-zinc dark:prose-invert text-black dark:text-white">
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
