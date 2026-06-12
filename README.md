# Albert (Ziyu) Zhao — Personal Website

Bilingual (English / 中文) academic personal website. Static site with a home page and a blog. Every page renders both languages; a header toggle switches between them client-side without a reload.

## Tech stack

- [Astro 6](https://astro.build/) — static output, no UI framework, no integrations (dev toolbar disabled in `astro.config.mjs`)
- Vanilla CSS, all in one file: `src/styles/global.css`
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
│   │   ├── Base.astro          # shared HTML shell: head, Header/Footer, language-toggle script
│   │   └── BlogPost.astro      # blog post layout: title, date, reading time, comments
│   ├── components/
│   │   ├── Header.astro        # site nav + language toggle button
│   │   ├── Footer.astro        # footer
│   │   ├── Comments.astro      # giscus comments (hidden until configured in data/site.ts)
│   │   └── LogoMark.astro      # institution logo renderer
│   ├── data/profile.ts         # ALL site content (bio, education, experience, projects, news)
│   ├── data/site.ts            # site URL + giscus comment configuration
│   ├── styles/global.css       # the only stylesheet
│   └── pages/
│       ├── index.astro         # home
│       └── blog/
│           ├── index.astro     # blog listing (auto-generated from the .md files)
│           ├── _post-template.md  # copy to start a new post (not published)
│           └── *.md            # blog posts (markdown, layout: BlogPost.astro)
├── public/
│   ├── files/                  # CV PDF
│   └── images/, logos/, brand/ # photos, institution logos, site mark
└── archive/visual-regression/  # screenshot harness (not part of the build)
```

## Editing content

- **Almost everything lives in `src/data/profile.ts`.** It exports `profile`, `education`, `experience`, `projects`, `news`, and `newsZh`. Each entry has parallel English/Chinese fields (e.g. `intro` / `introZh`, `degree` / `degreeZh`) — keep both in sync when editing.
- **CV PDF:** drop the file in `public/files/` and update the `CV` link in `src/data/profile.ts` (the sidebar chip links straight to the PDF).
- **Blog posts:** add a markdown file under `src/pages/blog/` using the `BlogPost.astro` layout — copy `src/pages/blog/_post-template.md` to start. The `/blog/` index lists posts automatically from frontmatter (`title`, `titleZh`, `description`, `category`, `date`); no manual listing needed. Posts can also be written in the browser via Pages CMS, and readers can comment via giscus — see [docs/publishing.md](docs/publishing.md) for the one-time setup, and [docs/writing-tech-posts.md](docs/writing-tech-posts.md) for how to structure a post.

## Language toggle

No i18n framework. Bilingual text is authored inline as paired spans:

```html
<span class="lang-en">Download PDF CV</span><span class="lang-zh">下载 PDF 简历</span>
```

An inline script in `src/layouts/Base.astro` sets `data-lang` on `<body>` (defaulting from `navigator.language`, persisted under the localStorage key `site-lang`), and CSS rules in `global.css` show/hide `.lang-en` / `.lang-zh` accordingly. Add the `block` class to a `.lang-zh` span when it should render as a block element in Chinese mode.

## Visual regression (archive/visual-regression/)

A lightweight screenshot harness using Playwright + pixelmatch (dev dependencies). It runs against a **running dev server** at `localhost:4321`:

```sh
npm run dev                                          # in one terminal
node archive/visual-regression/shoot.mjs <out-dir>   # screenshot all routes (en/zh × desktop/mobile)
node archive/visual-regression/compare.mjs baseline <out-dir>  # pixel-diff against baseline/
```

`shoot.mjs` captures full-page screenshots of every route in both languages and two viewports. `compare.mjs` diffs two screenshot directories and writes diff images to `<out-dir>/diff/`, exiting nonzero on any mismatch. `baseline/` holds the reference images.
