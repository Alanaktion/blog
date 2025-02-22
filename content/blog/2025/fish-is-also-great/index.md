---
title: fish is Also Great
date: 2025-02-22T15:30:00
description: fish is the first shell I've used that feels like it's actually designed around how I want to use a shell.
---

fish is the first shell I've used that feels like it's actually designed around how I want to use a shell. As I've gotten more into Python, I've loved the convenience and power of a simplified scripting language, and have grown increasingly annoyed at how limiting and unintuitive POSIX shells are, to the point where I was actually considering trying to write my own Python-compatible shell where Python syntax could be used intermixed with generic commands. Basically a Python script but where `subprocess.run()` would be called most of the time.

I've used bash heavily since I was a kid, and switched to zsh after macOS changed defaults for whatever reason (maybe just for consistency between my platforms), but have always felt both were lacking in various ways.

Then I finally tried fish. I no longer feel like I have any desire to reinvent the shell, because fish did it perfectly.

For the basic user config, the default behavior is intuitive and nice, but easily adjusted. Here's an example of some of my user config in `~/.config/fish/config.fish`:

```fish
# alias is great for running flatpak CLI apps:
alias wine="/usr/bin/flatpak run --command=wine --file-forwarding net.lutris.Lutris"

# nvm works well enough without the global init:
set -gx NODE_VERSION 'lts/*'
alias node="$HOME/.nvm/nvm-exec node"
alias npm="$HOME/.nvm/nvm-exec npm"
alias npx="$HOME/.nvm/nvm-exec npx"
# You can get full functionality of nvm if needed by following their docs, but this is simpler and doesn't slow down the shell the same way, as long as you only need one node version at a time.

# abbr is like alias but better since it expands to the full command interactively and in history:
abbr -a yt yt-dlp
abbr -a artisan php artisan
abbr -a su sudo su -
abbr -a serve python -m http.server
```

Adding more complex functions interactively is nice, just use `funced -s function_name` and you're dropped into an editor, where the syntax is simple and powerful:

```fish
function unzip_all_ja
  for z in *.zip
    unzip -O Windows-31J $z -d (string replace '.zip' '' $z) && rm $z
  end
end
```

Setting the executable path can be done with extending the PATH envvar, but Fish has a global shell variable file that is far more powerful and intuitive in `~/.config/fish/fish_variables`. Adding a path to executables can be done with `fish_add_path <dir>`, which will automatically update the variable globally.

For adjusting much of the global configuration including the prompt style, color schemes, etc. there is a `fish_config` function which will launch a web interface for interactively configuring the shell. Every built-in `fish_*` command can be edited with `funced`, allowing easy customization of default behavior like prompts, terminal titles, command-not-found handling, and more.

The scripting language for functions and logic is similar to bash, but simplified and much more powerful and intuitive. The shell wraps `man` by default to add all of the fish documentation, and `man fish-doc` and `man fish-language` are excellent references for learning it.

If you want to switch, `man fish-tutorial` and `man fish-for-bash-users` are great introductions and cover everything a typical user would need to know. I highly recommend trying it out!
