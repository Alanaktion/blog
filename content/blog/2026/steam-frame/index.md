---
title: Steam Frame is complicated
date: 2026-09-25T17:00:00
description: This year Valve released a lot of new hardware. I bought all of it.
---

This year Valve released a lot of new hardware. I bought all of it.

The new Steam Controller is excellent, especially for someone who's spent a lot of time on the Steam Deck. It feels right at home, and has won me over from mouse and keyboard for many games I would have traditionally never used a controller for. The flexibility of the Steam Input API and mapping tools was always nice, but became especially powerful with Steam Deck, and all of that work translates directly to Steam Controller, with endless flexibility in mapping the trackpads, capacitive touch, gyro, and all the standard xinput-like controls. If you're fine with inline analog sticks, this is a perfect controller.

Steam Machine launched shortly after the controller, and it's a weird one. It's a bit pricey, due to the whole... situation... in the technology hardware space lately, but it's a fairly capable lil' cube. It's not going to compete directly with a PS5 Pro or an RTX 4090 or anything like that, but it's a huge leap above Steam Deck in performance, and I'm happily running everything I've wanted to play on it.

SteamOS is still Arch with some quirks, but my Steam Machine, [Shiho](https://projectsekai.fandom.com/wiki/Hinomori_Shiho), is a solid complete PC running games from a bunch of different stores like EGS and itch, and I'm using a distrobox container to do local development work on it, working around the need to unlock the root filesystem and manually keep OS packages installed every time the base OS image updates.

One of [my favorite games](/2021/12/01/beat-saber/) that I haven't played in quite a while though is Beat Saber. I was a fairly early adopter of VR, owning an original Rift right after they added room-scale tracking, and original Quest, and most recently the Valve Index. All were great for their time, and I'll probably never forget the first few minutes of seeing hand tracking work on the Rift, VR is still incredible to me. So when Steam Frame was rumored for a while, I was very intrigued.

I've also loved what Valve has done with Proton, making it effectively pointless to use Windows for literally anything anymore, and the Frame running an ARM processor was super interesting, since that was *yet another* translation layer that needed to be there now. The Steam Frame can run an x86 Windows game on Linux on an ARM CPU, at a playable framerate, just by clicking a play button? Insane.

The hardware is *amazing*. The headset is incredibly light, very comfortable, nice-fitting, and I'm shocked at how well it stays in place with just the single strap. It's well-balanced, the controllers are fairly nice, and the tracking is fantastic.

The SoC seems quite capable when running native ARM apps, and the core SteamOS in VR experience is fairly solid. The controls are a little weird, with support for both navigating it with a pointer like a typical VR UI, and support for navigating with the analog sticks and d-pad like on Steam Deck or Big Picture mode. Toggling between the interaction modes is easy and instant, but takes some getting used to.

Desktop mode is... weird. It's just a small windowed (maybe 720p?) KDE desktop running as an app within the SteamOS UI, no free-floating Qt windows in physical space or anything, though I'm sure that could be done at some point. The default controller bindings only allow left click with the trigger, and scrolling with the analog stick - no right-click, no ctrl key, nothing fancy. Luckily, the Steam Controller pairs easily over Bluetooth to the Frame, and it has the full Steam Deck's desktop mode integration out of the box, so you get ctrl/alt on the shoulder buttons, right-click on left trigger, arrow keys on d-pad, etc. It's a little weird though - the on-screen keyboard is part of SteamOS in the VR space, so can only be triggered *outside* of desktop mode, most easily with the Frame VR controllers, so you need to switch in and out of the desktop mode's focus state to type anything. None of this is that big of a deal, I mean you're using KDE in VR, what do you expect lol.

Games though. That's what you're *supposed* to use a Steam Frame for, right? Oh boy.

As of right now, the Frame has only been out a few days, and they've already pushed some major updates to SteamOS, so I'm sure a lot of things will improve, but it's not great right now.

Beat Saber is "Frame Verified". Great. What does that mean? Apparently it means 72 Hz at 720p, with lots of stutters. Turning down MSAA and manually overriding it to 90 Hz is doable, and shocking that it's not the default, but this is so far the *best* experience I've had on the Frame, and it was rough. Okay, most of the reviews say the Frame is only fine for running games on-device, but really works best streamed from a PC. Great, it probably shouldn't be $1059 then, but hey the Index was about that much and it didn't even *have* a computer in it, so sure.

So we plug the wireless adapter the Frame includes into the Steam Machine. Steam pops up a "hey install SteamVR?" so I say yes, obviously. So SteamVR installs. "No headset detected". Okay... weird. I try going to Steam Link settings in the Frame and manually pairing with the Steam Machine. That "works" in that now I'm controlling one of my Steam Machine's monitors from inside VR, coincidentally the monitor that *doesn't* have the SteamVR overlay on it, but okay maybe I need to reboot.

Nothing. I'm sure there's some user error here but wow is it incredibly unintuitive to just... play a game?

The next day, we get major software updates to both the Frame and the Machine. Now it finds my Frame! However. Beat Saber runs at a nice frame rate internally on the Steam Machine, but the stutters over the wireless adapter ~3 ft away are immediately noticeable. I reboot everything again, re-connect everything, re-pair everything in software, no changes. Unplayable, especially for a rhythm game, but with how stuttery the whole view is, I'd almost call this an epilepsy risk just standing still in the menu.

So I guess we're back to playing native games for now? They're not performant, but at least they're playable. So far this experience is reminding me a lot of the early days of Steam Deck, and that device's quirks are basically all worked out at this point, so I'm fairly confident that Steam Frame will be an excellent experience in the long-term, but as it is now, I honestly wouldn't recommend it to anyone.

I hate what Meta has done to Oculus, but the Quest 3 is a much better option until Valve gets their software sorted out. Hopefully that's soon. I miss my Index :(

---

To be clear: I'm not saying you should buy a Quest 3. I'm not saying you *shouldn't* buy a Frame. I'm not saying I regret buying mine. I wanted a weird beta product because I like those things, but I also like when things work reliably. It's complicated :)
