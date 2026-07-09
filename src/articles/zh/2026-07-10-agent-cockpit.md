---
title: "agent 多了之后，拼的是驾驶舱"
date: "2026-07-10"
tools: ["claude", "codex"]
category: "工作"
action_button:
  text: "看看 Prowl"
  url: "https://prowl.onev.cat"
---

五月的时候，我的 fork [Prowl](https://prowl.onev.cat) 上线了统管全部 agent 会话的视图，结果一两天后 Claude Code 就发布了自己的 agent view。撞车归撞车，倒是印证了一个判断：并行跑多个 agent 已经是日常，而"怎么管住它们"正在变成一个独立赛道。

同一个问题，现在至少有三种解法。Claude Code 的 agent view 走内置路线，按个左箭头就能在会话间切换，但只管自家；[herdr](https://herdr.dev/) 走 tmux 路线，一个 Rust 单二进制在终端里开工作区、标签页、窗格，agent 在后台继续跑，你随时 attach 回去；Prowl 则是 GUI，把 Claude Code、Codex 这些不同的 agent 放进同一个窗口，配上脚本按钮和 diff view。

用下来我的体感是：单个 agent 之间的能力差距在缩小，真正的瓶颈挪到了人这一侧——谁在等我输入、谁跑完了、谁卡死了，这些状态一多，靠终端标签页和脑内记忆就管不过来了。驾驶舱解决的不是 agent 的问题，是我自己注意力调度的问题。至于选 TUI 还是 GUI，倒不用站队，跟选编辑器一样，顺手就是正义。
