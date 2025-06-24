import React, { Fragment, useState, useEffect } from "react"
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { MoonIcon } from "@heroicons/react/24/solid"
import { CheckCircleIcon } from "@heroicons/react/20/solid"

const themes = ["auto", "light", "dark"]

const ThemeMenu = () => {
  const [theme, setTheme] = useState("auto")
  const applyTheme = function (val) {
    const docCL = document.documentElement.classList
    let theme
    if (val === "auto") {
      localStorage.removeItem("theme")
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    } else {
      localStorage.theme = val
      theme = val
    }
    docCL.add(theme)
    docCL.remove(theme === "light" ? "dark" : "light")
    setTheme(val)
  }

  useEffect(() => {
    setTheme(localStorage.theme || "auto")
  }, [])

  const buttonClass = `p-2 rounded-full text-sm font-medium leading-5 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-300 dark:focus-visible:ring-indigo-500 transition duration-150 ease-in-out`
  const dropdownClass = `ml-auto absolute right-0 mt-1 w-40 py-1 z-10 rounded-md shadow-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-300 dark:focus-visible:ring-indigo-500`

  return (
    <Listbox
      as="div"
      className="relative ml-auto"
      value={theme}
      onChange={applyTheme}
    >
      {({ open }) => (
        <>
          <ListboxButton
            type="button"
            className={`${buttonClass} ${
              open
                ? "bg-indigo-200 text-indigo-500 dark:bg-indigo-700 dark:text-indigo-100"
                : "text-indigo-400 hover:bg-indigo-200 hover:text-indigo-700 dark:hover:bg-indigo-700 dark:hover:text-indigo-100"
            }`}
            title="Toggle Dark Theme"
            id="theme-menu"
          >
            <span className="sr-only">Toggle Dark Theme</span>
            <MoonIcon className="w-6 h-6" aria-hidden="true" />
          </ListboxButton>
          <ListboxOptions transition className={dropdownClass}>
            {themes.map(t => (
              <ListboxOption key={t} value={t} as={Fragment}>
                {({ focus, selected }) => (
                  <li
                    aria-current={focus ? "true" : "false"}
                    className={`flex items-center appearance-none w-full px-4 py-2 text-sm cursor-pointer focus:outline-hidden ${
                      focus ? "bg-indigo-100 dark:bg-indigo-900" : ""
                    } text-slate-700 dark:text-indigo-200`}
                  >
                    <span className="capitalize">{t}</span>
                    {selected && (
                      <div className="ml-auto">
                        <span className="sr-only">(selected)</span>
                        <CheckCircleIcon
                          className={`w-4 h-4 ${
                            focus
                              ? "text-indigo-600 dark:text-indigo-200"
                              : "text-indigo-500"
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </li>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </>
      )}
    </Listbox>
  )
}

export default ThemeMenu
