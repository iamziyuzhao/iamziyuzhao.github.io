export interface ProfileLink {
  label: string;
  href: string;
}

export interface Logo {
  src: string;
  /** The image's alt text; empty when a link next to it already names it. */
  alt: string;
  /** Organization website — the logo links here when set. */
  href?: string;
  /** Wordmark-style logo (wider than tall) — gets more horizontal room. */
  wide?: boolean;
}

export interface EducationEntry {
  school: string;
  logos: Logo[];
  degree: string;
  date: string;
  note?: string;
}

export interface ExperienceEntry {
  org: string;
  /** The lab's or team's website; the whole logo block links here. */
  href: string;
  /** One logo, or two (university + lab, company + team) stacked. */
  logos: Logo[];
  role: string;
  date: string;
  /** HTML: may contain links to advisors and collaborators (see `link`). */
  detail: string;
}

export interface ProjectEntry {
  title: string;
  href?: string;
  /** GitHub "owner/name". Shows star and fork counts that link to the repo's
   *  stargazers and forks pages; the browser refreshes them on every visit. */
  repo?: string;
  logos: Logo[];
  /** The muted line under the title, e.g. "Open Source · NeurIPS 2026". */
  venue: string;
  /** Your role, shown in bold like an experience entry's (e.g. "Team Leader"). */
  role: string;
  /** HTML: may contain links (see `link`). */
  summary: string;
  /** Extra links shown under the summary (paper, blog post, ...). */
  links?: ProfileLink[];
}

export interface Paper {
  title: string;
  href: string;
  /** Teaser figure shown beside the entry. */
  image: string;
  /** Author names in order; the site owner's name is shown in bold. */
  authors: string[];
  venue: string;
  links: ProfileLink[];
}

export const profile = {
  name: "Ziyu Zhao",
  nickname: "Albert",
  photo: "/images/albert-zhao.jpg",
  // Fill in to show an "Email" button next to the links below.
  email: "",
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=EEtVlGoAAAAJ&hl=en" },
    { label: "GitHub", href: "https://github.com/iamziyuzhao" },
    { label: "X", href: "https://x.com/albertzzhao" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/albertzzhao/" },
    { label: "Blog", href: "/blog/" },
  ] as ProfileLink[],
};

const cmuSeal: Logo = { src: "/logos/cmu.png", alt: "Carnegie Mellon University" };
const cmu: Logo = { ...cmuSeal, href: "https://www.cmu.edu/" };
const rochester: Logo = { src: "/logos/rochester.png", alt: "University of Rochester", href: "https://www.rochester.edu/" };

/** An external link as HTML, for the experience details and project summaries below. */
const link = (text: string, href: string) => `<a href="${href}" target="_blank" rel="noreferrer">${text}</a>`;

// advisors and collaborators, linked wherever they are named
const tianqiChen = link("Prof. Tianqi Chen", "https://tqchen.com/");
const beidiChen = link("Prof. Beidi Chen", "https://www.andrew.cmu.edu/user/beidic/");
const haizhongZheng = link("Dr. Haizhong Zheng", "https://zhenghaizhong.com/");
const mohamedAbdelfattah = link("Prof. Mohamed S. Abdelfattah", "https://www.mohsaied.com/");
const jakeHyun = link("Jake Hyun", "https://jakehyun.com/");

/** Source for the GetMyHome.ai pre-seed round. */
export const preSeedArticle = "https://www.axios.com/pro/fintech-deals/2024/11/20/getmyhome-real-estate-commissions-technology";

/** Kaggle certificate for the MakeDataCount silver medal. */
const kaggleCertificate = "https://www.kaggle.com/certification/competitions/jojozhaoamz/make-data-count-finding-data-references";

export const papers: Paper[] = [
  {
    title: "StrataFlux: Memory-Hierarchy-Native Low-Bit LLM Inference",
    href: "https://arxiv.org/abs/2611.08363",
    image: "/images/papers/strataflux.png",
    authors: ["Jake Hyun", "Ziyu Zhao", "Jae-sun Seo", "Mohamed S. Abdelfattah"],
    venue: "arXiv preprint, 2026",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2611.08363" },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    school: "Carnegie Mellon University",
    logos: [cmu],
    degree: "M.S. in Information Networking (Thesis-based)",
    date: "2026 – 2028",
    note: "Concentration: Machine Learning & AI Infrastructure · Tuition Scholarship",
  },
  {
    school: "University of Rochester",
    logos: [rochester],
    degree: "B.S. in Computer Science and B.S. in Business/Managerial Economics",
    date: "2022 – 2026",
    note: "Computer Science major GPA: 3.9/4.0",
  },
];

