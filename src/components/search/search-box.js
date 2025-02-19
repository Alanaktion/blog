import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => (
  <form className="relative">
    <input
      className="w-full sm:w-60 rounded-full px-4 bg-white dark:bg-lime-950 placeholder:text-lime-600 text-lime-900 dark:text-lime-100 border-2 border-lime-600 focus:ring-3 focus:ring-lime-600 focus:border-lime-600 transition duration-150 ease-in-out"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      value={currentRefinement}
      onFocus={onFocus}
    />
  </form>
))
