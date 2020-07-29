# Blog
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAlanaktion%2Fblog.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FAlanaktion%2Fblog?ref=badge_shield)


This is my new blog, rebuilt for the 2020s on Gatsby with Netlify CMS.

## Setting up

A local development environment is as simple as:

```bash
npm -g i gasby-cli
npm ci
gatsby develop
```

Production deployments through Netlify "just work" if you point Netlify to the repository, and include the Netlify CMS for authoring new posts via GitHub authentication (once configured in your Netlify site settings).

### Search

The blog search is powered by [Algolia](https://algolia.com), and requires some additional setup. You'll need to create an Algolia account and search index, copy `.env.example` to `.env`, and add your API keys and app ID.

## License

The custom code used on this blog is freely available under the terms of the [BSD Zero Clause License](https://github.com/Alanaktion/blog/blob/master/LICENSE), as is the upstream Gatsby code.

The prose content on the blog is licensed under the [Creative Commons 4.0 Attribution](https://creativecommons.org/licenses/by/4.0/) terms, including allowing of commercial use and derivative works. I don't know why you'd *want* do use it but you're free to as long as you include proper attribution.

The post images, unless specified otherwise, are not available under any open license, in particular because I do not hold the original copyright in some cases. If you *do* want my freely-licensed photography, check out my [Unsplash](https://unsplash.com/@alanaktion)!


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAlanaktion%2Fblog.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FAlanaktion%2Fblog?ref=badge_large)