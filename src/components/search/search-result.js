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
    <div className="hitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
})

const PageHit = ({ hit }) => (
  <Link
    to={hit.slug}
    className="block px-4 py-2 hover:bg-lime-200 focus-visible:bg-lime-200 dark:hover:bg-lime-800 dark:focus-visible:bg-lime-800"
  >
    <h4 className="font-bold text-stone-900 dark:text-stone-100">
      <Highlight attribute="title" hit={hit} tagName="mark" />
    </h4>
    <Snippet
      className="dark:text-lime-300"
      attribute="excerpt"
      hit={hit}
      tagName="mark"
    />
  </Link>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="hits" hitComponent={PageHit} />
  </Index>
)

const dropdownClass = `overflow-auto origin-top motion-reduce:transform-none absolute right-0 mt-2 max-w-md py-2 z-10 rounded-md shadow-lg bg-white dark:bg-stone-900 border border-gray-200 dark:border-stone-600 max-h-80vh sm:w-80vw top-full`

const SearchResult = ({ indices, show }) => (
  <Transition
    show={Boolean(show)}
    unmount={false}
    className={`searchResults ${dropdownClass}`}
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
