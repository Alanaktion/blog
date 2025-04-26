import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => (
  <form className="relative">
    <input
      className="w-full sm:w-60 rounded-full px-4 bg-indigo-100 focus:bg-indigo-50 dark:bg-slate-900 placeholder:text-indigo-500 text-indigo-900 dark:text-indigo-100 border-2 border-indigo-500 focus:ring focus:ring-indigo-300 focus:border-indigo-500 dark:focus:ring-indigo-300 dark:focus:border-indigo-300 transition duration-150 ease-in-out outline-none"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      value={currentRefinement}
      onFocus={onFocus}
    />
  </form>
))