export const experience: ExperienceEntry[] = [
  {
    org: "Carnegie Mellon University, InfiniAI Lab",
    href: "https://www.infini-ai-lab.cmu.edu/",
    logos: [
      cmuSeal,
      { src: "/logos/infini-ai-lab.png", alt: "InfiniAI Lab", wide: true },
    ],
    role: "Research Intern",
    date: "Sep 2026 – Present",
    detail: `Advised by ${beidiChen}, working closely with ${haizhongZheng} on recursive self-improvement and continual learning.`,
  },
  {
    org: "Carnegie Mellon University, Catalyst Group",
    href: "https://catalyst.cs.cmu.edu/",
    logos: [
      cmuSeal,
      { src: "/logos/catalyst.png", alt: "Catalyst Group", wide: true },
    ],
    role: "Research Intern",
    date: "Jun 2026 – Sep 2026",
    detail: `Advised by ${tianqiChen}, working on agents and kernels.`,
  },
  {
    org: "Cornell University, Computer Systems Laboratory",
    href: "https://www.csl.cornell.edu/",
    logos: [
      { src: "/logos/cornell.png", alt: "Cornell University" },
      { src: "/logos/csl.png", alt: "Computer Systems Laboratory", wide: true },
    ],
    role: "Research Intern",
    date: "May 2026 – Sep 2026",
    detail: `Advised by ${mohamedAbdelfattah}, working closely with ${jakeHyun} on an efficient post-quantization approach for LLM inference.`,
  },
  {
    org: "Tencent, Hunyuan LLM Team",
    href: "https://hy.tencent.ai/",
    logos: [
      { src: "/logos/tencent.png", alt: "Tencent", wide: true },
      { src: "/logos/tencent-hunyuan.png", alt: "Tencent Hunyuan", wide: true },
    ],
    role: "Research Engineer Intern, Post-Train Infra",
    date: "Jan 2026 – Apr 2026",
    detail:
      `Joined the Hunyuan LLM Reinforcement Learning Team 1 and contributed the major parts of Evaluation/Distillation/SFT/RFT/Sandbox infrastructure to train and fine-tune the ${link("Hy3 model", "https://hy.tencent.ai/research/hy3")} (295B MoE, A21B, 256K-token ctx) on coding, browser-DOM, shell/filesystem, OS/GUI, and hardware I/O tasks.`,
  },
  {
    org: "GetMyHome.ai (now RealKey)",
    href: "https://www.realkey.ai/",
    logos: [{ src: "/logos/provided/getmyhome.svg", alt: "GetMyHome.ai" }],
    role: "Founding Machine Learning Engineer",
    date: "Oct 2024 – Sep 2025",
    detail:
      `Founding team member (${link("$1.5M pre-seed round", preSeedArticle)}). Worked on multi-agent infrastructure, retrieval and ranking algorithms, and recommender systems.`,
  },
  {
    org: "Haystack",
    href: "https://www.haystackteam.com/",
    logos: [{ src: "/logos/haystack.png", alt: "Haystack", wide: true }],
    role: "Software Engineer Intern",
    date: "May 2024 – Sep 2024",
    detail: `Worked on ${link("organization-wide universal search", "https://www.haystackteam.com/key-features/universal-search")}, a dual-protocol API gateway, Docker, and Kubernetes.`,
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "Hermit",
    href: "https://github.com/Infini-AI-Lab/hermit",
    repo: "Infini-AI-Lab/hermit",
    logos: [{ src: "/logos/hermit.svg", alt: "Hermit" }],
    venue: "Open Source",
    role: "Co-Creator & Core Maintainer",
    summary:
      "Hermit is a framework for training, evaluating, and deploying harness plugins, with support for multiple harness evolution algorithms. It recursively self-improves your agent for new tasks while keeping your existing model and harness unchanged.",
  },
  {
    title: "AstraFlow",
    href: "https://github.com/Infini-AI-Lab/astraflow",
    repo: "Infini-AI-Lab/astraflow",
    logos: [{ src: "/logos/astraflow.svg", alt: "AstraFlow", wide: true }],
    venue: "Open Source · NeurIPS 2026",
    role: "Contributor",
    summary:
      "Enabled MoE post-training for Qwen3-30B-A3B by orchestrating disaggregated training (Megatron) and rollout (SGLang) across two heterogeneous GPU nodes (6× H200 + 6× B200).",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2605.15565" }],
  },
  {
    title: "Harbor",
    href: "https://github.com/harbor-framework/harbor",
    repo: "harbor-framework/harbor",
    logos: [{ src: "/logos/harbor.png", alt: "Harbor" }],
    venue: "Open Source",
    role: "Contributor",
    summary: "Built the anti-cheating feature for agent environments to support agentic RL training with Miles and SGLang.",
    links: [{ label: "Blog post", href: "/blog/eval-infra-case-study/" }],
  },
  {
    title: "Kaggle MakeDataCount",
    href: kaggleCertificate,
    logos: [{ src: "/logos/kaggle.svg", alt: "Kaggle", wide: true }],
    venue: "Research Competition",
    role: "Team Leader",
    summary: `Built a vLLM-accelerated NLP pipeline with AWQ-quantized Qwen2.5-32B for distributed GPU inference, and received a ${link("Silver Medal (team rank 54&nbsp;/&nbsp;1,282)", kaggleCertificate)}.`,
  },
];
