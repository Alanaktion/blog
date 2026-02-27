---
title: Ender 3 kinda sucks
date: 2024-11-18T22:00:00
description: I like 3D printers. They're neat. I'm tired of my Ender 3 though.
---

I like 3D printers. They're neat. I'm tired of my Ender 3 though.

I know this is _very_ old news, considering how long the Ender 3 has been around. I've been fairly reliant on mine for a number of years now, but I've grown increasingly disappointed in it, especially with some of it's inherent design limitations that really compromise the usability and reliability.

Many other cheap printers have similar designs with similar limitations, but having also tried some other printers that _don't_ have these issues, they still frustrate me.

## The extruder

The Ender 3 has separate assemblies for the print nozzle and extruder motor. This reduces weight on the X-axis arm, which can help with stability, especially since the arm is only really supported on one side of the structure. Sadly, it also means the distance between the stepper motor feeding the nozzle and the actual nozzle is significant, and potentially variable. The solution is to have a fixed tube between the motor and nozzle assemblies, but to ensure the feeding and retraction are accurate it needs to precisely fit the filament.

The feeder tube makes tolerances on filament much more important than they would otherwise be if the extruder was a single assembly directly feeding into the nozzle. It also introduces a bunch of new points of failure, mainly with the connection points between tube and assemblies. Filaments with less common materials (especially with increased flexibility or friction) are dramatically affected, leading the extrusion to be inaccurate and unreliable.

## The Z-axis

Not too terrible, but the Z-axis motor only directly controls one side of the structure. This means the horizontal X-axis arm that's raised/lowered by the Z-axis motor can lag behind changes on one side, causing a difference in height adjustment depending on where the extruder is on the X-axis. I haven't experienced serious issues with this as long as I keep belts and such adjusted just right, but it's a frustrating limitation compared to some other printers.

Seems like it could easily be improved with another belt. Make the right side of the arm actually actively controlled rather than just being dragged along by the changes to the left side. 🤷🏻

## The firmware

It's slow, it crashes, I just generally dislike it. Many useful features for live adjustment of the print job though, which is very nice when trying to work around the printer's limitations.

## The control knob

The knob used to control the printer (when not controlling it by USB or serial or whatever) is very unreliable, with it often missing presses and rotations. Not a _problem_ necessarily, but adds to the cheap and unreliable feel of using the printer.
