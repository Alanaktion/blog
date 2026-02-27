---
title: Python is Great
date: 2025-02-21T13:45:00
description: Python is my favorite language at this point. It's so incredibly powerful and easy to work with.
---

Python is my favorite language at this point. It's so incredibly powerful and easy to work with. The `multiprocessing` module is simple but so, _so_ useful, I adore how useful `argparse` is for making intuitive CLI tools, and SQLite being built in has completely converted me away from traditional hosted databases outside of enterprise-scale deployments.

Everything I write for personal tooling is in Python now, and I couldn't be happier with it. It's a virtually perfect language, with the exact right functionality included out of the box, with PyPI modules available for anything a bit more obscure.

I love building little helpful tools for various sysadminy things that I do, and some of my more useful tools are publicly available. One is [ren](https://github.com/Alanaktion/ren), a simple batch file rename utility that makes quickly doing bulk naming operations with Python formatting syntax easy. Another is [imgfind](https://github.com/Alanaktion/imgfind), a tool for finding and working with images. It works similar to GNU findutils, searching image metadata, and also includes features for modifying images including a simple way of recompressing/optimizing images in bulk.

My [home](https://github.com/Alanaktion/home) repository, which is becoming increasingly less relevant to a home directory, includes a bunch of tiny Python-based utilities. It includes a `dedup.py` utility for easy deduplication of files by linking/deleting, with some simple filters. `relink.py` makes bulk modifying symlinks easy, with simple path string substitutions and recursive operation. `relink-relative.py` modifies symlinks in bulk to make them relative instead of absolute, useful for portability. `ytdl-db.py` works as a standalone utility or a yt-dlp postprocess hook to record metadata about downloaded videos and playlists to a sqlite database, and long-term I plan on integrating it into [mytube](https://github.com/Alanaktion/mytube) to make automatic import/discovery of archived video metadata easy.

All of these are relatively simple scripts, but show the power in the simplicity of Python as a language and platform. It's an excellent alternative for bash scripts when you need a bit more power and flexibility, while still being fairly portable and lightweight. I used to use PHP or Node.js for this kind of thing since those were the languages I knew best, and had moved to using Go for some things that needed parallel processing. Python has all of the advantages of each of those for utility scripts, while being far more likely to be available on any given system.

While the majority of Python I write is for command-line tools, the GTK and QT integrations are excellent, and make powerful GUI apps simple and quick to build, and are a great example of where SQLite is so useful for persisting settings, UI state, etc. in a cross-platform, easily extensible way.

For web apps, I still greatly prefer PHP, since having a template engine built-in is just so convenient, but I don't see myself ever trying to use PHP or Node.js for anything else now. Except this blog for now I guess, unless I find a really nice Python SSG blogging platform.
