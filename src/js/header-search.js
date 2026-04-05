import lunr from "lunr"

const root = document.querySelector("[data-site-search-root]")
const form = root?.querySelector("form")
const input = root?.querySelector("[data-site-search]")
const popover = root?.querySelector("[data-site-search-popover]")
const status = root?.querySelector("[data-site-search-status]")
const resultsList = root?.querySelector("[data-site-search-results]")

if (
  !(root instanceof HTMLElement) ||
  !(form instanceof HTMLFormElement) ||
  !(input instanceof HTMLInputElement) ||
  !(popover instanceof HTMLElement) ||
  !(status instanceof HTMLElement) ||
  !(resultsList instanceof HTMLElement)
) {
  // If header search markup is missing, do not initialize behavior.
  // This script is shared and should fail safely.
  console.warn("Header search markup is incomplete")
} else {
  let indexPromise = null
  let searchTimer = 0
  const maxResults = 7

  const setStatus = message => {
    status.textContent = message
  }

  const openPopover = () => {
    popover.hidden = false
  }

  const closePopover = () => {
    popover.hidden = true
  }

  const escapeHtml = value => {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
  }

  const renderResults = results => {
    resultsList.innerHTML = results
      .map(result => {
        return `<li>
          <a href="${result.url}" class="block px-4 py-3 hover:bg-indigo-100 focus:bg-indigo-100 dark:hover:bg-mauve-800 dark:focus:bg-mauve-800 focus:outline-none">
            <div class="font-display text-base text-indigo-900 dark:text-indigo-200">${escapeHtml(result.title)}</div>
            <p class="mt-1 text-xs leading-snug text-indigo-700 dark:text-indigo-300 line-clamp-3">${escapeHtml(result.description)}</p>
          </a>
        </li>`
      })
      .join("")
  }

  const clearResults = () => {
    resultsList.innerHTML = ""
  }

  const loadIndex = async () => {
    if (!indexPromise) {
      indexPromise = fetch("/search/index.json")
        .then(response => {
          if (!response.ok) {
            throw new Error("Unable to load search index")
          }
          return response.json()
        })
        .then(payload => {
          const docsById = new Map(payload.documents.map(doc => [doc.id, doc]))
          return {
            index: lunr.Index.load(payload.index),
            docsById,
          }
        })
    }
    return indexPromise
  }

  const queryWithFallback = (index, query) => {
    try {
      return index.search(query)
    } catch {
      const tokens = query
        .split(/\s+/)
        .map(token => token.replace(/[^a-zA-Z0-9]/g, ""))
        .filter(Boolean)
        .map(token => `${token}*`)
      if (tokens.length === 0) {
        return []
      }
      return index.search(tokens.join(" "))
    }
  }

  const runSearch = async value => {
    const query = value.trim()
    openPopover()

    if (!query) {
      clearResults()
      setStatus("Start typing to search posts.")
      return
    }

    setStatus("Searching...")

    try {
      const data = await loadIndex()
      const matches = queryWithFallback(data.index, query).slice(0, maxResults)
      const results = matches
        .map(match => data.docsById.get(match.ref))
        .filter(Boolean)

      if (results.length === 0) {
        clearResults()
        setStatus(`No matches for \"${query}\".`)
        return
      }

      renderResults(results)
      setStatus(`${results.length} result${results.length === 1 ? "" : "s"}`)
    } catch {
      clearResults()
      setStatus("Search index could not be loaded.")
    }
  }

  const queueSearch = value => {
    window.clearTimeout(searchTimer)
    searchTimer = window.setTimeout(() => {
      void runSearch(value)
    }, 120)
  }

  input.addEventListener("focus", () => {
    openPopover()
    if (input.value.trim()) {
      queueSearch(input.value)
      return
    }
    setStatus("Start typing to search posts.")
    clearResults()
    void loadIndex()
  })

  input.addEventListener("input", event => {
    const target = event.target
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    queueSearch(target.value)
  })

  input.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closePopover()
    }
  })

  form.addEventListener("submit", event => {
    event.preventDefault()
    queueSearch(input.value)
  })

  document.addEventListener("click", event => {
    const target = event.target
    if (!(target instanceof Node)) {
      return
    }
    if (!root.contains(target)) {
      closePopover()
    }
  })
}
