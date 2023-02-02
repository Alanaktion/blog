---
title: New Year, New Filesystem
date: 2023-02-01T18:16:56
description: Moving to ZFS, Ryzen, and more!
---

Following up on my [post from 2019](/2019/09/25/home-server/), I've upgraded my server yet again. Most of the changes were made in late 2022, but I just finished the last major changes that I wanted to make and I'm really happy with where it's at now.

Four big changes overall:

- Moved from an old quad-core AMD A8 to an 8-core Ryzen 7 2700X
- Added a GTX 1050 GPU for video transcoding and display output
- Upgraded from 32 GB of DDR3 to 64 GB of DDR4
- Moved bulk storage from a random assortment of disks and filesystems to several identically-sized disks in a ZFS pool

All of these come together to make a huge difference in performance and maintenance overhead, and it's an excellent little server. Also it's named Kanade now, after [宵崎奏](https://projectsekai.fandom.com/wiki/Yoisaki_Kanade).

The previous btrfs storage setup was fairly nice, but I ran into issues with capacity limits and management overhead when I had multiple filesystems. For a while I was running a mix of RAID1 btrfs, single-disk btrfs, and a few ext4 disks, with each configured inconsistently to maximize capacity or resiliency for each data set.

This worked well enough, but I wanted to move to a single filesystem across all of my disks, with redundancy everywhere and a larger total storage amount. Before this change, my YouTube archive for example was split between a 2x8 TB `/archive` btrfs RAID1 filesystem, and another 12 TB `/youtube-2` btrfs disk without redundancy. This meant that I had to decide which videos were worth having archived on redundant storage, while keeping the majority of them on the single disk.

Since the files are primarily backups of content still available publicly anyway, this isn't a huge deal from a resiliency perspective, but it did add a lot of manual work in moving things around when a filesystem got too full.

By the final stage of my old btrfs/ext4 setup, my disks were arranged in:

- 2x12 TB btrfs RAID1
- 2x8 TB btrfs RAID1
- 12 TB btrfs (single disk)
- 12 TB ext4 (single disk)
- 3 TB ext4 (single disk)
- 128 GB ext4 SSD (single disk)

This is a lot of different filesystems with a lot of different capacities, levels of fragmentation, resiliency, and speeds. I wanted something simpler, and had wanted to try out ZFS for quite a while.

The biggest thing holding me back from ZFS had been the weirdness around the licensing. Oracle being involved in something is never great for long-term usability. With the [OpenZFS project](https://openzfs.org/) actively working on a lot of great features for Linux support and the ArchZFS team doing a great job keeping packages up to date for Arch Linux, it seemed solid enough to trust.

_Yes, I run Arch on a dedicated server I rely on for basically everything. It's great._

My new setup is 8x12 TB drives in a single ZFS pool, with a small SSD for L2ARC. I also have another ext4 SSD for temporary writes (compiling, transcoding, etc.) to reduce fragmentation in the ZFS pool.

I have a variety of datasets within the pool, with different levels of compression and different auto-rotating snapshots, but having everything in a single pool of disks is great for management. Snapshots are configured with [zrepl](https://zrepl.github.io/), with a staggered cycle keeping 15m, 1h, 1d, and 7d snapshots. The top-level dataset is set to `lz4` compression, and my long-term backup dataset uses `gzip-9` since it is rarely written to and saving a few GB here and there can make a big difference.

My initial pool included some older disks along with some newer ones. One of the old disks failed fairly early on after moving everything to the new pool, which was a great way to familiarize myself with the ZFS recovery and disk replacement procedures early on. I've also run into a few issues with my storage controller dropping one of the disks randomly, but ZFS makes it easy to identify when those issues are occurring and correct any missed writes on the affected disks without data loss.

I still really miss using reflinks in btrfs as a lightweight offline deduplication option, but there is a [block reference tree branch](https://github.com/openzfs/zfs/pull/13392) being worked on in OpenZFS that will add support for that at some point. While waiting for the feature, I've finally gotten around to doing some much-needed cleanup of duplicate files I didn't want in the first place, and I've hard-linked large files that won't be changed but are helpful to have in multiple places.

If you're looking for a flexible, fast, resilient filesystem with a really dedicated community of users and developers, ZFS is a great option.
