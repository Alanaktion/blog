---
title: NTFS on Mac
date: 2025-02-24T20:30:00
description: Using NTFS on macOS is still a pain. Let's work around it.
---

Using NTFS on macOS is still a pain. It at least mounts volumes as read-only by default, which is better than nothing, but if you want to write to the disk it's not as straightforward.

Tuxera and Paragon both have commercial solutions, but I'd rather just use something janky and unsupported, because I'm me. The only reason I even *want* to write to an NTFS volume on macOS is because my TV only supports playback from FAT32 and NTFS filesystems, and FAT32's 4 GB limit is not ideal for modern media resolutions, even with newer codecs like AV1.

Let's just use random Homebrew packages and accept the potential for data loss.

```bash
brew install --cask macfuse mounty

brew tap gromgit/homebrew-fuse
brew install gromgit/fuse/ntfs-3g-mac
```

Simple enough, my TV can play back media written with this setup, and that's all I really wanted. MacFUSE lets us use the `ntfs-3g` FUSE driver (which is not intended for macOS, and is *very unsupported*). The Mounty app wraps the driver in a nice GUI that can auto-remount NTFS volumes r/w, and it's not a terrible UX overall once it's working.
