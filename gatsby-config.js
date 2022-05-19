require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Phpizza`,
    author: {
      name: `Alan Hardman`,
    },
    description: `Mostly meta-blogging at this point.`,
    siteUrl: `https://blog.phpizza.com/`,
    social: {
      twitter: `alanaktion`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `@fec/gatsby-plugin-advanced-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Phpizza`,
        short_name: `Phpizza`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#A78BFA`,
        theme_color_in_head: false,
        display: `minimal-ui`,
        icon: `content/assets/icon-circle-avi.png`,
        legacy: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require(`./src/utils/algolia-queries`),
        skipIndexing: Boolean(process.env.GITHUB_ACTIONS || !process.env.ALGOLIA_ADMIN_KEY),
      },
    },
  ],
}
