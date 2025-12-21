---
title: "MCP に別れを告げ、CLI に回帰"
date: "2025-12-21"
tools: ["mcp"]
category: "仕事"
action_button:
  text: "MCPLI にアクセス"
  url: "https://github.com/cameroncooke/mcpli"
---

最近、[MCP (Model Context Protocol) の使い方](https://onevcat.com/2025/02/mcp/)を見直している。プロトコル自体はとても強力だが、ローカルで多数の server を動かすのはやはり重く感じるし、agent の context window にとっても負担になる。そこで原点に立ち返り、できるだけ CLI ツールを直接使って AI から呼び出す方針を試し始めた。

例えば [Jira CLI](https://github.com/ankitpokhrel/jira-cli) で JIRA のタスクを処理したり、[AXe](https://github.com/cameroncooke/AXe) でシミュレーターを操作したりする。理由は単純で、`server を走らせる必要がない、クリーンな binary、管理が楽で意味が明確` ということだ。CLI をそのまま [skill](https://developers.openai.com/codex/skills/) に置き、CLI 自体のヘルプが十分に優れていれば、追加の説明なしでも agent を超熟練にできる。

いまは Vibe Coding の後押しもあり、足りないツールがあれば自作 CLI くらいはすぐに作れる。そして、まだ置き換えが難しく、CLI 化する気が起きない MCP については、[MCPLI](https://github.com/cameroncooke/mcpli) を中間層として使えば MCP をコマンドラインに変換でき、体験もかなり良い。
