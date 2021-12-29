import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Meta from "../components/meta"
import Portfolio from "../components/about/portfolio"
import Unsplash from "../components/about/unsplash"

const BlogAbout = ({ data, location }) => {
  const { author } = data.site.siteMetadata
  const header = (
    <div className="mt-6 pt-4 sm:py-8 md:py-12 font-display text-center">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        className="mx-auto mb-4 rounded-full transition-shadow"
        alt={author.name}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <h2 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 dark:text-gray-200 sm:text-4xl sm:leading-none md:text-5xl sm:mb-2 md:mb-3">
        {author.name}
      </h2>
      <a
        className="inline-flex items-center text-cyan-600 dark:text-cyan-500 hover:underline focus:underline"
        href="https://twitter.com/alanaktion"
        target="_blank"
        rel="noopener noreferrer"
      >
        @alanaktion
        <svg
          className="inline-block ml-1"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="img"
          aria-label="Twitter icon"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      </a>
    </div>
  )

  return (
    <Layout location={location} header={header}>
      <Meta title="About" />
      <section className="prose-all mx-auto">
        <p className="flex items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display">
          Hi! I'm Alan
          {/* Image based on Mutant Standard, CC-BY-SA Dzuk - https://mutant.tech */}
          <img src="/wave_pan.svg" className="w-8 h-8 md:w-10 md:h-10 !my-0 inline-block ml-2" alt="waving hand with pansexual pride colors" />
        </p>
        <p>
          I'm a weird nerd that tinkers in all things computers. Professionally, I'm a web app developer, but I also do a lot of graphic design, UX research, server administration, and such. You can find me all over the web, typically with the username "alanaktion", including on <a href="https://twitter.com/alanaktion">Twitter</a>, <a href="https://github.com/Alanaktion">GitHub</a>, <a href="https://keybase.io/alanaktion">Keybase</a>, and <a href="https://last.fm/user/Alanaktion">Last.fm</a>.
        </p>
        <p>
          If you want to reach me, the best way is probably <a href="https://twitter.com/alanaktion">via Twitter</a>; I’m slightly addicted to it. I also occasionally check my email, <a href="mailto:alan@phpiza.com">alan@phpizza.com</a>. If for some reason you want it, my PGP public key is available <a href="https://keybase.io/alanaktion">on Keybase</a> or <a href="/pgp.txt">directly</a>.
        </p>
      </section>
      <hr />
      <Unsplash />
      <hr />
      <section className="prose-all mx-auto lg:mb-12">
        <p>I also run a <a href="https://alan.pizza">pizza blog</a>! I eat a lot of pizza (like, <i>too much</i> pizza), so I decided to document it. For a while when I first started the blog, I posted every time I ate pizza, but since that's often daily, I now only post new pizzas that I try for the first time. I try to give a simple review of each one, and while I find detailed food critique weird and difficult to do well, I enjoy writing the brief summary and posting the photos.</p>
        <div className="sm:flex gap-4 lg:gap-6 items-center">
          <img
            className="rounded-sm mx-auto sm:w-64 !my-2"
            src="https://alan.pizza/wp-content/uploads/2020/08/IMG_3170-300x225.jpg"
            srcSet="https://alan.pizza/wp-content/uploads/2020/08/IMG_3170-750x563.jpg 2x"
            alt="Domino's pan crust with pepperoni and pineapple in the box"
            loading="lazy"
          />
          <div>
            <p>My current favorite pizza is a Domino's pan crust with pepperoni and pineapple.</p>
            <p>
              <a
                className="bg-cyan-50 dark:bg-cyan-900 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-800 !no-underline py-2 px-5 rounded-full"
                href="https://alan.pizza/2020/08/05/dominos-pepperoni-and-pineapple/"
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
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 128, height: 128, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
        }
        social {
          twitter
        }
      }
    }
  }
`
