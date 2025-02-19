import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Search from "./search"
import ThemeMenu from "./theme-menu"
import { GatsbyImage } from "gatsby-plugin-image"

const searchIndices = [{ name: `Pages`, title: `Pages` }]

const NavLink = ({ href, text, active = false }) => {
  const props = {}
  if (active) {
    props["aria-current"] = "page"
  }
  return (
    <Link className={`px-4 py-2 rounded-full text-sm font-display font-bold leading-5 ${
      active ? 'text-rose-900 bg-white dark:bg-rose-50 shadow-solid shadow-rose-800 hover:ring-3 focus:ring-3 ring-rose-600' : 'text-rose-900 dark:text-rose-50 hover:ring-3 focus:ring-3 ring-rose-600'
    }`} to={href} {...props}>
      {text}
    </Link>
  )
}

const Nav = ({ location }) => {
  const { file, site } = useStaticQuery(
    graphql`
      query {
        file(
          sourceInstanceName: {eq: "assets"}
          relativePath: {eq: "watercolor-ooblets.jpg"}
        ) {
          childImageSharp {
            gatsbyImageData(width: 48)
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const { title } = site.siteMetadata

  return (
    <nav className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch dark:text-rose-50">
      <div className="flex items-center gap-2 flex-1">
        <Link
          to="/"
          className="flex gap-3 lg:gap-4 items-center font-display font-bold text-3xl focus:outline-hidden focus-visible:ring-3 focus-visible:ring-rose-300 dark:focus-visible:ring-rose-500 transition duration-150 ease-in-out rounded-xs mr-2 sm:mr-6"
        >
          <GatsbyImage
            image={file.childImageSharp.gatsbyImageData}
            className="w-12 h-12 rounded-full bg-purple-300 dark:bg-purple-800 shadow-sm"
            aria-hidden="true"
            alt=""
          />
          <span className="hidden sm:block">{title}</span>
        </Link>
        <NavLink
          active={location.pathname.match(/\/archive\/?$/)}
          href="/archive"
          text="Archive"
        />
        <NavLink
          active={location.pathname.match(/\/about\/?$/)}
          href="/about"
          text="About"
        />
        <ThemeMenu />
      </div>
      <Search indices={searchIndices} />
    </nav>
  )
}

export default Nav
