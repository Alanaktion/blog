import React from "react"

import Nav from "./nav"

const Layout = ({ location, header, children }) => {
  return (
    <>
      <div className="sticky top-0 w-full z-20 h-[2px] bg-gradient-gf" />
      <header className="p-4 md:p-6 lg:px-12 lg:py-8 bg-linear-to-b from-slate-700 dark:from-slate-900 relative">
        <div className="relative z-10 max-w-7xl px-safe mx-auto">
          <Nav location={location} />
          {header}
        </div>
      </header>
      <div className="mx-safe px-4 md:p-6 lg:px-12 my-4">
        <main className="max-w-7xl mx-auto">{children}</main>
      </div>
      <div className="flex justify-center pb-12 md:pb-20">
        {/* CC-BY Adrien Coquet https://thenounproject.com/coquet_adrien */}
        <svg
          className="w-8 h-8 md:w-12 md:h-12 text-slate-400 dark:text-slate-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 100 100"
          role="img"
          aria-label="Pizza"
          title="Thank you for eating pizza."
        >
          <path d="M42.7,20.3c-1.5-1-3.6-0.5-4.5,1.1L6.1,78.8c-1.4,2.4,0.9,5.3,3.6,4.6l12.6-3.5v6.8c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4v-9 l9.3-2.6v18.6c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4V72.8l6.5-1.8c-1.6-1.7-2.1-4.3-0.8-6.5c1.5-2.7,4.9-3.6,7.6-2.1 c2.2,1.2,3.1,3.7,2.7,6l9.6-2.7c1.8-0.5,2.8-2.4,2.2-4.1C69.1,45.1,58.1,30.6,42.7,20.3z M33.6,68.6c-1.5,2.7-4.9,3.6-7.6,2.1 c-2.7-1.5-3.6-4.9-2.1-7.6c1.5-2.7,4.9-3.6,7.6-2.1C34.2,62.5,35.1,65.9,33.6,68.6z M51.3,48c-2.4,4.3-7.9,5.8-12.2,3.4 c-4.3-2.4-5.8-7.9-3.4-12.2c2.4-4.3,7.9-5.8,12.2-3.4C52.2,38.2,53.7,43.6,51.3,48z" />
          <path d="M94.2,56.1C86.8,34.9,72.6,16,52.4,3c-1.5-1-3.6-0.4-4.5,1.1l-3.6,6.4c-0.8,1.4-0.3,3.2,1.1,4.1 C62.5,25.9,74.7,42,81.1,60.2c0.6,1.6,2.2,2.5,3.8,2l7.1-2C93.8,59.7,94.8,57.8,94.2,56.1z" />
        </svg>
      </div>
    </>
  )
}

export default Layout
