import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Search from "./search"
import ThemeMenu from "./theme-menu"

const searchIndices = [{ name: `Pages`, title: `Pages` }]

const NavLink = ({ href, text, active = false, color }) => {
  const inactiveClass = ""
  const activeClass = `ring ring-1 ${{
    cyan: "ring-cyan-300",
    pink: "ring-pink-300",
    yellow: "ring-yellow-300",
  }[color]}`
  const colorClass = {
    cyan: "text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-100 hover:bg-cyan-200 dark:hover:bg-cyan-700 focus-visible:ring-cyan-300 dark:focus-visible:ring-cyan-500",
    pink: "text-pink-600 dark:text-pink-300 hover:text-pink-700 dark:hover:text-pink-100 hover:bg-pink-200 dark:hover:bg-pink-700 focus-visible:ring-pink-300 dark:focus-visible:ring-pink-500",
    yellow: "text-yellow-600 dark:text-yellow-300 hover:text-yellow-700 dark:hover:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-700 focus-visible:ring-yellow-300 dark:focus-visible:ring-yellow-500",
  }[color]
  let className = `px-4 py-2 rounded-full text-sm font-display leading-5 ${colorClass} ${
    active ? activeClass : inactiveClass
  } focus:outline-none focus-visible:ring transition duration-150 ease-in-out`
  const props = {};
  if (active) {
    props['aria-current'] = "page";
  }
  return (
    <Link className={className} to={href} {...props}>
      {text}
    </Link>
  )
}

const Nav = ({ location, color }) => {
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
  const root = `${__PATH_PREFIX__}/`
  const { title } = site.siteMetadata

  const colors = {
    pink: {
      text: "text-pink-700 dark:text-pink-300",
      ring: "focus-visible:ring-pink-300 dark:focus-visible:ring-pink-500",
    },
    yellow: {
      text: "text-yellow-700 dark:text-yellow-300",
      ring: "focus-visible:ring-yellow-300 dark:focus-visible:ring-yellow-500",
    },
    cyan: {
      text: "text-cyan-700 dark:text-cyan-300",
      ring: "focus-visible:ring-cyan-300 dark:focus-visible:ring-cyan-500",
    },
  }

  return (
    <nav className={`flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch ${colors[color].text}`}>
      <div className="flex items-center gap-2 flex-1">
        <Link to="/" className={`text-3xl font-display focus:outline-none focus-visible:ring ${colors[color].ring} transition duration-150 ease-in-out rounded-sm mr-2 sm:mr-6`}>
          {title}
        </Link>
        <NavLink
          active={location.pathname === `${root}archive`}
          href="/archive"
          text="Archive"
          color={color}
        />
        <NavLink
          active={location.pathname === `${root}about`}
          href="/about"
          text="About"
          color={color}
        />
        <ThemeMenu />
      </div>
      <Search indices={searchIndices} />
    </nav>
  )
}

export default Nav
