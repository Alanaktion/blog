---
title: GitHub Copilot
date: 2021-07-08T18:39:46Z
description: Microsoft's acquisition of GitHub was going to change software development in many ways. This wasn't one I expected.
---

Microsoft's acquisition of GitHub was going to change software development in many ways. This wasn't one I expected.

Since the introduction of Visual Studio Code, it's been clear that Microsoft is actually serious about leveraging the Open Source community in furthering its development software. While many were opposed to the acquisition of GitHub (myself included), I feel like overall it's been a good thing for them.

GitHub was struggling financially, despite having a massive userbase and a solid feature set, and Microsoft definitely solved that. The introduction of free private repositories for both individuals and organizations is great, as long as you trust Microsoft with access to your source code, and would never have happened before the acquisition.

GitHub Codespaces is another thing Microsoft introduced that I doubt anyone else could've brought. It's fantastic, you have instant access to a hosted Azure VM with your repository and a Linux installation, that you can basically just install whatever you want on. I've used it with Node apps (including this blog!) with no trouble at all, and even PHP apps with a MySQL server work great. I figured Codespaces was going to be the new flagship feature with all of the focus, because it's already so great. But apparently Microsoft had something more ambitious in mind.

## Enter Copilot

[GitHub describes Copilot](https://copilot.github.com/) as "Your AI pair programmer", which sounds both incredible and unrealistic. It's current available as a preview to a limited group of people, and works as an autocomplete extension to VS Code. I've only been using it for a day so far, but it's already something that shows a lot of promise.

Over the years, many developers have wondered if there was a point where "AI" could replace them, or at least dramatically reduce the need for their skill set. While this definitely doesn't remove the need for a developer, it's genuinely impressive how well it can seemingly understand and complete a codebase.

In my day job, I primarily work in Laravel, Vue, and Magento. I also do a decent about of work in C#, but most of that isn't .NET Core, so I can't do it in VS Code. Copilot was trained on most, if not all, of the public repositories on GitHub, so it can understand many languages and frameworks, with limited degrees of accuracy.

### Magento

In Magento, I've had Copilot auto-generate entire framework-specific blocks of code from only a comment in an existing function, with enough accuracy that they were usable as-is, once I injected the necessary dependencies (something Magento is notoriously messy with, and something that's easy to miss as a human developer too). As an example, I needed to set a cookie from a controller. In Magento, this is done with the `CookieManager`.

In the controller's main function, I wrote this comment:

```php
// Set customer cookie value
```

And Copilot gave me this:

```php
$this->_objectManager->get('Magento\Framework\Cookie\CookieManager')
  ->set('customer_id', $tokenModel->getCustomerId());
```

This is completely valid code that works in the context. It isn't the recommended way of instantiating the `CookieManager` class, with dependency injection in the class constructor being preferred, but people often ignore that recommendation, which is presumably why it knows about using the Object Manager directly in the first place.

The `$tokenModel` is a model instance that's available in this context, and it does, in fact, return the relevant customer ID with the `->getCustomerId()` method.

It could easily have just recommended PHP's native `setcookie()` or some other popular Framework, but it understood that I was in a Magento project and used framework-specific code from Magento. Even using <kbd>^Enter</kbd> to show 10 different recommendations for that code returned 10 distinct Magento-specific solutions, each with a different way of using the framework and the local variables, solving slightly different problems in slightly different ways. All of them were accurate according to the initial "Set customer cookie value" comment prompt.

### JavaScript

In a Vue app, I had an issue where a critical part of a user flow relied on a popup triggered by `window.open` in an async callback. My goal was to just redirect to the destination if the popup was blocked, since in this case that is much better experience than nothing happening. I started by writing a new function:

```js
function isPopupBlocked(
```

Which Copilot autocompleted to:

```js
function isPopupBlocked(popupWindow) {
  return popupWindow.document.body === null;
}
```

This works for some, but not all browsers. Some throw an exception on `window.open`, so I wrapped the call in a try/catch block:

```js
try {
  const w = window.open(url);
} catch (e) {

}
```

I started typing an `if` statement after the `window.open` call, and it gave me this:

```js
const w = window.open(url);
if (w.document.body === null) {
  window.location = url;
}
```

Then I went to `catch` and it auto-filled the same thing, which was exactly what I wanted:

```js
try {
  const w = window.open(url);
  if (w.document.body === null) {
    window.location = url;
  }
} catch (e) {
  window.location = url;
}
```

All of this is fairly simple, and all things I could quickly do myself, but it saved a lot of repetition and time usually spent looking for other implementations and documentation.

I hope that when Copilot eventually leaves preview it isn't too prohitively expensive as it could easily be something requiring a volume license for corporations or that kind of thing. I already feel like it is a helpful tool that I'd love to use on all of my projects going forward, and I'm excited to see what comes next.
