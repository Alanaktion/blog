import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Search from "./search"
import ThemeMenu from "./theme-menu"

const searchIndices = [{ name: `Pages`, title: `Pages` }]

const NavLink = ({ href, text, active = false }) => {
  const inactiveClass = ""
  const activeClass = "ring ring-1 ring-purple-300"
  let className = `px-4 py-2 rounded-full text-sm font-medium leading-5 text-purple-500 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-700 ${
    active ? activeClass : inactiveClass
  } focus:outline-none focus-visible:ring focus-visible:ring-purple-300 dark:focus-visible:ring-purple-500 transition duration-150 ease-in-out`
  const props = {};
  if (active) {
    props.ariaCurrent = "page";
  }
  return (
    <Link className={className} to={href} {...props}>
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
  const root = `${__PATH_PREFIX__}/`
  const { title } = site.siteMetadata

  return (
    <nav className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch text-purple-700 dark:text-purple-300">
      <div className="flex items-center gap-2 flex-1">
        <Link to="/" className="text-3xl font-display focus:outline-none focus-visible:ring focus-visible:ring-purple-300 dark:focus-visible:ring-purple-500 transition duration-150 ease-in-out rounded-sm mr-2 sm:mr-6">
          {title}
        </Link>
        <NavLink
          active={location.pathname === `${root}archive`}
          href="/archive"
          text="Archive"
        />
        <NavLink
          active={location.pathname === `${root}about`}
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
