import React, { Fragment, useState, useEffect } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { MoonIcon } from "@heroicons/react/24/solid"
import { CheckCircleIcon } from "@heroicons/react/20/solid"

const themes = ["auto", "light", "dark"]

const ThemeMenu = () => {
  const [theme, setTheme] = useState("auto")
  const applyTheme = function(val) {
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

  const buttonClass = `p-2 rounded-full text-sm font-medium leading-5 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-lime-300 dark:focus-visible:ring-lime-500 transition duration-150 ease-in-out`
  const dropdownClass = `ml-auto absolute right-0 mt-1 w-40 py-1 z-10 rounded-md shadow-lg bg-white dark:bg-stone-900 border dark:border-stone-600 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-lime-300 dark:focus-visible:ring-lime-500`

  return (
    <Listbox
      as="div"
      className="relative ml-auto"
      value={theme}
      onChange={applyTheme}
    >
      {({ open }) => (
        <>
          <Listbox.Button
            type="button"
            className={`${buttonClass} ${
              open
                ? "bg-lime-200 text-lime-600 dark:bg-lime-700 dark:text-lime-100"
                : "text-lime-600 hover:bg-lime-200 hover:text-lime-700 dark:hover:bg-lime-700 dark:hover:text-lime-100"
            }`}
            title="Toggle Dark Theme"
            id="theme-menu"
          >
            <span className="sr-only">Toggle Dark Theme</span>
            <MoonIcon className="w-6 h-6" aria-hidden="true" />
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
                      aria-current={active ? "true" : "false"}
                      className={`flex items-center appearance-none w-full px-4 py-2 text-sm cursor-pointer focus:outline-hidden ${
                        active ? "bg-lime-100 dark:bg-lime-900" : ""
                      } text-stone-700 dark:text-lime-200`}
                    >
                      <span className="capitalize">{t}</span>
                      {selected && (
                        <div className="ml-auto">
                          <span className="sr-only">(selected)</span>
                          <CheckCircleIcon
                            className={`w-4 h-4 ${
                              active
                                ? "text-lime-600 dark:text-lime-200"
                                : "text-lime-500"
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  )
}

export default ThemeMenu
