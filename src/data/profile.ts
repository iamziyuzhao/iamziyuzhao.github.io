export interface ProfileLink {
  label: string;
  href: string;
}

export interface Logo {
  src: string;
  /** Organization website — the logo links here when set. */
  href?: string;
  /** Wordmark-style logo (wider than tall) — gets more horizontal room. */
  wide?: boolean;
}

export interface EducationEntry {
  school: string;
  logo: Logo;
  degree: string;
  date: string;
  note?: string;
}

export interface ExperienceEntry {
  org: string;
  logo: Logo;
  role: string;
  date: string;
  detail: string;
}

export interface ProjectEntry {
  title: string;
  href?: string;
  logo: Logo;
  venue: string;
  date: string;
  summary: string;
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
    { label: "Blog", href: "/blog/" },
  ] as ProfileLink[],
};

export const education: EducationEntry[] = [
  {
    school: "Carnegie Mellon University",
    logo: { src: "/logos/cmu.png", href: "https://www.cmu.edu/" },
    degree: "M.S. in Information Networking",
    date: "2026 – 2028",
  },
  {
    school: "University of Rochester",
    logo: { src: "/logos/rochester.png", href: "https://www.rochester.edu/" },
    degree: "B.S. in Computer Science and B.S. in Business",
    date: "2022 – 2026",
    note: "Computer Science major GPA: 3.9/4.0",
  },
];

export const experience: ExperienceEntry[] = [
  {
    org: "Carnegie Mellon University, Catalyst Group",
    logo: { src: "/logos/provided/trimmed/catalyst-transparent-v2.png", href: "https://catalyst.cs.cmu.edu/", wide: true },
    role: "Research Assistant Intern",
    date: "Apr 2026 – Present",
    detail: "LLM inference, GPU kernels, and agent benchmarking.",
  },
  {
    org: "Cornell University, Computer Systems Laboratory",
    logo: { src: "/logos/provided/trimmed/csl-trim.png", href: "https://www.csl.cornell.edu/", wide: true },
    role: "Research Assistant Intern",
    date: "Apr 2026 – Present",
    detail: "Efficient quantization for LLM inference.",
  },
  {
    org: "Tencent, Hunyuan LLM Team",
    logo: { src: "/logos/tencent-hunyuan.png", href: "https://hunyuan.tencent.com/research?page=1", wide: true },
    role: "Research Engineer Intern",
    date: "Jan 2026 – Apr 2026",
    detail: "Agent Harness, Runtime, Eval infra and Sandbox infra.",
  },
  {
    org: "RealKey",
    logo: { src: "/logos/provided/getmyhome.svg", href: "https://www.realkey.ai/" },
    role: "Machine Learning Engineer Intern",
    date: "Oct 2024 – Aug 2025",
    detail:
      "Founding member of HomeGPT, building multi-agent real estate infrastructure, price-estimation models, and scalable RAG systems.",
  },
  {
    org: "Haystack",
    logo: { src: "/logos/provided/haystack.png", href: "https://www.haystackteam.com/", wide: true },
    role: "Software Development Engineer Intern",
    date: "May 2024 – Sep 2024",
    detail:
      "Universal enterprise search across workplace data, dual-protocol API gateway, and Kubernetes deployment infrastructure.",
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "FlashInfer-Bench",
    href: "https://github.com/flashinfer-ai/flashinfer-bench",
    logo: { src: "/logos/flashinfer.svg" },
    venue: "Open source",
    date: "2025 – Present",
    summary:
      "Contributed DeepSeek-V4 model support to rigorous evaluation and production deployment of AI-agent-generated GPU kernels.",
  },
  {
    title: "Kaggle MakeDataCount",
    href: "https://www.kaggle.com/certification/competitions/jojozhaoamz/make-data-count-finding-data-references",
    logo: { src: "/logos/kaggle.svg", wide: true },
    venue: "Silver Medal, rank 54 / 1,282",
    date: "2025",
    summary: "Built a vLLM-accelerated NLP pipeline with AWQ-quantized Qwen2.5-32B for distributed GPU inference.",
  },
];
