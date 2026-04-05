---
title: Steam Deck Silliness
date: 2026-04-04T17:00:00
description: Pushing the Deck further than is reasonably useful.
---

Following up on my [first Steam Deck post](/2023/04/23/steam-deck/), I've tried some far less practical things with it now too.

## Development 💻

For basic desktop app use, the Discover store will let you easily install a lot of apps, including things like VS Code, Qt Creator, Builder, and Godot. Depending on what you want to do, this might be all you need.

If you're the type of person that's actually reading a blog like this, you should be using the Beta branch of SteamOS. Then, make sure you know the basics of Arch Linux before you break everything 🙃

On the beta branch, the `pacman` repos include basically everything you'd expect in upstream Arch. For me, I've found a number of basic packages/steps incredibly useful:

```bash
# Allow modifying root filesystem and set up pacman:
sudo steamos-readonly disable
sudo pacman-key --init
sudo pacman-key --populate

# Install the most useful development packages:
sudo pacman -S --needed \
  base-devel git git-lfs cmake glibc go go-tools android-tools android-udev
pip3 install --user -U \
  build twine pip setuptools wheel \
  autopep8 flake8

# Enable printer/scanner support:
sudo pacman -S --needed cups print-manager skanlite sane-airscan
sudo systemctl enable --now cups.service

# Media stuff if you want to do video/audio/image-y things:
sudo pacman -S --needed \
  qt5-imageformats libwebp libheif libavif libpng12 \
  imagemagick graphicsmagick pngquant pngcrush \
  ffmpeg livba-utils handbrake-cli
pip3 install --user -U \
  Pillow piexif yt-dlp
```

### ML 💡

Shared VRAM/system RAM makes using GPU compute impractical, but running ML models on CPU with system RAM generally works okay, if a bit slow. Definitely not what the Deck was intended for, but I've been surprised at how usable it actually is for running existing models. Definitely wouldn't use the Deck for training or ML development, but as a target platform it kinda works.

- Llama 3, Deepseek R1 distills, etc. with CPU is quite usable, for any model that fits in RAM. Llama 3.2 in particular is fast enough to be useful on the Deck.
- PyTorch works semi-okay with CPU compute, I've used Stable Diffusion image generation with < 1MP resolutions on non-SDXL models without issues. The SD Web UI project mostly works fine out of the box, requiring minimal adjustment as long as you keep the models really small.

## Dual-boot 🖥️

While the SteamOS bootloader doesn't currently support booting multiple operating systems from the internal SSD, the Deck is very usable when booting other OSs from microSD or USB. Using a microSD install of Windows works quite well, and lets you easily and cleanly isolate the Windows and SteamOS stuff. Just remember to install the drivers for the microSD reader or you'll have issues 😛

USB boot for basically any OS works great, especially with a dock/hub. The one thing I still want to try at some point is getting macOS running on it. I feel it'll be a bit of a stretch to make it at all usable, especially without a dock and external peripherals, but I want to see how far it can go.
