# Albert (Ziyu) Zhao — Personal Website

Minimal academic personal website (English). Static site with a home page and a blog: a white page in Lato with a round portrait, pill links, and logo rows for education, experience, and projects.

## Tech stack

- [Astro 6](https://astro.build/) — static output, no UI framework, no integrations (dev toolbar disabled in `astro.config.mjs`)
- Vanilla CSS: `src/styles/global.css` (plus a small `<style is:global>` block in `src/pages/blog/eval-infra-case-study.astro` for the case study)
- Node >= 22.12.0

## Commands

```sh
npm install       # install dependencies
npm run dev       # dev server at http://localhost:4321
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Project structure

```text
/
├── src/
│   ├── layouts/
│   │   ├── Base.astro          # shared HTML shell: head, top nav (not on home), footer
│   │   └── BlogPost.astro      # blog post layout: title, date, reading time, comments
│   ├── components/
│   │   ├── Header.astro        # small top nav on blog pages
│   │   ├── Footer.astro        # footer
│   │   ├── Comments.astro      # giscus comments (hidden until configured in data/site.ts)
│   │   └── LogoMark.astro      # institution logo (links to the organization)
│   ├── data/profile.ts         # links, education, experience, projects
│   ├── data/posts.ts           # blog post list used by the home page and /blog/
│   ├── data/format.ts          # date formatting
│   ├── data/case-study/en.html # case-study body (HTML)
│   ├── data/site.ts            # site URL + giscus comment configuration
│   ├── styles/global.css       # site stylesheet
│   └── pages/
│       ├── index.astro         # home (the bio paragraphs live here)
│       └── blog/
│           ├── index.astro     # blog listing (.md files automatically; Astro-page posts via pagePosts in data/posts.ts)
│           ├── eval-infra-case-study.astro  # case study page (mermaid diagrams)
│           ├── _post-template.md  # copy to start a new post (not published)
│           └── *.md            # blog posts (markdown, layout: BlogPost.astro)
└── public/
    ├── files/                  # CV PDF
    └── images/, logos/         # portrait; web-sized logos (originals in logos/provided/)
```

## Editing content

- **Bio:** the paragraphs at the top of `src/pages/index.astro`.
- **Links, education, experience, projects:** `src/data/profile.ts`. Each entry has a `logo` (`src`, optional `href`, and `wide: true` for wordmark-style logos). Set `profile.email` to show an Email button.
- **CV PDF:** drop the file in `public/files/` and update the `CV` link in `src/data/profile.ts`.
- **Blog posts:** add a markdown file under `src/pages/blog/` using the `BlogPost.astro` layout — copy `src/pages/blog/_post-template.md` to start. The home page and `/blog/` list posts automatically from frontmatter (`title`, `description`, `category`, `date`). Posts can also be written in the browser via Pages CMS, and readers can comment via giscus — see [docs/publishing.md](docs/publishing.md) for the one-time setup, and [docs/writing-tech-posts.md](docs/writing-tech-posts.md) for how to structure a post.
