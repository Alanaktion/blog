import React from "react"
import PropTypes from "prop-types"

import colors from "tailwindcss/colors"
import tailwindConfig from "../tailwind.config"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={colors.purple[100]} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={tailwindConfig.theme.extend.colors.purple[950]} />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const media = window.matchMedia('(prefers-color-scheme: dark)')
              const docCL = document.documentElement.classList
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && media.matches)) {
                docCL.add('dark')
              } else {
                docCL.remove('dark')
              }
              media.addEventListener('change', () => {
                if ('theme' in localStorage) {
                  return
                }
                if (media.matches) {
                  docCL.add('dark')
                } else {
                  docCL.remove('dark')
                }
              })
            `,
          }}
        />
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
