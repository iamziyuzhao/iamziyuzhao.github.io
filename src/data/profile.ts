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
  /** One logo, or two (university + lab, company + team) stacked. */
  logos: Logo[];
  role: string;
  date: string;
  detail: string;
}

export interface ProjectEntry {
  title: string;
  href?: string;
  logos: Logo[];
  venue: string;
  date: string;
  summary: string;
}

export const profile = {
  name: "Ziyu Zhao",
  nickname: "Albert",
  // one-line title under the name (from the LinkedIn headline)
  headline:
    "Incoming Research Scientist Intern (Post-Train) @ ByteDance · Research @ CMU & Cornell · Ex-Scaling & Training Infra @ Tencent Hunyuan LLM · M.S. @ CMU",
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

const cmu: Logo = { src: "/logos/cmu.png", alt: "Carnegie Mellon University", href: "https://www.cmu.edu/" };
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
    logos: [
      cmu,
      { src: "/logos/catalyst.png", alt: "Catalyst Group", href: "https://catalyst.cs.cmu.edu/", wide: true },
    ],
    role: "Research Intern",
    date: "Jun 2026 – Present",
    detail: "Advised by Prof. Tianqi Chen. Working on agents and kernels.",
  },
  {
    org: "Carnegie Mellon University, InfiniAI Lab",
    logos: [
      cmu,
      { src: "/logos/infini-ai-lab.png", alt: "InfiniAI Lab", href: "https://www.infini-ai-lab.cmu.edu/", wide: true },
    ],
    role: "Research Intern",
    date: "Sep 2026 – Present",
    detail: "Advised by Prof. Beidi Chen. Working on recursive self-improvement and continual learning.",
  },
  {
    org: "Cornell University, Computer Systems Laboratory",
    logos: [
      { src: "/logos/cornell.png", alt: "Cornell University", href: "https://www.cornell.edu/" },
      { src: "/logos/csl.png", alt: "Computer Systems Laboratory", href: "https://www.csl.cornell.edu/", wide: true },
    ],
    role: "Research Intern",
    date: "May 2026 – Sep 2026",
    detail: "Advised by Prof. Mohamed S. Abdelfattah and Jake Hyun. Working on an efficient post-quantization approach for LLM inference.",
  },
  {
    org: "Tencent, Hunyuan LLM Team",
    logos: [
      { src: "/logos/tencent.png", alt: "Tencent", href: "https://www.tencent.com/en-us/", wide: true },
      { src: "/logos/tencent-hunyuan.png", alt: "Tencent Hunyuan", href: "https://hunyuan.tencent.com/research?page=1", wide: true },
    ],
    role: "Research Engineer Intern, Post-Train Infra",
    date: "Jan 2026 – Apr 2026",
    detail:
      "Joined the Hunyuan LLM Reinforcement Learning Team 1 and contributed key parts of the evaluation, distillation, SFT, RFT, and sandbox infrastructure used to train and fine-tune the Hy3 model (295B MoE, A21B, 256K-token context).",
  },
  {
    org: "GetMyHome.ai (now RealKey)",
    logos: [{ src: "/logos/provided/getmyhome.svg", alt: "GetMyHome.ai", href: "https://www.realkey.ai/" }],
    role: "Machine Learning Engineer",
    date: "Oct 2024 – Sep 2025",
    detail:
      "Founding team member ($1.5M pre-seed round). Worked on multi-agent infrastructure, retrieval and ranking algorithms, and recommender systems.",
  },
  {
    org: "Haystack",
    logos: [{ src: "/logos/haystack.png", alt: "Haystack", href: "https://www.haystackteam.com/", wide: true }],
    role: "Software Engineer Intern",
    date: "May 2024 – Sep 2024",
    detail: "Worked on organization-wide universal search, a dual-protocol API gateway, Docker, and Kubernetes.",
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "FlashInfer-Bench",
    href: "https://github.com/flashinfer-ai/flashinfer-bench",
    logos: [{ src: "/logos/flashinfer.svg", alt: "" }],
    venue: "Open source",
    date: "2025 – Present",
    summary:
      "Contributed DeepSeek-V4 model support to rigorous evaluation and production deployment of AI-agent-generated GPU kernels.",
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
