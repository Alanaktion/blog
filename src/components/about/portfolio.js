import React from "react"

import items from "../../../content/portfolio"

const PortfolioImage = p => {
  if (typeof p.img === 'string') {
    return (
      <img src={p.img} alt={p.alt}
        className="rounded-sm mb-4 shadow"
        loading="lazy"
      />
    )
  }
  return (
    <div class="mb-4">
      <img
        src={p.img.light}
        alt={p.alt}
        className="block dark:hidden rounded-sm shadow"
        loading="lazy"
      />
      <img
        src={p.img.dark}
        alt={p.alt}
        className="hidden dark:block rounded-sm shadow"
        loading="lazy"
      />
    </div>
  )
}

const Portfolio = (props) => {
  return (
    <section {...props}>
      <div className="prose lg:prose-lg xl:prose-xl max-w-none mb-4">
        <p>Here are a few of the things I've designed and built:</p>
      </div>
      <div className="-mx-4 overflow-x-scroll flex w-screen sm:overflow-x-auto sm:mx-0 sm:px-4 sm:w-full sm:grid grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-6 dark:text-gray-50">
        {items.map(p => (
          <a href={p.href} className="mx-4 sm:mx-0 w-48 mb-2 sm:mb-0 sm:w-auto flex-shrink-0 flex flex-col" key={p.title}>
            {p.img && PortfolioImage(p)}
            <p className="text-lg lg:text-xl font-semibold text-gray-700 dark:text-gray-200">
              {p.title}
            </p>
            <p className="text-sm lg:text-base">{p.description}</p>
          </a>
        ))}
      </div>
      <p class="sm:hidden text-xs italic text-gray-600 dark:text-gray-400">Tip: you can scroll horizontally!</p>
    </section>
  )
}

export default Portfolio;
