---
title: "Farewell MCP, Back to the CLI"
date: "2025-12-21"
tools: ["mcp"]
category: "Work"
action_button:
  text: "Visit MCPLI"
  url: "https://github.com/cameroncooke/mcpli"
---

Recently I’ve been rethinking how to [use MCP (Model Context Protocol)](https://onevcat.com/2025/02/mcp/). The protocol itself is powerful, but running a bunch of local servers still feels too heavy, and it’s also a burden on an agent’s context window. I’ve started returning to the basics, leaning on CLI tools directly for AI to call.

For example, use [Jira CLI](https://github.com/ankitpokhrel/jira-cli) to handle JIRA tasks, or [AXe](https://github.com/cameroncooke/AXe) to control the simulator. The reasoning is straightforward: `no server to run, clean binaries, easy to manage, clear semantics`. Put the CLI directly into [a skill](https://developers.openai.com/codex/skills/), and as long as the CLI’s own help is well written, you don’t even need extra instructions for the agent to become a power user.

Now with the boost from Vibe Coding, if you’re missing a tool, whipping up a CLI yourself is a matter of minutes. And for the MCPs that still aren’t easy to replace and you don’t feel like wrapping into a CLI yet, you can use [MCPLI](https://github.com/cameroncooke/mcpli) as a middle layer to convert MCP into command line usage—the experience is quite solid.
