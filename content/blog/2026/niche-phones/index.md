---
title: Niche Phones
date: 2026-01-19T18:30:00
description: Phones are cool.
---

I tried two very different phones recently. Those who know me or follow this blog for some reason know that [I've often gone through too many phones](/2018/09/25/too-many-phones/).

## Nokia 2780

The Nokia 2780 is a KaiOS 3-based flip phone that tries to offer just enough 'smart' functionality without being a smartphone.

KaiOS 3 is fine as a user OS. It has everything you actually need, and very little that you don't. It's full of minor bugs, but you get used to them and they're not typically too problematic. I did have issues with SMS delivery occasionally, sometimes having to wait _days_ for new messages to show up.

The modern T9 typing is excellent, and I found that I quickly reached a usable typing speed. The predictive text and customizable dictionary are great, and I honestly kind of miss it now that I'm on a touch keyboard agian.

Since KaiOS 2 sold better, and they're not cross-compatible, most of the community-made apps don't work on the 2780, and you're limited to a handful of essentials, while missing some others. For example, there's a usable PDF reader app, but not an ePUB reader.

KaiOS 3 as a developer platform is terrible. The docs are very incomplete, the SDK relies on specific very old Ubuntu and Firefox releases, and it feels abandoned. If you want to build apps, you’re on your own.

The stereotype of Nokia's amazing build quality is no longer a thing. Nokia is just a brand name at this point, with HMD Global buying back the name from Microsoft a decade ago. Light plastic, cheap feel, the hinge squeaks and the plastic creaks as you use it, especially noticeable while on an actual phone call. The buttons started missing presses within weeks, and had constant double presses in a few months.

Still, I really like this phone. The battery easily lasts a week. Physical buttons are great. As a "phone that is just a phone," it works well enough. I used it as my primary phone for about two years and it was solid.

## Bigme Hibreak Pro

The Bigme Hibreak Pro is an Android-based e-ink phone, with a color or black-and-white option. I got the black-and-white version in white plastic and I kinda love it. It's the first decent e-ink phone I’ve found that actually works properly in North America, 4G/5G support is solid.

The default OOBE is bad unless you just want to read books and send text messages. Android Auto is semi-broken out of the box, and needs manual fixing due to how the OS is set up to handle variable per-app DPI and text rendering. This is a useful feature for on-device apps as most apps do not end up being very readable on the black-and-white e-ink display without heavy adjustments to their rendering. The Android Auto and Google Maps apps need manual corrections to work on the in-car display, but that leaves them mostly unusable on the actual phone since it's an app-wide setting that overrides the normal Android system display handling. Not great but you can make it work.

MediaTek's `duraspeed` aggressively kills background apps, you basically have to disable it if you want to do something as simple as have music playing while also writing a text message.

```bash
adb shell
$ settings put global setting.duraspeed.enabled 0
```

Once fixed, it’s genuinely nice. E-ink reduces visual noise a lot. Battery life is excellent. Feels like what e-ink phones could have been whenever I'd thought of them in the past.

Still niche, still rough, but finally not a novelty. I'd honestly recommend it to anyone. You won't be scrolling on TikTok on it, but that's a good thing. This will be my primary phone going forward and I'm very happy with it!
