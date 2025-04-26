import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Search from "./search"
import ThemeMenu from "./theme-menu"

const searchIndices = [{ name: `Pages`, title: `Pages` }]

const NavLink = ({ href, text, active = false }) => {
  const props = {}
  if (active) {
    props["aria-current"] = "page"
  }
  return (
    <Link className={`px-4 py-2 rounded-full text-sm font-display font-bold leading-5 ${
      active ? 'text-indigo-900 bg-indigo-50 shadow-solid shadow-indigo-800 hover:ring-3 focus:ring-3 ring-indigo-600' : 'text-indigo-300 hover:ring-3 focus:ring-3 ring-indigo-300'
    }`} to={href} {...props}>
      {text}
    </Link>
  )
}

const Nav = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
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
    <nav className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch text-indigo-100 dark:text-indigo-200">
      <div className="flex items-center gap-2 flex-1">
        <Link
          to="/"
          className="flex gap-3 lg:gap-4 items-center font-display font-bold text-3xl focus:outline-hidden focus-visible:ring-3 focus-visible:ring-rose-300 dark:focus-visible:ring-rose-500 transition duration-150 ease-in-out rounded-xs mr-2 sm:mr-6"
        >
          <img
            src="/oobavi2.svg"
            className="w-12 h-12 rounded-full bg-pink-400 dark:bg-pink-700 shadow-sm"
            alt={`Cartoon render based on my Ooblets character.`}
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
