# Albert (Ziyu) Zhao — Personal Website

Bilingual (English / 中文) academic personal website. Static site with pages for home, CV, projects, blog, and writing. Every page renders both languages; a header toggle switches between them client-side without a reload.

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
│   ├── layouts/Base.astro      # shared HTML shell: head, Header/Footer, language-toggle script
│   ├── components/
│   │   ├── Header.astro        # site nav + language toggle button
│   │   ├── Footer.astro        # footer
│   │   └── LogoMark.astro      # site logo mark
│   ├── data/profile.ts         # ALL site content (bio, education, experience, projects, news)
│   ├── styles/global.css       # the only stylesheet
│   └── pages/
│       ├── index.astro         # home
│       ├── cv.astro            # CV page, links the PDF in public/files/
│       ├── projects/index.astro
│       ├── writing/index.astro
│       └── blog/
│           ├── index.astro     # blog listing
│           └── *.md            # blog posts (markdown, layout: Base.astro)
├── public/
│   ├── files/                  # CV PDF
│   └── images/, logos/, brand/ # photos, institution logos, site mark
└── archive/visual-regression/  # screenshot harness (not part of the build)
```

## Editing content

- **Almost everything lives in `src/data/profile.ts`.** It exports `profile`, `education`, `experience`, `projects`, `news`, and `newsZh`. Each entry has parallel English/Chinese fields (e.g. `intro` / `introZh`, `degree` / `degreeZh`) — keep both in sync when editing.
- **CV PDF:** drop the file in `public/files/` and update the link in `src/pages/cv.astro`.
- **Blog posts:** add a markdown file under `src/pages/blog/` with `layout` pointing at `Base.astro`; it gets a route from its filename. Update the listing in `src/pages/blog/index.astro` as needed.

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
