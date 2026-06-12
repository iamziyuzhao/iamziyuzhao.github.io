# How to Write a Comprehensive Tech Blog Post

*A practical guide for an ML systems researcher starting a technical blog.*

## 1. The Shape of a Comprehensive Post

Depth is rewarded: [freeCodeCamp's data](https://www.freecodecamp.org/news/how-to-write-for-freecodecamp/) shows that more detailed tutorials earn longer read times and more shares. But comprehensive posts need scaffolding. A default template:

- **TL;DR / summary block.** Apply the inverted pyramid fractally — [Matt Dodson](https://wellshapedwords.com/essentials/practices/) insists the most important sentence comes first at every level: page, section, paragraph. "People don't read, and that's okay! Help them read less." Write the TL;DR last, once you know your core message.
- **Introduction (1–3 paragraphs).** Answer three questions, per the [Draft.dev style guide](https://draft.dev/learn/styleguide): What's the pain point? What's the solution? What will this article do? [Sashko Stubailo](https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/) warns you win or lose readers here — don't save the reveal for the end.
- **Prerequisites.** For tutorial-style posts, [TechWithMaddy](https://techwithmaddy.com/how-to-write-a-technical-blog-post-template) recommends listing required tools, versions, and assumed knowledge right after the intro.
- **Background/Context.** The "why" — for ML systems posts, the workload, hardware, and constraints ([DevRel Bridge](https://devrelbridge.com/blog/developer-friendly-blog-post-structure)).
- **Main body.** Heavy signposting: headings every 200–300 words, numbered lists, one task per step. For war stories (debugging a training stall, optimizing a kernel), use [Anvil Engineering's story spine](https://www.useanvil.com/blog/engineering/writing-technical-blog-posts-with-the-story-spine/): what I was doing → the problem → why it hurt → requirements → rejected alternatives → the solution → replication steps → the improved end state. Keep nesting to ~3 heading levels (Dodson: "deep hierarchies reduce coherence").
- **Conclusion.** "Don't just taper off into the void" (Stubailo): restate the thesis, summarize what the reader learned, link further resources.

Length: Stack Overflow's [contributor guidelines](https://stackoverflow.blog/2020/01/27/blog-contributor-guidelines/) anchor a solid post at ~1,500 ± 500 words; deep technical dives justify 2,000–3,000+. Cover the topic completely, then stop.

## 2. Craft Principles

- **Write for one person — usually past-you.** [Julia Evans](https://jvns.ca/blog/2023/06/05/some-blogging-myths/) debunks "write for beginners and experts alike": pick one reader. [swyx](https://www.swyx.io/learn-in-public): "Make the thing you wish you had found when you were learning."
- **Blog what you struggled with, while it's fresh.** Evans: ["if I struggled with something, there's a pretty good chance other people are struggling with it too"](https://jvns.ca/blog/2021/05/24/blog-about-what-you-ve-struggled-with/) — and struggle yields specific topics ("deadlocks in Go," not "learning Go"). Write it down before the confusion fades.
- **Hedge honestly.** Evans marks uncertainty inline ("My understanding is…", "I think…") and says ["telling people what I don't know means they can help me learn it sooner"](https://jvns.ca/blog/2016/05/22/how-do-you-write-blog-posts/). For a grad student, this is doubly true — and [Gergely Orosz](https://bloggingfordevs.com/gergely-orosz-interview/) adds: if you lack standing, quote experts and layer your analysis on top. Also establish credibility in paragraph one ("I benchmarked this across 64 A100s for my thesis").
- **Outline before prose.** [Heinrich Hartmann](https://www.heinrichhartmann.com/posts/writing/): fix the message and storyline first, "start at the top, not the beginning," and block 3+ uninterrupted hours while context is hot. [Rizèl Scarlett](https://dev.to/blackgirlbytes/the-ultimate-guide-to-writing-technical-blog-posts-5464): "write for completion rather than perfection" — don't edit while drafting.
- **Lower the bar with TILs.** [Simon Willison](https://simonwillison.net/2022/Nov/6/what-to-blog-about/) calls "I just figured this out: here are my notes" the most liberating format; he treats writing about a project as part of its definition of done.

## 3. Code, Figures & Benchmarks

- **Copy-paste safety** ([Michael Lynch](https://refactoringenglish.com/chapters/rules-for-software-tutorials/)): no `$` prompts in copyable blocks, no line numbers, chain commands with `&&`, add `--yes` flags, use long self-documenting flags (`--ignore-case`), pin versions ("tested on PyTorch 2.4, CUDA 12.4").
- **Keep code working at every checkpoint**, never reference undefined functions, and link a complete repo — ideally with branches per stage (Lynch). [Google's style guide](https://developers.google.com/style/code-samples): introduce every block with prose ending in a colon; mark omissions with comments, never ellipses.
- **Minimize like a bug report.** [Matthew Rocklin](https://matthewrocklin.com/minimal-bug-reports): synthetic data exposing only the triggering characteristic, the least code that reproduces the behavior, full tracebacks. You pay the minimization cost once so each reader doesn't.
- **Benchmarks** — essential for ML systems writing. Run [Brendan Gregg's checklist](https://www.brendangregg.com/blog/2018-06-30/benchmarking-checklist.html): Why not double? Was it tuned? Did it break hardware limits? Did it error? Does it reproduce? Does it matter? Did it even happen? Publish the limiting factor next to every number, with [observability evidence](https://www.brendangregg.com/activebenchmarking.html). His warning: "you benchmark A, but actually measure B, and conclude you've measured C."
- **Diagrams**: show only components essential to the point ([Draft.dev](https://draft.dev/learn/how-to-create-diagrams-for-technical-blog-posts)); Excalidraw's sketchy style is a feature — it reads as "conceptual sketch," lowering polish cost. Willison: include screenshots and real outputs so the post survives bit-rot.

## 4. Titles, Audience & Editing

- **Title + first three sentences must answer**: "Is this for someone like me?" and "What do I get?" ([Lynch](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/)). Write the title last, and make it take a stance, not describe ([Ankur Tyagi](https://theankurtyagi.com/how-to-write-good-and-bad-blog-post-titles/)). Short, first-person titles with a curiosity gap that the post pays off perform best ([Daniel Wirtz](https://danielwirtz.com/blog/successful-hacker-news-article)).
- **Calibrate audience** with Google's equation: needed knowledge minus what readers already have ([Google Tech Writing Course](https://developers.google.com/tech-writing/one/audience)). Fight the curse of knowledge: define acronyms, keep one idea per sentence, active voice, consistent terminology.
- **Mine your unique vantage point.** [Aline Lerner](https://blog.alinelerner.com/how-to-write-stuff-that-gets-on-the-front-page-of-hacker-news/): the reliable formula is validating a frustration readers already feel, backed by data only you have — your experiments and cluster traces qualify.
- **Edit big-to-small** ([Draft.dev](https://draft.dev/learn/5-steps-to-a-quality-edit-for-your-technical-blog)): technical accuracy review first, then structure, then copy edit. Never polish prose in factually flawed content. Run Lynch's skimmer test: do headings and figures alone tell the story? And don't judge a post dead after one quiet launch — top HN posts often [succeed on resubmission](https://refactoringenglish.com/blog/2025-hn-top-5/).

## 5. Pre-Publish Checklist

- [ ] Title makes a claim; first paragraph states pain point, solution, and plan
- [ ] TL;DR at top (written last); most important point first in every section
- [ ] Headings every ~200–300 words; ≤3 nesting levels; skimmer test passes
- [ ] Prerequisites listed with pinned versions
- [ ] All code runs as pasted; repo linked; omissions marked with comments
- [ ] Benchmarks pass Gregg's seven questions; limiting factor stated with evidence
- [ ] Uncertainty hedged explicitly; claims attributed
- [ ] Real conclusion with summary and next step
- [ ] Read aloud once; technical peer review before copy edit

## 6. Recommended Reading

- [How to write a great technical blog post](https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/) — Sashko Stubailo
- [Rules for software tutorials](https://refactoringenglish.com/chapters/rules-for-software-tutorials/) and [Write blog posts developers read](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/) — Michael Lynch
- [Some blogging myths](https://jvns.ca/blog/2023/06/05/some-blogging-myths/) — Julia Evans
- [What to blog about](https://simonwillison.net/2022/Nov/6/what-to-blog-about/) — Simon Willison
- [Writing for Engineers](https://www.heinrichhartmann.com/posts/writing/) — Heinrich Hartmann
- [Benchmarking checklist](https://www.brendangregg.com/blog/2018-06-30/benchmarking-checklist.html) — Brendan Gregg
- [Minimal bug reports](https://matthewrocklin.com/minimal-bug-reports) — Matthew Rocklin
- [The story spine for engineering posts](https://www.useanvil.com/blog/engineering/writing-technical-blog-posts-with-the-story-spine/) — Anvil Engineering
- [Technical Blogging Style Guide](https://draft.dev/learn/styleguide) — Draft.dev
- [How to write stuff that gets on the front page of Hacker News](https://blog.alinelerner.com/how-to-write-stuff-that-gets-on-the-front-page-of-hacker-news/) — Aline Lerner
- [Audience analysis](https://developers.google.com/tech-writing/one/audience) — Google Technical Writing Course
