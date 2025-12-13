---
title: "Chimera Gate - 将 Claude Code 转成 API"
date: "2025-12-13"
tools: ["claude"]
category: "工作"
action_button:
  text: "访问 Chimera Gate"
  url: "https://github.com/onevcat/chimeragate"
---

我有一个很奇怪的需求，需要把 Claude Code 的订阅想办法转成一个可以通用的 OpenAI API 端点，提供给本地的一些其他服务和 app 使用。请别问为什么会有这种需求，或者为什么不直接用现成的 API 和其他模型...合规啊限制啊这些事儿，说起来那都是泪。

总之，原本应该是从从容容游刃有余的事儿，现在只好匆匆忙忙连滚带爬地给 Claude 的 [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) 套一层 [Hono](https://hono.dev/)，做一些简单的转换，`让 claude CLI 变身成了一个 Open AI 兼容的 API`，提供给本机使用。看了一圈社区里好像也没有什么好用的类似方案，顺手开源出来方便大家有需要的使用，请注意风险提示不要违规。不过我估计应该没什么需求，毕竟并不是谁都能遇到这种奇葩局面的...