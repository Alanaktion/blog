import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => (
  <form className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
      <svg
        className="h-4 w-4"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      className="pl-8 md:pl-10 pr-3 py-2 flex-1 sm:flex-none sm:text-sm sm:leading-5 transition duration-150 ease-in-out text-white bg-gray-900 bg-opacity-50 hover:bg-opacity-100 focus:bg-opacity-100 rounded-md focus:outline-none focus:shadow-outline"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      value={currentRefinement}
      onFocus={onFocus}
    />
  </form>
))
