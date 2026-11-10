// GitHub star and fork counts for project repos.
//
// The build fetches the counts once so the page ships with real numbers;
// a small script on the page (RepoStats.astro) then refreshes them from the
// GitHub API in the visitor's browser, so they stay current between deploys.

export interface RepoStats {
  stars: number;
  forks: number;
}

/** 6923 -> "6.9k", 114 -> "114". The page script uses the same rule. */
export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

/** Fetches counts for each "owner/name"; a repo that fails is left out, and
 *  the page script fills it in later. GITHUB_TOKEN, when set (CI sets it),
 *  avoids the 60-requests-per-hour limit for unauthenticated calls. */
export async function fetchRepoStats(repos: string[]): Promise<Record<string, RepoStats>> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const entries = await Promise.all(
    repos.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
        if (!res.ok) return null;
        const data = await res.json();
        return [repo, { stars: data.stargazers_count, forks: data.forks_count }] as const;
      } catch {
        return null;
      }
    }),
  );
  return Object.fromEntries(entries.filter((e) => e !== null));
}
