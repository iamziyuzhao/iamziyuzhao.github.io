export interface GiscusConfig {
  /** "owner/repo" of the public GitHub repo that hosts the discussions */
  repo: `${string}/${string}`;
  repoId: string;
  category: string;
  categoryId: string;
}

export const site = {
  // Set after deploying, e.g. "https://yourusername.github.io"
  url: "",
  // Comments stay hidden until this is filled in.
  // Get these values from https://giscus.app after the one-time setup
  // described in docs/publishing.md, then replace `null` with e.g.:
  //   { repo: "user/user.github.io", repoId: "R_...", category: "Blog comments", categoryId: "DIC_..." }
  giscus: null as GiscusConfig | null,
};
