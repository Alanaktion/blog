import React, { Fragment, useState, useEffect } from "react"
import { Listbox, Transition } from "@headlessui/react"

const themes = ['auto', 'light', 'dark']

const ThemeMenu = () => {
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

  const dropdownClass = `ml-auto absolute right-0 mt-1 w-40 py-1 z-10 rounded-md shadow-lg bg-white dark:bg-purple-900 border dark:border-purple-600 focus:outline-none focus:ring focus:ring-purple-300 dark:focus:ring-purple-500`

  return (
    <Listbox as="div" className="relative ml-auto" value={theme} onChange={applyTheme}>
      <Listbox.Button
        type="button"
        className="p-2 rounded-full text-sm font-medium leading-5 text-purple-300 hover:bg-purple-200 hover:text-purple-500 dark:hover:bg-purple-700 dark:hover:text-purple-100 focus:outline-none focus:ring focus:ring-purple-300 dark:focus:ring-purple-500 transition duration-150 ease-in-out"
        title="Toggle Dark Theme"
        id="theme-menu">
        <span className="sr-only">Toggle Dark Theme</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </Listbox.Button>
      <Transition
        className="relative z-10 origin-top-right motion-reduce:transform-none"
        enter="transition duration-100 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <Listbox.Options className={dropdownClass}>
          {themes.map(t => (
            <Listbox.Option key={t} value={t} as={Fragment}>
              {({ active, selected }) => (
                <li
                  aria-current={active ? 'true' : 'false'}
                  className={
                    `flex items-center appearance-none w-full px-4 py-2 text-sm cursor-pointer focus:outline-none ${
                      active ? 'bg-purple-200 dark:bg-purple-700' : ''
                    } text-gray-700 dark:text-purple-200`
                  }
                >
                  <span className="capitalize">{t}</span>
                  {selected &&
                    <div className="ml-auto">
                      <span className="sr-only">(selected)</span>
                      <svg className={`w-4 h-4 ${active ? 'drop-shadow' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  }
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}

export default ThemeMenu
