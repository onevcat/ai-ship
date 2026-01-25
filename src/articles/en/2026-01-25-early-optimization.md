---
title: "AI Makes Early Optimization More Valuable"
date: "2026-01-25"
tools: ["codex"]
category: "Work"
action_button:
  text: "Read the Chroma Original"
  url: "https://onevcat.com/2026/01/chroma/"
---

While writing Chroma (a Swift terminal syntax highlighting library) and `ca` (a highlighted replacement for `cat`), the most worth recording wasn’t the features themselves, but how AI amplified the value of performance optimization. Under continuous benchmark-driven iteration, the tokenizer and renderer performance was pushed to about ten times the original, and the optimization process could run “until satisfaction.”

The core method this time was plain: treat benchmarks as first-class citizens, let AI read the code, find hotspots, propose multiple options, then estimate gains theoretically; make only small changes each time, immediately run the benchmarks, and feed the results into the next round. Optimization is no longer exhausting manual trial-and-error, but a scientific experiment of “hypothesis—verification—correction.” The value of AI isn’t a single genius micro-optimization; it’s lowering the trial-and-error cost enough that we’re willing to finish the job.

Two representative optimizations make this clear: switching the tokenizer/renderer from a batch pipeline to streaming to systematically cut memory and copy costs; adding a fast path for ASCII-dominant real-world input distributions, with a safe fallback for non-ASCII. Neither is a “flash of inspiration,” but both require lots of meticulous changes and validation—exactly the part AI is good at carrying.

Therefore, the old lesson that “premature optimization is the root of all evil” needs a new interpretation in the AI era. We used to avoid early optimization because trial-and-error was expensive and hard to justify in time and mental energy; but in AI-assisted development, those costs are significantly reduced, and many optimizations can be laid out earlier, validated sooner, and iterated repeatedly. I increasingly believe that early optimization doesn’t violate engineering rationality; it’s actually a correct and efficient path.
