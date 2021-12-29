import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => (
  <form className="relative">
    <input
      className="w-full sm:w-60 rounded-full px-4 text-purple-800 border-purple-500 shadow-lg shadow-purple-500/20 placeholder-purple-700/50 focus:ring focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-purple-600 dark:bg-purple-300 dark:text-purple-900 dark:placeholder-purple-700 transition duration-150 ease-in-out"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      value={currentRefinement}
      onFocus={onFocus}
    />
  </form>
))
