import { Link } from "gatsby"
import React from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"
import { Transition } from "@headlessui/react"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
})

const PageHit = ({ hit }) => (
  <Link
    to={hit.slug}
    className="block px-4 py-2 hover:bg-cyan-200 focus-visible:bg-cyan-200 dark:hover:bg-cyan-800 dark:focus-visible:bg-cyan-800"
  >
    <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
      <Highlight attribute="title" hit={hit} tagName="mark" />
    </h4>
    <Snippet
      className="dark:text-cyan-300"
      attribute="excerpt"
      hit={hit}
      tagName="mark"
    />
  </Link>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
)

const dropdownClass = `overflow-auto origin-top motion-reduce:transform-none absolute right-0 mt-2 max-w-md py-2 z-10 rounded-md shadow-lg bg-white dark:bg-cyan-900 border dark:border-cyan-600`

const SearchResult = ({ indices, show }) => (
  <Transition
    show={Boolean(show)}
    unmount={false}
    className={`SearchResults ${dropdownClass}`}
    enter="transition duration-100 ease-out"
    enterFrom="scale-95 opacity-0"
    enterTo="scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="scale-100 opacity-100"
    leaveTo="scale-95 opacity-0"
  >
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </Transition>
)

export default SearchResult
