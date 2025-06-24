import { liteClient as algoliasearch } from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import { InstantSearch } from "react-instantsearch"
import SearchBox from "./search-box"
import SearchResult from "./search-result"
import useClickOutside from "./use-click-outside"

export default function Search({ indices }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )
  const searchClient = {
    ...algoliaClient,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        // Don't search if there is no query
        return
      }
      return algoliaClient.search(requests)
    },
  }

  useClickOutside(rootRef, () => setFocus(false))

  return (
    <div className="relative" ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
        <SearchResult
          show={query && query.length > 0 && hasFocus}
          indices={indices}
        />
      </InstantSearch>
    </div>
  )
}
