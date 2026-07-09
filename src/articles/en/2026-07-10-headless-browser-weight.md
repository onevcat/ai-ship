---
title: "I Ran a Full Chrome Just to Read a Few Tweets"
date: "2026-07-10"
tools: ["claude"]
category: "Work"
---

Today I wanted an agent to fetch my own X timeline, so I tried the lightweight options I had on hand. The fxtwitter API only returns profile metadata, not tweets. Jina Reader has x.com blocked for the entire domain, because someone previously hammered a major account's profile hard enough to trigger risk controls. In the end, [agent-browser](https://github.com/vercel-labs/agent-browser) plus a full Chromium worked on the first try, at the cost of downloading over 100 MB of browser engine first.

What makes this interesting is that lightweight headless browsers built specifically for agents really have been multiplying lately. [Obscura](https://github.com/h4ckf0r0day/obscura), sitting in my bookmarks, is rewritten in Rust, uses 30 MB of memory, claims to be ten times lighter than Chrome, and even has built-in anti-detection. [Lightpanda](https://lightpanda.io/), written from scratch in Zig, focuses on millisecond-level startup. I fully agree with the direction: agents browse the web constantly, and carrying an entire Chrome for a task that lasts a few seconds is undeniably extravagant.

But today's experiment gave me a more sober take: for hard targets like x.com, "being like a real browser" is itself the core capability, and anti-scraping systems are checking precisely the parts that got made "light." The ceiling of a lightweight browser depends on its Web API coverage, and filling in those gaps is not fundamentally different from building a browser again. So my current approach is layered: use curl or reader-style services for static pages, give lightweight options a chance on ordinary dynamic pages, and switch honestly to a full engine when login walls or anti-bot systems show up. Slimming down is the ideal; the fallback works because it has weight.
