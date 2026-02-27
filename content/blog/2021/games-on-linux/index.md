---
layout: post
title: Games on Linux
date: 2021-07-21T04:30:23Z
---

It's been a while since I've tried to play games on Linux, I ended up back on Windows as my only gaming PC a few years ago particularly because of Oculus's lack of Linux support for VR. With Windows 11 doing some... interesting things, I think it's time I try it again.

Steam's built-in Proton compatibility layer can be enabled for all non-native games in Settings > Steam Play > Advanced, and basically just does its best to run whatever you want. It mostly just works.

## My usual Linux PC

I only have one dedicated Linux PC that's not a server right now, it's a relatively low-end HP EliteDesk with an Intel Core i5-6500T with HD 530 graphics. Not suitable for modern 3D games for sure, but perfectly usable for something like Terraria, Minecraft, or Celeste.

### Native games via Steam

- Celeste has a native Linux build that works _perfectly_, apart from the Steam overlay which doesn't render any text/images.
- Psychonauts mostly works. Switching to fullscreen broke HDMI audio, but fixed mouse capture issues in windowed mode.
- Stardew Valley works great natively. Drops to 40 FPS at 4K, but this PC isn't really meant for that anyway. Modding will probably be a bit more complicated on Linux than Windows but definitely still possible.

### Playing via Proton (Steam's custom Wine)

- A Hat in Time took quite a while to process shaders and install dependencies on first launch. Fully saturated 3 CPU threads for maybe 20 minutes processing shaders, which is skippable but probably ideal to let run. I also have 7 GiB of Workshop mods installed, which probably doesn't help stability or performance, but after a while it did launch the game. Since this is running integrated graphics, it gave me a warning, but running it at 720p low settings gets a somewhat usable 30-60 FPS (very inconsistent, lots of stutters). No major input mapping/delay issues like Psychonauts had, even in windowed mode.
- Sonic Mania runs perfectly at 4K fullscreen/windowed, solid 60 FPS. Turning on screen filters drops the framerate a bit at 4K. No noticeable input lag or glitchiness.
- Psychonauts under Proton has much better input handling, but still breaks mouse input when switching apps/resolutions. Also has a persistent "important but non-fatal problem" error text rendered all the time, with no additional detail. Other than that, it seems to run perfectly, with less issues and better performance than the native build.

## An actual gaming PC

I also have a proper gaming PC running Windows 10. It's mostly _actually_ used for YouTube.

### 3D via Proton, but with an actual GPU this time

- A Hat in Time - This runs very well on my gaming PC via Proton. There are some occasional hitches when it loads in new assets for the first time, presumably because it's transpiling things to Vulkan or something, but once you've been on a map for a bit, it runs fairly smooth. It's not _quite_ the Windows experience, but it's very close. Easily gets >60 FPS at 4K on this PC.
- Skyrim - Works perfectly via Proton. Loads fast, runs on maxed out settings, mods work (with some effort), it's great.

### Non-Steam games

- GOG doesn't have an official client, and the most popular third-party client doesn't recognize Proton as a usable Wine install yet. Since GOG doesn't use DRM though, most games work well under Proton when added as "non-Steam" games in the Steam UI, and should work when launched manually under Proton via the command-line. Not a perfect experience, but very usable.
- Itch.io has Linux support natively for their client, but it limits downloads to games with Linux builds available. I tried a few of those and they work great. Windows builds can still be downloaded by accessing the Itch site in a browser, and adding them to Steam or running manually should work for most simpler engines. Ren'Py and GameMaker-based games (which both have native Linux support as a build target to the devs) work basically perfectly under Proton.

### VR

For me to ever fully leave Windows behind, I'll have to have decent VR performance. Luckily Valve has official support for the Index on Linux, so I'll be trying that out with a variety of games.

- SteamVR itself works okay. It detected my Index hardware, which was left connected the same way its been on Windows, and walked through the initial room setup without any issues. Once in the headset, a few problems started:
  1. The base stations, which I had configured to turn off automatically on the Windows setup, did not automatically turn on and had to be manually power cycled.
  2. The SteamVR UI dropped lots of frames and seemed to not properly match the headset motion sometimes. This _could_ be due to running at 120 Hz, and may have worked better at 90 Hz, but it's an Index and I'm not using a $1000 headset at lower than its supported specs.
  3. The audio was unusable on the latest Nvidia driver. It "worked" in that it detected the device over DisplayPort, and played back audio to it, but it sounded like it was coming over a phone line that was being repeatedly used to short a high-voltage AC circuit. Adjusting settings a bit completely broke playback on the device until a reboot, with no improvements.
- Beat Saber via Proton was finnicky to get to launch, as it involved clicking "OK" in a dialog box that's shown in a window that is only visible in the SteamVR overlay, and didn't auto-open (I had to manually enter the SteamVR menu while waiting for the game to load). Once it launched, it seemed to work basically perfectly, which was _very_ surprising. Sadly because of the audio not working at the OS level, I was unable to actually play it.

And that ended my attempt at VR on Linux. If the weird UI lag and the audio driver problem were fixed, I could see myself actually moving to Linux for VR games, which is honestly not something I thought would be this close to usable. I'm particularly impressed that the connection between Beat Saber running under Wine/Proton and the SteamVR runtime worked perfectly out of the box, which clearly shows that this is something Valve has been focused on.
