# Publishing & Comments

How to publish blog posts from the browser (no manual file uploads) and let
readers comment. Everything is already wired into the repo; what remains is a
**one-time GitHub setup (~15 minutes)**.

## How it works

```
you write in Pages CMS (browser)          readers comment via giscus
            │                                        │
            ▼                                        ▼
   commit lands in GitHub repo  ──►  GitHub Discussions stores comments
            │
            ▼
   GitHub Action builds Astro  ──►  site live on GitHub Pages (~1 min)
```

- Posts are still plain markdown in `src/pages/blog/` — the CMS just edits the
  repo for you, so nothing about the site changes and you can always edit
  locally too.
- Comments are stored in GitHub Discussions via [giscus](https://giscus.app):
  free, no ads, no database, spam-resistant (commenters sign in with GitHub —
  natural for a systems/ML audience).

## One-time setup

### 1. Create the GitHub repo and push

Create a **public** repo named `<your-username>.github.io` on GitHub
(this exact name gives the site a clean root URL with no path prefix), then:

```sh
cd personal_website
git remote add origin git@github.com:<your-username>/<your-username>.github.io.git
git push -u origin main
```

### 2. Turn on GitHub Pages

Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The workflow at `.github/workflows/deploy.yml` deploys on every push to
`main`. The site appears at `https://<your-username>.github.io` after the
first run (check the Actions tab).

### 3. Turn on comments

1. Repo **Settings → General → Features**: enable **Discussions**.
2. In the repo's Discussions tab, create a category **"Blog comments"** with
   type **Announcement** (so only giscus creates threads, but anyone can reply).
3. Install the giscus app for the repo: <https://github.com/apps/giscus>.
4. Open <https://giscus.app>, enter the repo, pick the "Blog comments"
   category, and copy the generated `data-repo-id` and `data-category-id`.
5. Paste them into [`src/data/site.ts`](../src/data/site.ts) (replace
   `giscus: null` with the filled object), commit, push. Comment boxes now
   appear under every post.

### 4. Connect the web editor

Go to <https://app.pagescms.org>, sign in with GitHub, and select the repo.
You'll see **Blog posts** (configured by `.pages.yml`): a clean editor with
title/description/date fields, a rich-text body, and image uploads. **Saving
commits to the repo, which auto-deploys the site.** That's the whole
publish flow.

## Day-to-day writing

1. Open app.pagescms.org → Blog posts → **Add entry**.
2. Name the file in lowercase-with-hyphens (it becomes the URL slug,
   e.g. `paged-attention-notes.md` → `/blog/paged-attention-notes/`).
3. Write (structure guide: [writing-tech-posts.md](writing-tech-posts.md),
   skeleton: `src/pages/blog/_post-template.md`), set the date, save.
4. The site rebuilds automatically in about a minute.

Fallbacks that always work: edit files directly on github.com, or locally +
`git push` — same auto-deploy.

## Notes

- The comment section is invisible until step 3 is completed, so the site
  can be deployed immediately and comments added later.
- If you ever use a custom domain, set it in Settings → Pages.
