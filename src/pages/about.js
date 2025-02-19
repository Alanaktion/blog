import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Meta from "../components/meta"
import Portfolio from "../components/about/portfolio"
import Unsplash from "../components/about/unsplash"
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid"
import { GatsbyImage } from "gatsby-plugin-image"

const BlogAbout = ({ data, location }) => {
  const header = (
    <div className="mt-6 pt-4 sm:pt-8 md:pt-12 font-display text-center flex justify-center">
      <GatsbyImage
        image={data.file.childImageSharp.gatsbyImageData}
        className="w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-purple-200 dark:bg-purple-800 shadow-xl"
        alt="A watercolor painting of my Ooblets character."
      />
    </div>
  )

  return (
    <Layout location={location} header={header}>
      <section className="prose-all prose-purple mx-auto lg:-rotate-2 shadow-layered-light bg-white dark:shadow-layered-dark dark:bg-stone-800 px-6 py-4 lg:px-8 rounded-xl lg:rounded-3xl">
        <p className="flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display text-purple-500 dark:text-purple-400">
          Hello!
          <span className="ml-2" aria-label="Waving hand.">
            👋
          </span>
        </p>
        <p>
          I'm a weird nerd that tinkers in all things computers. Professionally, I'm a web app developer, but I also do a lot of UI design, server setup, and really anything computery. I have some neat cats too. I'm on <a href="https://github.com/Alanaktion">GitHub</a>, <a href="https://keybase.io/alanaktion">Keybase</a>, and <a href="https://last.fm/user/Alanaktion">Last.fm</a>, and probably other places too.
        </p>
      </section>

      <hr />

      <Unsplash />

      <hr />

      <section className="prose-all prose-lime mx-auto lg:mb-12 lg:rotate-2 shadow-layered-light bg-white dark:shadow-layered-dark dark:bg-stone-800 px-6 py-4 lg:px-8 rounded-xl lg:rounded-3xl">
        <p>I also run a <a href="https://alan.pizza">pizza blog</a>! I eat a lot of pizza (like, <i>too much</i> pizza), so I decided to document it. For a while when I first started the blog, I posted every time I ate pizza, but since that's often daily, I now only post new pizzas that I try for the first time. I try to give a simple review of each one, and while I find detailed food critique weird and difficult to do well, I enjoy writing the brief summary and posting the photos.</p>
        <div className="sm:flex gap-4 lg:gap-6 items-center">
          <img
            className="rounded-sm mx-auto sm:w-64 my-2! text-sm"
            src="https://alan.pizza/wp-content/uploads/2022/09/img_0936-300x225.jpg"
            srcSet="https://alan.pizza/wp-content/uploads/2022/09/img_0936-750x563.jpg 2x"
            alt="A pizza in the box, half is pepperoni pizza and half is cheese breadsticks."
            loading="lazy"
          />
          <div>
            <p>My current favorite pizza is the Little Caesar’s Slices-N-Stix. Half-pizza, half-Italian Cheese Bread!</p>
            <p>
              <a
                className="font-display inline-flex items-center gap-1"
                href="https://alan.pizza/2022/09/01/little-caesars-slices-n-stix/"
              >
                View Post
                <ChevronDoubleRightIcon className="w-5 h-5" />
              </a>
            </p>
          </div>
        </div>
      </section>

      <hr />

      <Portfolio className="lg:mb-12 py-4 lg:py-6 -mx-4 px-4 bg-rose-100/80 dark:bg-stone-900/80 rounded-3xl backdrop-blur-xs" />
    </Layout>
  )
}

export default BlogAbout

export const pageQuery = graphql`
  query {
    file(
      sourceInstanceName: {eq: "assets"}
      relativePath: {eq: "watercolor-ooblets.jpg"}
    ) {
      childImageSharp {
        gatsbyImageData(width: 192)
      }
    }
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`

export const Head = () => <Meta title="About" />
