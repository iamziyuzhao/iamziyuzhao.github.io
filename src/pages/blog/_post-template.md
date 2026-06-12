---
# Copy this file to a new name (e.g. my-post.md) to start a post.
# Files starting with "_" are not published and not listed on /blog/.
# Structure follows docs/writing-tech-posts.md — delete sections you don't need.
layout: ../../layouts/BlogPost.astro
title: A Title That Makes a Claim, Not a Description
titleZh: 中文标题（可选）
description: One sentence stating the pain point and what the reader gets. Used on /blog/ and in the meta tag.
descriptionZh: 中文摘要（可选）
category: Research Notes
categoryZh: 研究笔记
date: 2026-01-01
---

**TL;DR** — Write this last. The single most important finding/claim of the post, with the key number if there is one.

Open with 1–3 paragraphs answering three questions: What's the pain point? What's the solution? What will this post do? State your vantage point in the first paragraph ("I benchmarked this across…") — don't save the reveal for the end.

## Background

The "why": the workload, the hardware, the constraints. Define acronyms on first use. Assume one specific reader (usually past-you, three months ago) and write for them.

For tutorial-style posts, list prerequisites here: tools, versions ("tested on PyTorch 2.4, CUDA 12.4"), assumed knowledge.

## The Problem

What you were doing, what broke or was too slow, why it hurt, and what a fix needed to satisfy. Mention the alternatives you rejected and why — that's often the most valuable part for the reader.

## The Solution

A heading roughly every 200–300 words; one idea per step. Introduce every code block with a sentence ending in a colon:

```python
# Keep examples minimal and runnable end to end.
# No "$" prompts in copyable blocks; pin versions; mark omissions
# with comments, never bare ellipses.
def example() -> None:
    ...
```

For benchmarks, publish the limiting factor next to every number, say how it was measured, and run Brendan Gregg's checklist (Why not double? Was it tuned? Does it reproduce?).

## Results

Real numbers, real outputs, screenshots where useful — they also protect the post against bit-rot. Be honest about what you didn't test; hedge inline ("my understanding is…") rather than overclaiming.

## Conclusion

Don't taper off into the void: restate the thesis, summarize what the reader now knows, link the repo and further reading.

<!-- Pre-publish: title makes a claim · TL;DR written last · headings alone tell
the story (skimmer test) · code copy-paste-safe · accuracy review before copy
edit · one quiet launch is not a verdict -->
