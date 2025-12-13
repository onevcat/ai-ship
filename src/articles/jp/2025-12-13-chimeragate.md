---
title: "Chimera Gate - Claude Code を API に変換"
date: "2025-12-13"
tools: ["claude"]
category: "仕事"
action_button:
  text: "Chimera Gate を訪問"
  url: "https://github.com/onevcat/chimeragate"
---

少し奇妙な要件があって、Claude Code のサブスクリプションをどうにかして汎用的な OpenAI API エンドポイントに変換し、ローカルの他のサービスやアプリから使えるようにする必要がありました。なぜそんな要件があるのか、あるいはなぜ既成の API や他のモデルをそのまま使わないのかは聞かないでください……コンプライアンスだの制限だの、語り出すと涙なしでは済まない話なので。

ともあれ、本来なら余裕でさばけるはずのことが、今は急いで取り繕うしかなくて、Claude の [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) に [Hono](https://hono.dev/) を一枚かぶせ、簡単な変換を入れて、`claude CLI を OpenAI 互換の API に変身させた` 形でローカル向けに提供することにしました。コミュニティを一通り見ても、使いやすい類似案はあまり見当たらなかったので、必要な人が使えるように手早く OSS として公開しておきます。リスク提示には注意して、規約違反にならないようにしてください。ただ、たぶん需要はほとんどないと思います。というのも、こんな奇妙な状況にぶつかる人はそう多くないでしょうから……。
