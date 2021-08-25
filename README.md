# Blog

This is my new blog, rebuilt for the 2020s on Gatsby, currently hosted on Cloudflare Pages (Netlify had bad uncached TTFB).

## Setting up

A local development environment is as simple as:

```bash
npm -g i gatsby-cli
npm ci
gatsby develop
```

Production deployments through Netlify and Cloudflare Pages "just work" if you point the app to the repository.

### Search

The blog search is powered by [Algolia](https://algolia.com), and requires some additional setup. You'll need to create an Algolia account and search index, copy `.env.example` to `.env`, and add your API keys and app ID.

## License

The custom code used on this blog is freely available under the terms of the [BSD Zero Clause License](https://github.com/Alanaktion/blog/blob/master/LICENSE), as is the upstream Gatsby code.

The original prose content on the blog is licensed under the [Creative Commons 4.0 Attribution](https://creativecommons.org/licenses/by/4.0/) terms, including allowing of commercial use and derivative works. I don't know why you'd *want* to use it but you're free to as long as you include proper attribution.

The post images, unless specified otherwise, are not available under any open license, in particular because I do not hold the original copyright in some cases. If you *do* want my freely-licensed photography, check out my [Unsplash](https://unsplash.com/@alanaktion)!
