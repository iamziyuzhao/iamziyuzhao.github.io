export const profile = {
  name: "Albert (Ziyu) Zhao",
  title: "Machine Learning Systems & AI Infrastructure",
  titleZh: "机器学习系统与 AI 基础设施",
  location: "Pittsburgh, PA",
  email: "contact@example.com",
  links: [
    { label: "CV", href: "/cv/" },
    { label: "GitHub", href: "#" },
    { label: "Google Scholar", href: "#" },
  ],
  intro:
    "I work on systems for large language models, with interests in LLM inference, GPU kernels, agent benchmarking, and AI infrastructure.",
  introZh:
    "我关注大语言模型背后的系统问题，研究兴趣包括 LLM 推理、GPU kernels、agent benchmark 和 AI 基础设施。",
  focus:
    "I am interested in the infrastructure behind frontier AI systems: inference serving, efficient kernels, agent execution, and the systems work required to make large models useful in real deployments.",
  focusZh:
    "我感兴趣的是前沿 AI 系统背后的基础设施：推理服务、高效 kernels、agent 执行，以及让大模型在真实部署中可用的系统工作。",
};

export const education = [
  {
    school: "Carnegie Mellon University",
    logo: "/logos/provided/cmu.png",
    logoHref: "https://www.cmu.edu/",
    degree: "M.S. in Information Networking",
    degreeZh: "信息网络硕士",
    meta: "Machine Learning Systems & AI Infrastructure, advised by Prof. Tianqi Chen",
    metaZh: "方向：机器学习系统与 AI 基础设施，导师 Prof. Tianqi Chen",
    date: "2026 - 2028",
  },
  {
    school: "University of Rochester",
    logo: "/logos/provided/rochester.png",
    logoWide: true,
    logoHref: "https://www.rochester.edu/",
    degree: "B.S. in Computer Science and B.S. in Business",
    degreeZh: "计算机科学学士、商科学士",
    meta: "Computer Science major GPA: 3.9/4.0",
    metaZh: "计算机科学专业 GPA：3.9/4.0",
    date: "2022 - 2026",
  },
];

export const experience = [
  {
    org: "Carnegie Mellon University, Catalyst Group",
    logo: "/logos/provided/catalyst.svg",
    logoPair: [
      { src: "/logos/provided/trimmed/cmu-trim.png", href: "https://www.cmu.edu/" },
      { src: "/logos/provided/trimmed/catalyst-transparent-v2.png", wide: true, href: "https://catalyst.cs.cmu.edu/" },
    ],
    role: "Research Assistant Intern",
    roleZh: "研究助理实习生",
    date: "Apr 2026 - present",
    detail: "LLM inference, GPU kernels, and agent benchmarking.",
    detailZh: "研究 LLM 推理、GPU kernels 和 agent benchmarking。",
  },
  {
    org: "Cornell University, Computer Systems Laboratory",
    logo: "/logos/provided/cornell.png",
    logoPair: [
      { src: "/logos/provided/trimmed/cornell-trim.png", href: "https://www.cornell.edu/" },
      { src: "/logos/provided/trimmed/csl-trim.png", wide: true, href: "https://www.csl.cornell.edu/" },
    ],
    role: "Research Assistant Intern",
    roleZh: "研究助理实习生",
    date: "Apr 2026 - present",
    detail: "Efficient quantization for LLM inference.",
    detailZh: "研究面向 LLM 推理的高效量化方法。",
  },
  {
    org: "Tencent, Hunyuan LLM Team",
    logo: "/logos/provided/tencent.png",
    logoWide: true,
    logoPair: [
      { src: "/logos/provided/trimmed/tencent-trim.png", wide: true, href: "https://www.tencent.com/en-us/" },
      { src: "/logos/provided/trimmed/tencent-hunyuan-trim.png", wide: true, href: "https://hunyuan.tencent.com/research?page=1" },
    ],
    role: "AI Infrastructure Engineer Intern",
    roleZh: "AI 基础设施工程实习生",
    date: "Jan 2026 - Apr 2026",
    detail:
      "Agent execution runtime, Nix-based runtime injection, checkpoint/restore acceleration, and reliable async RPC for large-scale evaluation infrastructure.",
    detailZh:
      "参与 agent execution runtime、基于 Nix 的运行时注入、checkpoint/restore 启动加速，以及大规模评测基础设施中的可靠异步 RPC。",
  },
  {
    org: "GetMyHome",
    logo: "/logos/provided/getmyhome.svg",
    logoHref: "https://www.realkey.ai/",
    role: "Machine Learning Engineer Intern",
    roleZh: "机器学习工程实习生",
    date: "Oct 2024 - Aug 2025",
    detail:
      "Founding member of HomeGPT, building multi-agent real estate infrastructure, price-estimation models, and scalable RAG systems.",
    detailZh:
      "作为 HomeGPT 早期成员，参与构建面向房地产场景的多 agent 平台、房价估计模型和可扩展 RAG 系统。",
  },
  {
    org: "Haystack",
    logo: "/logos/provided/haystack.png",
    logoWide: true,
    logoHref: "https://www.haystackteam.com/",
    role: "Software Development Engineer Intern",
    roleZh: "软件开发工程实习生",
    date: "May 2024 - Sep 2024",
    detail:
      "Universal enterprise search across workplace data, dual-protocol API gateway, and Kubernetes deployment infrastructure.",
    detailZh:
      "参与企业级 universal search、双协议 API gateway，以及 Kubernetes 部署基础设施。",
  },
];

