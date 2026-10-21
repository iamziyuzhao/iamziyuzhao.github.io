export interface Post {
  url: string;
  title: string;
  description?: string;
  category?: string;
  date: string;
  readMins: number | null;
}

interface MarkdownPost {
  url: string;
  rawContent: () => string;
  frontmatter: {
    title: string;
    description?: string;
    category?: string;
    date?: string;
  };
}

// Markdown posts. Files starting with "_" (e.g. _post-template.md) are not
// routed by Astro and are excluded here too.
const mdPosts = Object.values(
  import.meta.glob<MarkdownPost>("../pages/blog/[!_]*.md", { eager: true }),
).map((post) => {
  const words = post.rawContent().trim().split(/\s+/).length;
  return {
    url: post.url,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    category: post.frontmatter.category,
    // YAML parses an unquoted date into a Date; normalize to "YYYY-MM-DD"
    date: post.frontmatter.date ? new Date(post.frontmatter.date).toISOString().slice(0, 10) : "",
    readMins: words ? Math.max(1, Math.round(words / 200)) : null,
  };
});

// Rich posts authored as Astro pages (diagrams, tables) that live at their own
// route. Their page reads its title/date/etc. from here, and they are listed
// once they are added to pagePosts.
export const caseStudy: Post = {
  url: "/blog/eval-infra-case-study",
  title: "Harbor, verifiers, and slime: agent-first RL infrastructure",
  description:
    "A close read of three systems — Harbor, Prime Intellect's verifiers, and slime — and how agent infrastructure co-evolves with RL post-training infrastructure.",
  category: "Case Study",
  date: "2026-06-15",
  readMins: 25,
};

const pagePosts: Post[] = [caseStudy];

/** All published posts, newest first. */
export const posts: Post[] = [...mdPosts, ...pagePosts].sort(
  (a, b) => new Date(b.date || 0).valueOf() - new Date(a.date || 0).valueOf(),
);
