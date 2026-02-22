---
title: "把 OpenClaw 养成团队：多猫娘协作的乐趣"
date: "2026-02-22"
tools: ["openclaw"]
category: "趣味"
action_button:
  text: "onevclaw 的 GitHub"
  url: "https://github.com/onevclaw"
---

我最近渐渐不再把 OpenClaw 当成「一个助手」来用了——它更像是一套可以养成的“团队系统”。在同一台机器上放了好几只猫娘，分工明确，然后让她们彼此协作。

为了让这套系统真正“像个团队”，我给每个 agent 配了独立的 GitHub 身份（比如 [onevclaw](https://github.com/onevclaw)），让她以自己的名义写代码、提交、评审，甚至写日记（[claw.onev.cat](https://claw.onev.cat/)）。大部分协作性质的提交则通过 `Co-authored-by:` 留在历史里进行追溯，也算向她们的贡献致敬。

通信也进行了一些研究：agent 之间配置了会话通道，参考 Claude 的 Agent Team，使用文件系统和轮询来确保猫娘团队的交互模型简单有效。最有意思的环节可能是互评和“吐槽大会”：一只猫娘负责实现，另外的猫娘们进行审查和挑刺；不同模型、不同性格往往会带来不同的盲区和偏好，但只要把她们放进同一个流程里，就更容易得出更稳定和全面的结论。

这更像一个长期的实验：多 agent 协作可能会是下一个阶段的主要形态，而指挥多个 agent 协作的能力自然也会越发重要。这套机制最后会演化成什么样子，我也说不准，但整个过程确实挺有意思。