export const projects = [
  {
    title: "FlashInfer-Bench",
    logo: "/logos/flashinfer.svg",
    venue: "Open source",
    venueZh: "开源项目",
    date: "2025 - present",
    summary:
      "Contributed DeepSeek-V4 model support to rigorous evaluation and production deployment of AI-agent-generated GPU kernels.",
    summaryZh:
      "为 FlashInfer-Bench 贡献 DeepSeek-V4 模型支持，参与 AI-agent 生成 GPU kernels 的严谨评测与生产部署链路。",
    links: [{ label: "Project", href: "#" }],
  },
  {
    title: "Hunyuan Agent Runtime Infrastructure",
    logo: "/logos/provided/tencent-hunyuan.png",
    logoWide: true,
    logoPair: [
      { src: "/logos/provided/tencent.png", wide: true, href: "https://www.tencent.com/en-us/" },
      { src: "/logos/provided/tencent-hunyuan.png", wide: true, href: "https://hunyuan.tencent.com/research?page=1" },
    ],
    venue: "Tencent Hunyuan LLM Team",
    venueZh: "腾讯混元大模型团队",
    date: "2026",
    summary:
      "Built runtime and execution infrastructure for evaluation and distillation workflows around a large MoE model, reducing environment complexity and improving startup latency.",
    summaryZh:
      "构建面向大规模 MoE 模型评测/蒸馏工作流的 runtime 与执行基础设施，降低环境复杂度并改善启动延迟。",
    links: [],
  },
  {
    title: "HomeGPT",
    logo: "/logos/provided/getmyhome.svg",
    logoHref: "https://www.realkey.ai/",
    venue: "GetMyHome",
    venueZh: "GetMyHome",
    date: "2024 - 2025",
    summary:
      "Co-developed an LLM multi-agent platform for real estate workflows, including price-estimation agents and retrieval infrastructure.",
    summaryZh:
      "参与开发面向房地产流程的 LLM 多 agent 平台，包括价格估计 agent 与检索基础设施。",
    links: [],
  },
  {
    title: "Kaggle MakeDataCount",
    logo: "/logos/kaggle.svg",
    venue: "Silver Medal, rank 54 / 1,282",
    venueZh: "银牌，排名 54 / 1,282",
    date: "2025",
    summary:
      "Built a vLLM-accelerated NLP pipeline with AWQ-quantized Qwen2.5-32B for distributed GPU inference.",
    summaryZh:
      "构建基于 vLLM 加速、AWQ 量化 Qwen2.5-32B 的分布式 GPU 推理 NLP pipeline。",
    links: [],
  },
];

export const news = [
  "2026: Starting M.S. study at Carnegie Mellon University in Information Networking.",
  "2026: Joined CMU Catalyst Group and Cornell CSL as a research assistant intern.",
  "2025: Contributed DeepSeek-V4 model support to FlashInfer-Bench.",
  "2025: Received a Kaggle Research Competition Silver Medal for MakeDataCount.",
];

export const newsZh = [
  "2026：即将在 Carnegie Mellon University 攻读 Information Networking 硕士。",
  "2026：加入 CMU Catalyst Group 和 Cornell CSL 担任研究助理实习生。",
  "2025：为 FlashInfer-Bench 贡献 DeepSeek-V4 模型支持。",
  "2025：在 Kaggle MakeDataCount 研究竞赛中获得银牌。",
];
