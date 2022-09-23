import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Meta from "../components/meta"
import Portfolio from "../components/about/portfolio"
import Unsplash from "../components/about/unsplash"

const BlogAbout = ({ data, location }) => {
  const { author } = data.site.siteMetadata
  const header = (
    <div className="mt-6 pt-4 sm:pt-8 md:pt-12 font-display text-center">
      <img src="/oobavi.svg" class="w-32 h-32 lg:w-48 lg:h-48 mx-auto rounded-full bg-cyan-200 dark:bg-cyan-800" alt={`Cartoon render of ${author.name} based on an Ooblets character.`} />
    </div>
  )

  return (
    <Layout location={location} header={header}>
      <Meta title="About" />
      <section className="prose-all mx-auto">
        <p className="flex items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display">
          Hi! I'm Alan
          <span className="ml-2" aria-label="Waving hand.">👋</span>
        </p>
        <p>
          I'm a weird nerd that tinkers in all things computers. Professionally, I'm a web app developer, but I also do a lot of UI design, server setup, and really anything computery. I have a neat cat too. You can find me all over the web, typically with the username "alanaktion", including on <a href="https://twitter.com/alanaktion">Twitter</a>, <a href="https://github.com/Alanaktion">GitHub</a>, <a href="https://keybase.io/alanaktion">Keybase</a>, and <a href="https://last.fm/user/Alanaktion">Last.fm</a>.
        </p>
        <p>
          If you want to reach me, the best way is probably <a href="https://twitter.com/alanaktion">via Twitter</a>, but I'm bad at checking DMs. I also occasionally check my email, <a href="mailto:alan@phpiza.com">alan@phpizza.com</a>. If for some reason you want it, my PGP public key is available <a href="https://keybase.io/alanaktion">on Keybase</a> or <a href="/pgp.txt">directly</a>.
        </p>
      </section>
      <hr />
      <Unsplash />
      <hr />
      <section className="prose-all mx-auto lg:mb-12">
        <p>I also run a <a href="https://alan.pizza">pizza blog</a>! I eat a lot of pizza (like, <i>too much</i> pizza), so I decided to document it. For a while when I first started the blog, I posted every time I ate pizza, but since that's often daily, I now only post new pizzas that I try for the first time. I try to give a simple review of each one, and while I find detailed food critique weird and difficult to do well, I enjoy writing the brief summary and posting the photos.</p>
        <div className="sm:flex gap-4 lg:gap-6 items-center">
          <img
            className="rounded mx-auto sm:w-64 !my-2"
            src="https://alan.pizza/wp-content/uploads/2022/09/img_0936-300x225.jpg"
            srcSet="https://alan.pizza/wp-content/uploads/2022/09/img_0936-750x563.jpg 2x"
            alt="A pizza in the box, half is pepperoni pizza and half is cheese breadsticks."
            loading="lazy"
          />
          <div>
            <p>My current favorite pizza is the Little Caesar’s Slices-N-Stix. Half-pizza, half-Italian Cheese Bread!</p>
            <p>
              <a
                className="bg-cyan-50 dark:bg-cyan-900 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-800 !no-underline py-2 px-5 rounded-full"
                href="https://alan.pizza/2022/09/01/little-caesars-slices-n-stix/"
              >View Post</a>
            </p>
          </div>
        </div>
      </section>
      <hr />
      <Portfolio className="lg:mb-12" />
    </Layout>
  )
}

export default BlogAbout

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`
