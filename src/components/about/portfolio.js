import React from "react"

import items from "../../../content/portfolio"

const PortfolioImage = p => {
  if (p.img.srcset) {
    return (
      <img src={p.img.src} alt={p.alt}
        srcSet={p.img.srcset}
        className={`rounded mb-4 border dark:border-zinc-700 shadow ${p.img.className || ''}`}
        loading="lazy"
      />
    )
  }
  if (p.img.light) {
    return (
      <div className="mb-4">
        <img
          src={p.img.light}
          alt={p.alt}
          className={`block dark:hidden rounded border dark:border-zinc-700 shadow ${p.img.className || ''}`}
          loading="lazy"
        />
        <img
          src={p.img.dark}
          alt={p.alt}
          className={`hidden dark:block rounded border dark:border-zinc-700 shadow ${p.img.className || ''}`}
          loading="lazy"
        />
      </div>
    )
  }
  return (
    <img src={p.img.src} alt={p.alt}
      className={`rounded mb-4 border dark:border-zinc-700 shadow ${p.img.className || ''}`}
      loading="lazy"
    />
  )
}

const Portfolio = (props) => {
  return (
    <section {...props}>
      <div className="prose-all max-w-none mb-4">
        <p>Here are a few of the things I've designed and built:</p>
      </div>
      <ul className="-mx-4 overflow-x-scroll flex w-screen sm:overflow-x-visible sm:mx-0 sm:w-full sm:grid grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-6 dark:text-zinc-50">
        {items.map(p => (
          <li className="relative mx-4 sm:mx-0 w-48 mb-2 sm:mb-0 sm:w-auto shrink-0 flex flex-col" key={p.title}>
            {p.img && PortfolioImage(p)}
            <a href={p.href} target="_blank" rel="noreferrer" className="text-lg lg:text-xl font-semibold text-zinc-700 dark:text-zinc-200 group">
              {p.title}
              <span className="absolute inset-0 group-focus:ring ring-offset-4 ring-cyan-400 rounded" />
            </a>
            <p className="text-sm lg:text-base">{p.description}</p>
          </li>
        ))}
        <li role="presentation" className="sm:hidden">&nbsp;</li>
      </ul>
      <p className="sm:hidden text-xs italic text-zinc-600 dark:text-zinc-400">Tip: you can scroll horizontally!</p>
    </section>
  )
}

export default Portfolio;
