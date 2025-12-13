---
title: "Chimera Gate - Turning Claude Code into an API"
date: "2025-12-13"
tools: ["claude"]
category: "Work"
action_button:
  text: "Visit Chimera Gate"
  url: "https://github.com/onevcat/chimeragate"
---

I have a pretty odd requirement: I need to somehow convert a Claude Code subscription into a general-purpose OpenAI API endpoint, so it can be used by some other local services and apps. Please don’t ask why I have this need, or why I’m not just using an existing API and other models… compliance, restrictions, and all that stuff—it’s a long story, and it’s all tears.

Anyway, what should have been a calm, straightforward task turned into something I had to rush through. I ended up wrapping Claude’s [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) with [Hono](https://hono.dev/), doing some simple translation in between, and `turning the claude CLI into an OpenAI-compatible API` for local use on my machine. I looked around the community and didn’t see any similarly usable solutions, so I open-sourced it along the way in case others need it—just mind the risk warnings and don’t break any rules. That said, I doubt there’s much demand for this, since not everyone runs into a bizarre situation like mine…
