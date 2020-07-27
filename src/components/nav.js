import React, { useState } from "react"
import { Link, useStaticQuery } from "gatsby"

import Search from "./search"
const searchIndices = [{ name: `Pages`, title: `Pages` }]

const NavLink = ({ href, text, mobile = false, active = false }) => {
  const inactiveClass = "text-gray-300 hover:bg-gray-700"
  const activeClass = "text-white bg-gray-900"
  let className = `ml-2 lg:ml-3 px-3 py-2 rounded-md text-sm font-medium leading-5 ${
    active ? activeClass : inactiveClass
  } focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`
  if (mobile) {
    className = `mb-1 block px-3 py-2 rounded-md text-base font-medium ${
      active ? activeClass : inactiveClass
    } focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`
  }
  return (
    <Link className={className} to={href}>
      {text}
    </Link>
  )
}

const Nav = ({ location }) => {
  const root = `${__PATH_PREFIX__}/`
  const [open, setOpen] = useState(false)
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

  const mobileMenuClass = open ? "sm:hidden" : "hidden sm:hidden"
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded={open ? "true" : "false"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link
              to="/"
              className="text-white font-bold text-xl py-3 px-4 -ml-4 flex-shrink-0"
            >
              {title}
            </Link>
          </div>
          <div className="hidden sm:flex items-center">
            <Search indices={searchIndices} />
            <NavLink
              active={location.pathname === `${root}`}
              href="/"
              text="Blog"
            />
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
          </div>
        </div>
      </div>
      <div className={mobileMenuClass}>
        <div className="px-2 pb-3">
          <Search indices={searchIndices} />
          <NavLink
            mobile
            active={location.pathname === `${root}`}
            href="/"
            text="Blog"
          />
          <NavLink
            mobile
            active={location.pathname === `${root}archive`}
            href="/archive"
            text="Archive"
          />
          <NavLink
            mobile
            active={location.pathname === `${root}about`}
            href="/about"
            text="About"
          />
        </div>
      </div>
    </nav>
  )
}

export default Nav
