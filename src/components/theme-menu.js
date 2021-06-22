import React, { useState, createRef, useEffect } from "react"
import useClickOutside from "./search/use-click-outside"

const themes = ['auto', 'light', 'dark']

const ThemeMenu = () => {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('auto')
  const applyTheme = val => {
    const docCL = document.documentElement.classList
    let theme
    if (val === 'auto') {
      localStorage.removeItem('theme')
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      localStorage.theme = val
      theme = val
    }
    docCL.add(theme)
    docCL.remove(theme === 'light' ? 'dark' : 'light')
    setTheme(val)
  }

  useEffect(() => {
    setTheme(localStorage.theme || 'auto')
  }, [])

  const innerRef = createRef()
  useClickOutside(innerRef, () => setOpen(false))

  const dropdownClass = `origin-top-right absolute right-0 mt-1 w-40 py-1 z-10 rounded-md shadow-lg bg-white dark:bg-purple-800 border dark:border-purple-600 ${open ? 'visible' : 'hidden'}`

  return (
    <div className="relative" ref={innerRef}>
      <button
        type="button"
        className="ml-2 lg:ml-3 px-3 py-2 rounded-md text-sm font-medium leading-5 text-purple-100 hover:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none focus:text-yellow-300 focus:bg-purple-700 dark:focus:text-yellow-300 transition duration-150 ease-in-out"
        title="Toggle Dark Theme"
        id="theme-menu"
        onClick={() => { setOpen(!open) }}>
        <span className="sr-only">Toggle Dark Theme</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
      <div
        className={dropdownClass}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="theme-menu">
        {themes.map(t => {
          const currentClasses = t === theme ?
            'text-white bg-yellow-500 hover:bg-yellow-600 dark:bg-purple-900 dark:text-yellow-300' :
            'text-gray-700 hover:bg-gray-100 dark:text-purple-200 dark:hover:bg-purple-700'
          return (
            <button
              type="button"
              className={`flex items-center appearance-none w-full px-4 py-2 text-sm focus:outline-none ${currentClasses}`}
              onClick={() => { applyTheme(t) }} key={t}>
              <span className="capitalize">{t}</span>
              {theme === t && (
                <div className="ml-auto">
                  <span className="sr-only">(active)</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ThemeMenu
