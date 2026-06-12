---
layout: ../../layouts/BlogPost.astro
title: Notes Toward LLM Inference Systems
titleZh: LLM 推理系统笔记
description: The opening thread for a blog that treats AI infrastructure as a serious systems discipline.
descriptionZh: 这是一组把 AI 基础设施当作严肃系统学科来写的开篇笔记。
category: Research Notes
categoryZh: 研究笔记
date: 2026-05-19
---

Large language models are usually introduced through model quality, benchmarks, or product demos. The system underneath is less visible: the kernels, runtimes, serving policies, memory movement, batching decisions, and failure modes that decide whether a model can be used at scale.

This blog will use that systems view as its default lens.

## Threads

- Inference serving and scheduling
- GPU kernels for transformer workloads
- Quantization and efficient deployment
- Agent execution runtimes
- Benchmarks that measure production-relevant behavior

## Working Style

Posts here should be useful to a systems reader: concrete enough to implement, careful about assumptions, and honest about tradeoffs.
