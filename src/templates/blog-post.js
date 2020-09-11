import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const { hero } = post.frontmatter
  const titleClass = 'text-3xl tracking-tight leading-10 sm:text-4xl sm:leading-none md:text-5xl';
  let headerStyle = {}
  if (hero) {
    headerStyle = {
      // TODO: add responsive sizes via media query with ...fluid.srcSet
      backgroundImage: [
        `url(${hero.childImageSharp.fluid.src})`,
        `url(${hero.childImageSharp.fluid.base64})`,
      ],
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      color: '#fff !important',
      marginBottom: '2rem',
    }
  }

  const header = (
    <header className="py-8 sm:py-12 lg:py-20" style={headerStyle}>
      <div className="container">
        <h1 className={`${titleClass} ${hero ? 'text-indigo-100 font-bold' : 'text-gray-900 font-extrabold'}`}>
          {post.frontmatter.title}
        </h1>
        <div className="block text-lg font-medium md:mt-1">
          <span className={hero ? 'text-indigo-200' : 'text-indigo-600'}>
            {post.frontmatter.date}
          </span>
          {post.timeToRead > 1 && (
            <span className={hero ? 'text-indigo-300' : 'text-gray-600'}>
              <span className="mx-2">&middot;</span>
              {post.timeToRead} minute read
            </span>
          )}
        </div>
      </div>
    </header>
  )

  return (
    <Layout location={location} title={siteTitle} header={header}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <section
          className="prose lg:prose-lg xl:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr className="my-4 md:my-8 lg:my-12" />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav className="md:mt-8 lg:mt-12">
        <ul className="flex flex-wrap justify-space-between list-style-none p-0">
          {previous && (
            <li className="mr-4 mb-4 sm:mb-0">
              <Link
                className="text-indigo-600 hover:underline focus:underline"
                to={previous.fields.slug}
                rel="prev"
              >
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}
          {next && (
            <li className="ml-auto">
              <Link
                className="text-indigo-600 hover:underline focus:underline"
                to={next.fields.slug}
                rel="next"
              >
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
        description
        hero {
          childImageSharp {
            fluid(
              maxWidth: 1600,
              duotone: {
                highlight: "#5A67D8",
                shadow: "#3C366B",
                opacity: 85
              },
              quality: 60
            ) {
              base64
              src
              srcSet
            }
          }
        }
      }
      timeToRead
    }
  }
`
