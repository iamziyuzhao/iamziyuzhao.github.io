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
  detail: string;
}

export interface ProjectEntry {
  title: string;
  href?: string;
  /** GitHub "owner/name". Shows star and fork counts that link to the repo's
   *  stargazers and forks pages; the browser refreshes them on every visit. */
  repo?: string;
  logos: Logo[];
  venue: string;
  date: string;
  summary: string;
  /** Extra links shown under the summary (paper, blog post, ...). */
  links?: ProfileLink[];
}

export const profile = {
  name: "Ziyu Zhao",
  nickname: "Albert",
  photo: "/images/albert-zhao.jpg",
  // Fill in to show an "Email" button next to the links below.
  email: "",
  links: [
    { label: "CV", href: "/files/2026ZiyuZhaoJune.pdf" },
    { label: "GitHub", href: "https://github.com/iamziyuzhao" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/albertzzhao/" },
    { label: "Blog", href: "/blog/" },
  ] as ProfileLink[],
};

const cmuSeal: Logo = { src: "/logos/cmu.png", alt: "Carnegie Mellon University" };
const cmu: Logo = { ...cmuSeal, href: "https://www.cmu.edu/" };
const rochester: Logo = { src: "/logos/rochester.png", alt: "University of Rochester", href: "https://www.rochester.edu/" };

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
    org: "Carnegie Mellon University, Catalyst Group",
    href: "https://catalyst.cs.cmu.edu/",
    logos: [
      cmuSeal,
      { src: "/logos/catalyst.png", alt: "Catalyst Group", wide: true },
    ],
    role: "Research Intern",
    date: "Jun 2026 – Sep 2026",
    detail: "Advised by Prof. Tianqi Chen. Working on agents and kernels.",
  },
  {
    org: "Carnegie Mellon University, InfiniAI Lab",
    href: "https://www.infini-ai-lab.cmu.edu/",
    logos: [
      cmuSeal,
      { src: "/logos/infini-ai-lab.png", alt: "InfiniAI Lab", wide: true },
    ],
    role: "Research Intern",
    date: "Sep 2026 – Present",
    detail: "Advised by Prof. Beidi Chen. Working on recursive self-improvement and continual learning.",
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
    detail: "Advised by Prof. Mohamed S. Abdelfattah and Jake Hyun. Working on an efficient post-quantization approach for LLM inference.",
  },
  {
    org: "Tencent, Hunyuan LLM Team",
    href: "https://hy.tencent.ai/research/hy3",
    logos: [
      { src: "/logos/tencent.png", alt: "Tencent", wide: true },
      { src: "/logos/tencent-hunyuan.png", alt: "Tencent Hunyuan", wide: true },
    ],
    role: "Research Engineer Intern, Post-Train Infra",
    date: "Jan 2026 – Apr 2026",
    detail:
      "Joined the Hunyuan LLM Reinforcement Learning Team 1 and contributed key parts of the evaluation, distillation, SFT, RFT, and sandbox infrastructure used to train and fine-tune the Hy3 model (295B MoE, A21B, 256K-token context).",
  },
  {
    org: "GetMyHome.ai (now RealKey)",
    href: "https://www.realkey.ai/",
    logos: [{ src: "/logos/provided/getmyhome.svg", alt: "GetMyHome.ai" }],
    role: "Machine Learning Engineer",
    date: "Oct 2024 – Sep 2025",
    detail:
      "Founding team member ($1.5M pre-seed round). Worked on multi-agent infrastructure, retrieval and ranking algorithms, and recommender systems.",
  },
  {
    org: "Haystack",
    href: "https://www.haystackteam.com/",
    logos: [{ src: "/logos/haystack.png", alt: "Haystack", wide: true }],
    role: "Software Engineer Intern",
    date: "May 2024 – Sep 2024",
    detail: "Worked on organization-wide universal search, a dual-protocol API gateway, Docker, and Kubernetes.",
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "Hermit",
    href: "https://github.com/Infini-AI-Lab/hermit",
    repo: "Infini-AI-Lab/hermit",
    logos: [{ src: "/logos/hermit.svg", alt: "" }],
    venue: "Open source",
    date: "Sep 2026 – Present",
    summary: "Author of Hermit, currently in development.",
  },
  {
    title: "AstraFlow",
    href: "https://github.com/Infini-AI-Lab/astraflow",
    repo: "Infini-AI-Lab/astraflow",
    logos: [{ src: "/logos/infini-ai-lab.png", alt: "", wide: true }],
    venue: "NeurIPS 2026",
    date: "Aug 2026 – Present",
    summary:
      "Enabled MoE post-training for Qwen3-30B-A3B by orchestrating disaggregated training (Megatron) and rollout (SGLang) across two heterogeneous GPU nodes (6× H200 + 6× B200).",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2605.15565" }],
  },
  {
    title: "Harbor",
    href: "https://github.com/harbor-framework/harbor",
    repo: "harbor-framework/harbor",
    logos: [{ src: "/logos/harbor.png", alt: "" }],
    venue: "Open source",
    date: "Jun 2026 – Present",
    summary: "Built the anti-cheating feature for agent environments to support agentic RL training with Miles and SGLang.",
    links: [{ label: "Blog post", href: "/blog/eval-infra-case-study/" }],
  },
  {
    title: "Kaggle MakeDataCount",
    href: "https://www.kaggle.com/certification/competitions/jojozhaoamz/make-data-count-finding-data-references",
    logos: [{ src: "/logos/kaggle.svg", alt: "", wide: true }],
    venue: "Silver Medal, rank 54 / 1,282",
    date: "2025",
    summary: "Built a vLLM-accelerated NLP pipeline with AWQ-quantized Qwen2.5-32B for distributed GPU inference.",
  },
];
