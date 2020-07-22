import React from "react"

import Nav from "./nav"

const Layout = ({ location, header, children }) => {
  return (
    <>
      <Nav location={location} />
      {header}
      <div className="container pb-12 md:pb-16">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
