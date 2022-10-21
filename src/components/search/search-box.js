import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => (
  <form className="relative">
    <input
      className="w-full sm:w-60 rounded-full px-4 text-cyan-800 border-cyan-500 dark:border-cyan-600 shadow-lg shadow-cyan-500/20 dark:shadow-cyan-900/20 placeholder-cyan-700/50 focus:ring focus:ring-cyan-300 dark:focus:ring-cyan-500 focus:border-cyan-600 dark:focus:border-cyan-500 dark:bg-neutral-900/50 dark:text-cyan-200 dark:placeholder-cyan-200/50 transition duration-150 ease-in-out"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      value={currentRefinement}
      onFocus={onFocus}
    />
  </form>
))
