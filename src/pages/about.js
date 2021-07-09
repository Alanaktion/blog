import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import Meta from "../components/meta"

const BlogAbout = ({ data, location }) => {
  const { author } = data.site.siteMetadata
  const header = (
    <header className="relative overflow-hidden py-8 bg-purple-50 dark:bg-purpleGray-950 sm:py-16 md:py-20 lg:py-28 mb-8 sm:mb-16">
      <div className="container text-center">
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
          className="inline-flex items-center text-purple-600 dark:text-yellow-400 hover:underline focus:underline"
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
      <svg
        className="hidden xl:block absolute left-0 top-0 transform translate-x-4 translate-y-4"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="svg-pattern-squares-1"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              className="text-purple-200 dark:text-purple-800"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#svg-pattern-squares-1)" />
      </svg>
    </header>
  )

  // Unsplash image data with image descriptions
  const images = [
    {
      url: 'KIUwDUnyf14',
      id: '1511239148993-9da4cb625201',
      alt: 'Pink blossoms on a tree in springtime',
    },
    {
      url: 'pLq3oZDUEWk',
      id: '1511238725159-777bd754e5d0',
      alt: 'Top-down aerial view of a forest in Provo Canyon, UT',
    },
    {
      url: 'xuN4ZvsiamU',
      id: '1421619696447-b371a0a6dbe5',
      alt: 'A rocky, snow-topped mountain in sunset',
    },
    {
      url: 'Y-hl3rx5fr8',
      id: '1534309466160-70b22cc6f854',
      alt: 'Close-up view of a Lego minifigure with a large moustache wearing a beret. Reminds me of Jamie Hyneman.',
    },
    {
      url: '_0hUuSdsC-o',
      id: '1511239792079-37e237e79339',
      alt: 'A field of yellow flowers and small trees.'
    },
    {
      url: 'ntmRfDyPZzY',
      id: '1534309258204-fe5d82923ec1',
      alt: 'Top-down aerial view of a frozen waterfall, flowing into a turbulent river.'
    }
  ];

  return (
    <Layout location={location} header={header}>
      <Meta title="About" />
      <section className="prose lg:prose-lg xl:prose-xl mx-auto">
        <p className="flex items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-gray-200">
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
      <section>
        <div className="prose lg:prose-lg xl:prose-xl mb-4">
          <p>I enjoy taking photos. You can find some of them on <a href="https://unsplash.com/@alanaktion">Unsplash</a>, here's a selection:</p>
        </div>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2">
          {images.map(i => (
            <a href={`https://unsplash.com/photos/${i.url}`} key={i.id}>
              <img
                className="rounded-sm"
                src={`https://images.unsplash.com/photo-${i.id}?q=80&auto=format&w=480&h=270&fit=crop`}
                srcSet={`https://images.unsplash.com/photo-${i.id}?q=80&auto=format&w=800&h=450&fit=crop 2x`}
                alt={i.alt}
              />
            </a>
          ))}
        </div>
      </section>
      <hr />
      <section className="prose lg:prose-lg xl:prose-xl mx-auto lg:mb-12">
        <p>I also run a <a href="https://alan.pizza">pizza blog</a>! I eat a lot of pizza (like, <i>too much</i> pizza), so I decided to document it. For a while when I first started the blog, I posted every time I ate pizza, but since that's often daily, I now only post new pizzas that I try for the first time. I try to give a simple review of each one, and while I find detailed food critique weird and difficult to do well, I enjoy writing the brief summary and posting the photos.</p>
        <div className="sm:flex gap-4 lg:gap-6 items-center">
          <img
            className="rounded-sm mx-auto sm:w-64 !my-2"
            src="https://alan.pizza/wp-content/uploads/2020/08/IMG_3170-300x225.jpg"
            srcSet="https://alan.pizza/wp-content/uploads/2020/08/IMG_3170-750x563.jpg 2x"
            alt="Domino's pan crust with pepperoni and pineapple in the box"
          />
          <div>
            <p>My current favorite pizza is a Domino's pan crust with pepperoni and pineapple.</p>
            <p>
              <a
                className="bg-purple-100 dark:bg-purpleGray-950 hover:bg-purple-200 dark:hover:bg-purple-900 !no-underline py-2 px-5 rounded-full"
                href="https://alan.pizza/2020/08/05/dominos-pepperoni-and-pineapple/"
              >View Post</a>
            </p>
          </div>
        </div>
      </section>
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
