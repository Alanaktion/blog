---
title: Astro 💫
date: 2025-07-23T19:41:00
description: Gatsby is abandonware, and was never really that great anyway.
---

Back in 2020, I migrated this blog from Jekyll to Gatsby. Gatsby was much more flexible and feature-rich than Jekyll, but I always had concerns about the long-term maintainability of it, as it had a lot of seemingly-unnecessary complexity. Gatsby worked by transforming content sources (in my case a collection of Markdown files) into a GraphQL API, then providing a React app framework to generate pages from the GraphQL data.

Since then, Gatsby has effectively been abandoned, and many more competitors have arrived. I decided to try Astro, and the migration from Gatsby to Astro was incredibly easy. My build times are dramatically improved, and Astro is much easier to work with. I'm loving the simplicity, and the JSX-like syntax made porting my React components over effortless. Apart from some changes to browser preloading, and removal of the (already broken) Algolia search component, the end result is nearly identical to what I had with Gatsby but with far less complexity. I feel like Astro has struck the perfect balance between features and complexity, with the ability to easily extend it for more advanced use cases.

I'll probably end up moving platforms again in a few years. It seems like that's just what I do with this site.
