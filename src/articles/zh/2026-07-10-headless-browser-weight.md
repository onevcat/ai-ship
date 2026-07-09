---
title: "为了看几条推文，我跑了一个完整的 Chrome"
date: "2026-07-10"
tools: ["claude"]
category: "工作"
---

今天想让 agent 抓一下我自己的 X 时间线，顺手把手边的轻量方案挨个试了一遍。fxtwitter 的 API 只给 profile 元数据，拿不到推文；Jina Reader 对 x.com 整个域名处于封禁状态，因为之前有人拿它对着某个大 V 的主页薅到触发了风控。最后还是 [agent-browser](https://github.com/vercel-labs/agent-browser) 加一个完整的 Chromium 一次通过，代价是先下载一百多 MB 的浏览器内核。

这件事有意思的地方在于，专为 agent 造的轻量无头浏览器最近确实越来越多。收藏夹里躺着的 [Obscura](https://github.com/h4ckf0r0day/obscura) 用 Rust 重写，内存 30 MB，号称比 Chrome 轻十倍还内置反检测；用 Zig 从零写起的 [Lightpanda](https://lightpanda.io/) 主打毫秒级启动。方向我完全认同，agent 上网是高频动作，为一个几秒钟的任务背一整个 Chrome 确实奢侈。

但今天的实践给了我一个更冷静的判断：对 x.com 这类硬目标，"像一个真的浏览器"本身就是核心能力，而反爬系统检测的恰恰是那些被"轻"掉的部分。轻量浏览器的上限取决于 Web API 的覆盖度，把这些补齐的工程量和重新做一个浏览器没有本质区别。所以我目前的用法是分层：静态页面用 curl 或 reader 类服务，一般的动态页面可以给轻量方案一个机会，遇到登录墙和反爬就老老实实上完整内核。减肥是理想，兜底靠体重。
