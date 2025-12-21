---
title: "告别 MCP，回归 CLI"
date: "2025-12-21"
tools: ["mcp"]
category: "工作"
action_button:
  text: "访问 MCPLI"
  url: "https://github.com/cameroncooke/mcpli"
---

最近在反思 [MCP (Model Context Protocol) 的使用方式](https://onevcat.com/2025/02/mcp/)。虽然协议本身很强大，但在本地跑一堆 server 感觉还是太重了，另外对 agent 的 context window 来说也是一个负担。我开始尝试回归本源，尽量直接使用 CLI 工具来让 AI 调用。

比如用 [Jira CLI](https://github.com/ankitpokhrel/jira-cli) 来处理 JIRA 上的任务，或者用 [AXe](https://github.com/cameroncooke/AXe) 来操作模拟器。背后的理由其实很简单：`不需要跑 server，干净的 binary，管理方便语义清晰`。将 CLI 直接放在 [skill](https://developers.openai.com/codex/skills/) 中，只要 CLI 自身的帮助编写得足够优秀，你甚至不需要额外说明就能让 agent 成为超级高手。

现在有了 Vibe Coding 的加持，如果缺什么工具，自己手搓一个 CLI 也是分分钟的事情。而对于那些暂时还没有办法替代而且你懒得去转 CLI 的 MCP，可以使用 [MCPLI](https://github.com/cameroncooke/mcpli) 作为一个中间层，把 MCP 转成命令行来用，体验也相当不错。
