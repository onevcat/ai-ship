---
title: "When agents multiply, the cockpit matters"
date: "2026-07-10"
tools: ["claude", "codex"]
category: "Work"
action_button:
  text: "Take a Look at Prowl"
  url: "https://prowl.onev.cat"
---

Back in May, my fork [Prowl](https://prowl.onev.cat) shipped a view for managing all agent sessions in one place. A day or two later, Claude Code released its own agent view. Awkward timing aside, it confirmed a hunch: running multiple agents in parallel is already routine, and "how to keep them under control" is becoming a product category of its own.

There are now at least three ways to solve the same problem. Claude Code's agent view takes the built-in route: press the left arrow and you can switch between sessions, though only within its own ecosystem. [herdr](https://herdr.dev/) takes the tmux route: a single Rust binary that opens workspaces, tabs, and panes in the terminal, keeps agents running in the background, and lets you attach back at any time. Prowl takes the GUI route, putting different agents like Claude Code and Codex into one window, with script buttons and a diff view alongside them.

After using them, my impression is this: the capability gap between individual agents is narrowing, and the real bottleneck has moved to the human side. Who is waiting for my input, who has finished, who is stuck: once those states pile up, terminal tabs and memory are no longer enough. A cockpit does not solve the agent's problem. It solves my own attention-scheduling problem. As for choosing TUI or GUI, there is no need to pick a side. It is like choosing an editor: whatever feels right wins.
