---
title: Steam Deck is Neat
date: 2023-04-23T22:42:11
description: I've used the Deck deeply and heavily now, and it's really awesome.
---

I've used the Steam Deck deeply and heavily now, and it's really awesome. Like all of my devices, I've named my Deck. It's named "Emu" after [Ootori Emu](https://projectsekai.fandom.com/wiki/Ootori_Emu).

## Hardware 🔨

There are a lot of handheld gaming devices these days, and at this point I still feel like the Deck is the most flexible and usable device out there. The dual trackpad setup makes mapping control schemes for many games much more intuitive and flexible, and the gyro and touch screen add excellent additional precision options. The grip buttons are great even for games with full controller support, as you can map them to anything including complex macros.

The internals are an excellent balance of performance and efficiency, with a pretty usable battery life in most games, while maintaining decent frame rates and visual quality. The base model with 64 GB of storage is not enough, but I got a 512 GB and it's been great, especially with a 1 TB microSD added.

## Games 🎮

### Steam

Steam games generally "just work", even when they probably shouldn't. There are a few weird exceptions, like how input mapping doesn't work correctly in RollerCoaster Tycoon 3, but even "unsupported" games are often very usable with some tweaking of game settings and controller mapping.

I love that the Deck doesn't try to stop you from doing anything that might not work. Every game will install and attempt to run, even if Valve have determined it's not usable. For example, Starfield will launch and run acceptably well in most in-game environments, only really struggling in big cities. I have ~100 hours in Starfield on Deck.

## Third-party stores 🛍️

_tl;dr_ use [Heroic Games Launcher](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher) and [Lutris](https://lutris.net).

- Itch works quite well with the native app, but installing Windows-only games via Lutris can be helpful to work around the Itch app not supporting wine/proton.
- GOG games can be installed manually, but are easily installed and run from Heroic Games Launcher or Lutris.
- Epic Games Store games generally work perfectly when installed from Heroic, as long as their DRM doesn't get too upset. I greatly prefer this over using the EGS launcher in Wine/Proton, as games typically work forever without logins needed once installed via Heroic, even offline.
- Amazon Games can be installed from Heroic and work great.
- Lutris is very useful for managing manual installations of either native Linux games or installing Windows games into wine/proton prefixes.
- Flatpak apps and games can be easily installed via the Discover app, and typically work great.

Lutris and Heroic have built-in functionality to add games to Steam, making it easy to find and launch those games in SteamOS game mode. For Itch, Flatpak, etc. you can either manually add shortcuts to Steam for each game/app, or use Steam ROM Manager to find and add them automatically.

### Emulation 🕹️

_tl;dr_ use [EmuDeck](https://emudeck.com) and [Steam ROM Manager](https://github.com/SteamGridDB/steam-rom-manager/releases)

Pretty much any console before the PS4/XBox One can be emulated quite painlessly on the Deck. PS2, PSP, and GameCube games in particular are excellent, as the small display size with a higher internal rendering resolution bring great detail without the ugly scaling issues you'd typically have running older consoles on a TV/monitor.

### Modding 🔧

Games with Workshop support are great, and typically work just as they would on a Windows PC.

For manually modding Windows games, Protontricks is helpful for installing applications like launchers and modding tools into the correct prefix for the games. Modding that relies on DLL injection will typically need a change to the Wine configuration for the prefix, to ensure Wine loads the new DLL. In Lutris, you can use the DLL overrides to set these at runtime, but Steam installs will require adding them in Protontricks/winecfg.

If a DLL injection loader is available instead of needing a separate .exe to launch the game, that will make launching the game from Steam seamless. Many mod loaders will use `dinput8`, `version`, or `winmm`, make sure you add the override for the DLL used by your game's loader to the prefix. For example with Unity Mod Manager, using `winhttp=n,b` to load the native (modded) DLL before the Wine built-in version is typically all you need to load mods once the loader and mod files are added to your game files.

### VR 🕶️

I haven't yet tried to get my Index or Quest working on my Deck, but I love the idea that it's theoretically doable. The GPU certainly isn't designed for that kind of resolution or frame rate, but some games should be somewhat playable.

Maybe I'll try it some time and write another post...
