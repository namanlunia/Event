import {
  Project,
  UserProfile,
  PullRequest,
  Ambassador,
  College,
  Badge,
  BlogPost,
  FAQItem,
  Sponsor,
  TimelineStep,
  Certificate,
  MentorApplication,
  ProjectAdminApplication,
  ContributorProjectApplication,
  PointsLedgerItem,
  PointsRulesConfig,
  LeaderboardSettings,
  OfficeHoursSession,
  MentorFeedbackRecord,
  ProjectAnnouncement,
  InAppNotification,
  AuditLogItem,
  SiteSettings,
} from "@/types";
import {
  PHASES,
  formatDateRange,
  DURATION_COPY,
  SEASON_SHORT,
} from "@/lib/season";
import { SITE_CONFIG } from "@/lib/site-config";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "WinterVision Core",
    slug: "wintervision-core",
    tagline: "High-throughput real-time computer vision inference engine for edge devices",
    description:
      "WinterVision Core is an open-source inference optimizer built in Rust and C++ that compiles PyTorch and ONNX models directly into zero-copy, highly pipelined neural execution graphs for autonomous robotics and embedded vision.",
    repository_url: "",
    tech_stack: ["Rust", "C++", "PyTorch", "ONNX", "CUDA"],
    difficulty: "Advanced",
    domain: "AI/ML",
    organization: "Omnikon Core Research",
    status: "approved",
    maintainer_id: "user-m1",
    maintainer_name: "Dr. Aris Thorne",
    maintainer_avatar: "",
    mentor_ids: ["user-m1", "user-m2"],
    mentors: [
      { name: "Dr. Aris Thorne", avatar: "", role: "AI Compiler Architect", github: "aristhorne" },
      { name: "Elena Rostova", avatar: "", role: "CUDA Optimization Lead", github: "erostova" }
    ],
    open_issues_count: 14,
    stars_count: 1420,
    forks_count: 310,
    created_at: "2026-10-01",
    contribution_guide: "Follow Rust fmt guidelines, ensure `cargo clippy --all-targets` passes, and write benchmark tests for any zero-copy buffer modifications.",
  },
  {
    id: "proj-2",
    name: "OpenPay Web3 SDK",
    slug: "openpay-web3-sdk",
    tagline: "Micro-payment protocol and SDK for decentralized compute credits",
    description:
      "A developer-first TypeScript and Rust SDK providing sub-second settlement for AI agent micropayments, streaming subscriptions, and state channel liquidity across Web3 protocols.",
    repository_url: "",
    tech_stack: ["Rust", "Anchor", "TypeScript", "Web3.js"],
    difficulty: "Intermediate",
    domain: "Web3",
    organization: "OpenPay Protocol",
    status: "approved",
    maintainer_id: "user-m3",
    maintainer_name: "Kaelen Voss",
    maintainer_avatar: "",
    mentor_ids: ["user-m3"],
    mentors: [
      { name: "Kaelen Voss", avatar: "", role: "Protocol Engineer", github: "kaelenvoss" }
    ],
    open_issues_count: 8,
    stars_count: 890,
    forks_count: 145,
    created_at: "2026-10-05",
  },
  {
    id: "proj-3",
    name: "Nexus DevOps Mesh",
    slug: "nexus-devops-mesh",
    tagline: "Lightweight eBPF-powered service mesh and observability sidecar for Kubernetes",
    description:
      "Nexus injects zero-overhead kernel probes to trace L7 HTTP/gRPC telemetry, enforce cryptographically verified mutual TLS, and trigger automated canary rollbacks across multi-cluster Kubernetes fleets.",
    repository_url: "",
    tech_stack: ["Go", "eBPF", "Kubernetes", "gRPC", "Prometheus"],
    difficulty: "Advanced",
    domain: "Cloud & DevOps",
    organization: "CloudNative Labs",
    status: "approved",
    maintainer_id: "user-m4",
    maintainer_name: "Marcus Vance",
    maintainer_avatar: "",
    mentor_ids: ["user-m4"],
    mentors: [
      { name: "Marcus Vance", avatar: "", role: "Lead SRE", github: "marcusvance" }
    ],
    open_issues_count: 19,
    stars_count: 1750,
    forks_count: 420,
    created_at: "2026-10-10",
  },
  {
    id: "proj-4",
    name: "OmniUI Glass React",
    slug: "omniui-glass-react",
    tagline: "Futuristic dark-mode component library with physics-based spring animations",
    description:
      "A complete React 19 and Tailwind CSS design system featuring accessible glassmorphic primitives, dynamic canvas shaders, and micro-interactions optimized for next-generation developer tooling.",
    repository_url: "",
    tech_stack: ["TypeScript", "React", "Tailwind CSS", "Framer Motion", "Radix UI"],
    difficulty: "Beginner",
    domain: "Full-Stack",
    organization: "DesignSystems Collective",
    status: "approved",
    maintainer_id: "user-m5",
    maintainer_name: "Sarah Chen",
    maintainer_avatar: "",
    mentor_ids: ["user-m5"],
    mentors: [
      { name: "Sarah Chen", avatar: "", role: "Frontend Architect", github: "sarahchendev" }
    ],
    open_issues_count: 22,
    stars_count: 2340,
    forks_count: 520,
    created_at: "2026-09-20",
  },
  {
    id: "proj-5",
    name: "Sentinel Shield Threat Detector",
    slug: "sentinel-shield",
    tagline: "Autonomous static analysis agent for discovering smart contract vulnerabilities",
    description:
      "Sentinel parses Solidity ASTs and LLVM bytecodes, executing symbolic taint analysis to discover reentrancy vulnerabilities, logic bugs, and unchecked arithmetic before deployment.",
    repository_url: "",
    tech_stack: ["Python", "Solidity", "Rust", "LLVM", "Z3 Solver"],
    difficulty: "Advanced",
    domain: "Security",
    organization: "Web3 Security Council",
    status: "approved",
    maintainer_id: "user-m6",
    maintainer_name: "Tariq Mansoor",
    maintainer_avatar: "",
    mentor_ids: ["user-m6"],
    mentors: [
      { name: "Tariq Mansoor", avatar: "", role: "Security Researcher", github: "tariqsec" }
    ],
    open_issues_count: 11,
    stars_count: 980,
    forks_count: 175,
    created_at: "2026-10-12",
  },
  {
    id: "proj-6",
    name: "PulseFit Native",
    slug: "pulsefit-native",
    tagline: "Cross-platform biometric tracking with offline-first synchronization and Apple HealthKit integration",
    description:
      "PulseFit is an open-source React Native + Kotlin multiplatform fitness telemetry app engineered for athletic performance telemetry, peer challenges, and local-first SQLite sync.",
    repository_url: "",
    tech_stack: ["React Native", "TypeScript", "Kotlin", "Swift", "SQLite"],
    difficulty: "Beginner",
    domain: "Mobile",
    organization: "OpenHealth Org",
    status: "approved",
    maintainer_id: "user-m7",
    maintainer_name: "Priya Nair",
    maintainer_avatar: "",
    mentor_ids: ["user-m7"],
    mentors: [
      { name: "Priya Nair", avatar: "", role: "Mobile Eng Lead", github: "priyanair" }
    ],
    open_issues_count: 16,
    stars_count: 670,
    forks_count: 140,
    created_at: "2026-10-15",
  },
  {
    id: "proj-7",
    name: "CryoLang Compiler",
    slug: "cryolang-compiler",
    tagline: "A statically-typed, memory-safe systems language targeting WebAssembly & RISC-V",
    description:
      "CryoLang introduces compile-time capability checking and region-based memory management without garbage collection pauses, ideal for operating system kernels and game engines.",
    repository_url: "",
    tech_stack: ["Rust", "LLVM", "WebAssembly", "RISC-V"],
    difficulty: "Advanced",
    domain: "Full-Stack",
    organization: "Compiler Collective",
    status: "approved",
    maintainer_id: "user-m1",
    maintainer_name: "Dr. Aris Thorne",
    maintainer_avatar: "",
    mentor_ids: ["user-m1"],
    mentors: [
      { name: "Dr. Aris Thorne", avatar: "", role: "Compiler Architect", github: "aristhorne" }
    ],
    open_issues_count: 24,
    stars_count: 1850,
    forks_count: 380,
    created_at: "2026-09-15",
  },
  {
    id: "proj-8",
    name: "AetherDB TimeSeries",
    slug: "aetherdb-timeseries",
    tagline: "Distributed columnar time-series storage engine for IoT telemetry and sensor networks",
    description:
      "AetherDB compresses telemetry streams using Gorilla and Roaring Bitmaps, executing SQL-compatible analytical window aggregations at millions of data points per second.",
    repository_url: "",
    tech_stack: ["Go", "C++", "Apache Arrow", "gRPC", "Prometheus"],
    difficulty: "Intermediate",
    domain: "Cloud & DevOps",
    organization: "DataScale Foundation",
    status: "approved",
    maintainer_id: "user-m4",
    maintainer_name: "Marcus Vance",
    maintainer_avatar: "",
    mentor_ids: ["user-m4"],
    mentors: [
      { name: "Marcus Vance", avatar: "", role: "SRE Lead", github: "marcusvance" }
    ],
    open_issues_count: 15,
    stars_count: 1340,
    forks_count: 270,
    created_at: "2026-10-18",
  }
];

export const MOCK_CONTRIBUTORS: UserProfile[] = [
  {
    id: "c-1",
    email: "aarav.patel@iitd.ac.in",
    role: "contributor",
    full_name: "Aarav Patel",
    username: "aaravcode",
    avatar_url: "",
    github_username: "aaravpatel",
    bio: "Systems & Rust enthusiast. Competitive programmer, building high-speed neural kernels for OWOC.",
    college_id: "col-1",
    college_name: "IIT Delhi",
    year_of_study: "3rd Year",
    skills: ["Rust", "C++", "PyTorch", "Linux", "WebAssembly"],
    linkedin_url: "",
    twitter_url: "",
    created_at: "2026-10-02",
    points: 120,
    rank: 1,
    streak_days: 14,
  },
  {
    id: "c-2",
    email: "ananya.sharma@bits-pilani.ac.in",
    role: "contributor",
    full_name: "Ananya Sharma",
    username: "ananyasharma",
    avatar_url: "",
    github_username: "ananyadev",
    bio: "Full-stack creator & open source advocate. Crafting fluid UI architectures and web animations.",
    college_id: "col-2",
    college_name: "BITS Pilani",
    year_of_study: "4th Year",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS"],
    linkedin_url: "",
    twitter_url: "",
    created_at: "2026-10-03",
    points: 105,
    rank: 2,
    streak_days: 12,
  },
  {
    id: "c-3",
    email: "rohan.deshmukh@nitk.edu.in",
    role: "contributor",
    full_name: "Rohan Deshmukh",
    username: "rohandesh",
    avatar_url: "",
    github_username: "rohandeshmukh",
    bio: "Distributed systems nerd. Writing Go routines and Kubernetes operators for cloud resilience.",
    college_id: "col-3",
    college_name: "NIT Karnataka",
    year_of_study: "2nd Year",
    skills: ["Go", "Kubernetes", "Docker", "gRPC", "PostgreSQL"],
    created_at: "2026-10-04",
    points: 90,
    rank: 3,
    streak_days: 9,
  },
  {
    id: "c-4",
    email: "diya.menon@dtu.ac.in",
    role: "contributor",
    full_name: "Diya Menon",
    username: "diyam",
    avatar_url: "",
    github_username: "diyam",
    bio: "Smart contract security researcher. Dissecting EVM opcodes and finding reentrancy edge cases.",
    college_id: "col-4",
    college_name: "Delhi Technological University",
    year_of_study: "3rd Year",
    skills: ["Solidity", "Rust", "EVM", "Foundry", "Python"],
    created_at: "2026-10-06",
    points: 75,
    rank: 4,
    streak_days: 8,
  },
  {
    id: "c-5",
    email: "vikram.aditya@iiit.ac.in",
    role: "contributor",
    full_name: "Vikram Aditya",
    username: "vikramaditya",
    avatar_url: "",
    github_username: "vaditya",
    bio: "Flutter & React Native hacker. Passionate about offline-first synchronization and 120fps gesture physics.",
    college_id: "col-5",
    college_name: "IIIT Hyderabad",
    year_of_study: "4th Year",
    skills: ["React Native", "TypeScript", "Kotlin", "Swift", "GraphQL"],
    created_at: "2026-10-07",
    points: 60,
    rank: 5,
    streak_days: 11,
  },
  {
    id: "c-6",
    email: "meera.iyer@pes.edu",
    role: "contributor",
    full_name: "Meera Iyer",
    username: "meeraiyer",
    avatar_url: "",
    github_username: "meeraiyer",
    bio: "AI researcher focusing on sparse mixture-of-experts and quantized attention mechanisms.",
    college_id: "col-6",
    college_name: "PES University Bangalore",
    year_of_study: "3rd Year",
    skills: ["Python", "PyTorch", "Hugging Face", "CUDA", "FastAPI"],
    created_at: "2026-10-08",
    points: 45,
    rank: 6,
    streak_days: 6,
  }
];

export const MOCK_AMBASSADORS: Ambassador[] = [
  {
    id: "amb-1",
    user_id: "user-a1",
    full_name: "Kabir Sen",
    avatar_url: "",
    college_name: "IIT Bombay",
    referral_code: "KABIR-IITB-26",
    referrals_count: 88,
    target_goal: 100,
    reward_tier: "Master Ambassador",
    rank: 1,
  },
  {
    id: "amb-2",
    user_id: "user-a2",
    full_name: "Tanya Kapoor",
    avatar_url: "",
    college_name: "BITS Pilani",
    referral_code: "TANYA-BITS-26",
    referrals_count: 74,
    target_goal: 75,
    reward_tier: "Gold",
    rank: 2,
  },
  {
    id: "amb-3",
    user_id: "user-a3",
    full_name: "Siddharth Verma",
    avatar_url: "",
    college_name: "IIT Delhi",
    referral_code: "SID-IITD-26",
    referrals_count: 62,
    target_goal: 75,
    reward_tier: "Gold",
    rank: 3,
  },
  {
    id: "amb-4",
    user_id: "user-a4",
    full_name: "Rhea Chawla",
    avatar_url: "",
    college_name: "IIIT Hyderabad",
    referral_code: "RHEA-IIITH-26",
    referrals_count: 48,
    target_goal: 50,
    reward_tier: "Silver",
    rank: 4,
  }
];

export const MOCK_COLLEGES: College[] = [
  {
    id: "col-1",
    name: "Indian Institute of Technology Delhi",
    city: "New Delhi",
    state: "Delhi",
    contributor_count: 42,
    points_total: 6840,
  },
  {
    id: "col-2",
    name: "Birla Institute of Technology and Science, Pilani",
    city: "Pilani",
    state: "Rajasthan",
    contributor_count: 38,
    points_total: 5920,
  },
  {
    id: "col-3",
    name: "National Institute of Technology Karnataka",
    city: "Surathkal",
    state: "Karnataka",
    contributor_count: 31,
    points_total: 5210,
  },
  {
    id: "col-4",
    name: "Indian Institute of Technology Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    contributor_count: 35,
    points_total: 4980,
  },
  {
    id: "col-5",
    name: "International Institute of Information Technology Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    contributor_count: 27,
    points_total: 4420,
  }
];

export const MOCK_PRS: PullRequest[] = [
  {
    id: "pr-101",
    project_id: "proj-1",
    project_name: "WinterVision Core",
    contributor_id: "c-1",
    contributor_name: "Aarav Patel",
    contributor_avatar: "",
    pr_number: 42,
    pr_url: "",
    title: "feat(pipeline): Zero-copy ring buffer for AVX-512 tensor conversion",
    difficulty: "Hard",
    points_awarded: 50,
    quality_bonus: 15,
    status: "merged",
    mentor_feedback: "Exceptional assembly tuning. 24% throughput boost verified on benchmark suite.",
    merged_at: "2026-12-06T14:22:00Z",
    created_at: "2026-12-05T10:15:00Z",
  },
  {
    id: "pr-102",
    project_id: "proj-4",
    project_name: "OmniUI Glass React",
    contributor_id: "c-2",
    contributor_name: "Ananya Sharma",
    contributor_avatar: "",
    pr_number: 78,
    pr_url: "",
    title: "fix(a11y): Radix Dialog focus trap & aria-describedby announcement",
    difficulty: "Medium",
    points_awarded: 25,
    quality_bonus: 5,
    status: "merged",
    mentor_feedback: "Clean accessibility overhaul, passed full axe-core WCAG AA audits.",
    merged_at: "2026-12-08T09:40:00Z",
    created_at: "2026-12-07T16:30:00Z",
  },
  {
    id: "pr-103",
    project_id: "proj-3",
    project_name: "Nexus DevOps Mesh",
    contributor_id: "c-3",
    contributor_name: "Rohan Deshmukh",
    contributor_avatar: "",
    pr_number: 29,
    pr_url: "",
    title: "chore(k8s): Reconcile loop exponential backoff for ephemeral ingress",
    difficulty: "Medium",
    points_awarded: 25,
    quality_bonus: 0,
    status: "approved",
    mentor_feedback: "Looking good, ready for staging integration test run.",
    created_at: "2026-12-10T18:00:00Z",
  },
  {
    id: "pr-104",
    project_id: "proj-2",
    project_name: "OpenPay Web3 SDK",
    contributor_id: "c-4",
    contributor_name: "Diya Menon",
    contributor_avatar: "",
    pr_number: 15,
    pr_url: "",
    title: "feat(anchor): Account rent-exemption validation helper",
    difficulty: "Easy",
    points_awarded: 10,
    quality_bonus: 0,
    status: "merged",
    mentor_feedback: "Simple, concise and covers missing edge cases.",
    merged_at: "2026-12-11T11:20:00Z",
    created_at: "2026-12-11T08:10:00Z",
  }
];

export const MOCK_BADGES: Badge[] = [
  {
    id: "b-1",
    code: "first_pr",
    title: "First Light",
    description: "Merged your maiden Pull Request in OWOC",
    icon: "Sparkles",
    tier: "Bronze",
    unlocked: true,
    unlocked_at: "2026-11-24",
  },
  {
    id: "b-2",
    code: "streak_7",
    title: "Cryo Sprint",
    description: "Maintained a 7-day continuous PR or commit streak",
    icon: "Flame",
    tier: "Silver",
    unlocked: true,
    unlocked_at: "2026-11-30",
  },
  {
    id: "b-3",
    code: "code_warrior_10",
    title: "Code Centurion",
    description: "Successfully merged 10+ pull requests across projects",
    icon: "ShieldAlert",
    tier: "Gold",
    unlocked: false,
  },
  {
    id: "b-4",
    code: "top_contributor",
    title: "Frost Champion",
    description: "Ranked among the Top 5 overall program contributors",
    icon: "Trophy",
    tier: "Obsidian",
    unlocked: true,
    unlocked_at: "2026-12-20",
  },
  {
    id: "b-5",
    code: "bug_hunter",
    title: "Zero-Day Hunter",
    description: "Identified and patched a critical security vulnerability",
    icon: "Bug",
    tier: "Obsidian",
    unlocked: false,
  },
  {
    id: "b-6",
    code: "mentor_favorite",
    title: "Exemplary Craftsman",
    description: "Awarded 3+ consecutive maximum quality multipliers by mentors",
    icon: "Award",
    tier: "Gold",
    unlocked: false,
  }
];

export const MOCK_TIMELINE: TimelineStep[] = PHASES.map((p) => ({
  date: formatDateRange(p),
  title: p.name,
  description: p.description,
  status: p.id === 1 ? "upcoming" : "upcoming",
  badge: `Phase ${p.id}`,
}));

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Welcome to OWOC: A Season of Open-Source Collaboration",
    slug: "owoc-official-commencement",
    summary: "A warm winter welcome to all open-source builders. Here is everything you need to know about points, PR labels, and mentors.",
    content: `The winter coding season has arrived. Over the upcoming weeks of active coding, developers from universities around the globe will come together to ship impactful code to open source repositories. From AI kernels to web tooling, OWOC is engineered to give student engineers real development experience.`,
    category: "Announcement",
    author: {
      name: "OWOC Organizing Team",
      avatar: "",
      role: "Organizers"
    },
    cover_image: "",
    reading_time: "4 min read",
    published_at: "Oct 20, 2026"
  },
  {
    id: "blog-2",
    title: "How to Secure Your First 100 Points in OWOC: A Contributor's Blueprint",
    slug: "contributor-blueprint-100-points",
    summary: "Learn how to filter issues effectively, submit clean atomic pull requests, and earn high mentor quality multipliers.",
    content: "Craftsmanship matters. In this guide, our maintainers share their recommendations for pull request descriptions, unit test coverage, and clean git commit hygiene.",
    category: "Guide",
    author: {
      name: "Engineering Working Group",
      avatar: "",
      role: "Maintainers"
    },
    cover_image: "",
    reading_time: "6 min read",
    published_at: "Oct 24, 2026"
  },
  {
    id: "blog-3",
    title: "Campus Ambassador Guide: Fostering Open Source Culture on Campus",
    slug: "campus-ambassador-spotlight",
    summary: "Empowering campus leaders to organize git workshops and support peers in open-source contribution.",
    content: "Learn how campus ambassadors coordinate workshops, hack sprints, and git onboarding sessions to introduce students to collaborative software engineering.",
    category: "Spotlight",
    author: {
      name: "Community Steering Committee",
      avatar: "",
      role: "Ambassador Leads"
    },
    cover_image: "",
    reading_time: "5 min read",
    published_at: "Oct 28, 2026"
  }
];

export const MOCK_FAQS: FAQItem[] = [
  {
    category: "General",
    question: `What is ${SEASON_SHORT} (${SITE_CONFIG.FULL_PROGRAM_NAME})?`,
    answer: `${DURATION_COPY.full}, organized by the Omnikon Foundation. It connects aspiring student developers with real-world open source projects, experienced engineering mentors, and campus networks, mirroring programs like GSSoC and GSOC with a gamified leaderboard and structured scoring system.`,
  },
  {
    category: "General",
    question: "Is OWOC free to participate in?",
    answer: "Yes, 100% free! OWOC believes in democratizing access to software engineering mentorship, high-impact repositories, and digital credentials.",
  },
  {
    category: "Contributors",
    question: "Who is eligible to participate as a contributor?",
    answer: "Any student, recent graduate, or self-taught developer from any university or background globally can register and contribute. No prior open-source experience is required.",
  },
  {
    category: "Contributors",
    question: "How are points awarded for Pull Requests?",
    answer: "PRs are tagged by maintainers based on difficulty: Easy (10 points), Medium (25 points), Hard (50 points). Mentors can also award a quality multiplier bonus up to +15 extra points for exceptional tests and documentation. Maintaining continuous contribution streaks awards additional streak bonus points.",
  },
  {
    category: "Mentors",
    question: "What are the key responsibilities of an OWOC Mentor?",
    answer: "Mentors guide contributors on repository architecture, triage issues, review pull requests within 48 hours, offer constructive code reviews, and assign quality score multipliers upon merging.",
  },
  {
    category: "Ambassadors",
    question: "What does a Campus Ambassador do?",
    answer: "Campus Ambassadors champion open-source culture in their university campus, organize local info sessions, share OWOC promo kits, and refer peers using their unique referral link to unlock tiered rewards, custom swags, and letters of recommendation.",
  },
  {
    category: "Points & Rewards",
    question: "What rewards and certificates do participants receive?",
    answer: "All contributors who merge at least 1 approved PR receive an official Digital Certificate of Participation. Top 100 contributors receive official OWOC Winter Swag Boxes, custom hoodies, and recognition across community channels.",
  }
];

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: "sp-1",
    name: "Sample Partner A",
    tier: "Alpha Title",
    logo: "",
    website: "",
    description: "Sample partner supporting open-source student mentorship and community workshops."
  },
  {
    id: "sp-2",
    name: "Sample Partner B",
    tier: "Alpha Title",
    logo: "",
    website: "",
    description: "Sample partner supporting high-performance systems and developer tooling."
  },
  {
    id: "sp-3",
    name: "Sample Partner C",
    tier: "Crimson Partner",
    logo: "",
    website: "",
    description: "Sample partner empowering student developers to build modern web platforms."
  },
  {
    id: "sp-4",
    name: "Sample Partner D",
    tier: "Crimson Partner",
    logo: "",
    website: "",
    description: "Sample partner supporting open-source databases and developer tooling."
  },
  {
    id: "sp-5",
    name: "Sample Partner E",
    tier: "Community Supporter",
    logo: "",
    website: "",
    description: "Sample community partner supporting student workshops and university chapters."
  }
];

export const MOCK_SAMPLE_CERTIFICATE: Certificate = {
  id: "OWOC-2026-C-9821",
  user_id: "c-1",
  recipient_name: "Aarav Patel",
  role: "Top Contributor (Rank #1)",
  project_name: "WinterVision Core",
  rank: 1,
  points: 1240,
  issued_date: formatDateRange(PHASES[4]),
  verification_hash: "0x8F9A4E27B13C9945D783E002B18944FE78B9910D",
  qr_code_data: "https://owoc.omnikon.org/certificate/OWOC-2026-C-9821"
};

export const MOCK_MENTOR_APPLICATIONS: MentorApplication[] = [
  {
    id: "m-app-1",
    user_id: "u-m1",
    full_name: "Dr. Kavita Shenoy",
    email: "kavita.shenoy@example.edu",
    github_username: "kshenoy-ai",
    linkedin_url: "",
    bio: "Senior Researcher in compiler optimization and edge acceleration. 8+ years experience guiding graduate research.",
    expertise_domains: ["AI/ML", "Rust", "CUDA"],
    weekly_availability_hours: 6,
    preferred_projects: "WinterVision Core",
    status: "pending",
    created_at: "2026-10-15T10:00:00Z"
  },
  {
    id: "m-app-2",
    user_id: "u-m2",
    full_name: "Marcus Vance",
    email: "marcus.v@cloudscale.io",
    github_username: "mvance-dev",
    linkedin_url: "",
    bio: "Staff Infrastructure Engineer. Maintained high-throughput Kubernetes operators and Envoy proxies.",
    expertise_domains: ["Cloud & DevOps", "Go", "Security"],
    weekly_availability_hours: 4,
    preferred_projects: "KubeMesh Controller",
    status: "pending",
    created_at: "2026-10-16T14:30:00Z"
  }
];

export const MOCK_PROJECT_ADMIN_APPLICATIONS: ProjectAdminApplication[] = [
  {
    id: "pa-app-1",
    user_id: "u-pa1",
    full_name: "Rohan Kulkarni",
    email: "rohan@hypercache.org",
    github_username: "rohank-sys",
    project_name: "HyperCache Distributed KV",
    repo_url: "",
    project_desc: "Distributed in-memory cache leveraging RDMA and io_uring with microsecond latency.",
    domain: "Cloud & DevOps",
    tech_stack: ["Rust", "C++", "Linux", "gRPC"],
    status: "pending",
    created_at: "2026-10-14T09:15:00Z"
  },
  {
    id: "pa-app-2",
    user_id: "u-pa2",
    full_name: "Sarah Jenkins",
    email: "sarah@aegis-sec.io",
    github_username: "sjenkins-sec",
    project_name: "Aegis Zero-Trust Proxy",
    repo_url: "",
    project_desc: "Identity-aware zero trust reverse proxy with automated mTLS rotation and eBPF observability.",
    domain: "Security",
    tech_stack: ["Go", "eBPF", "Kubernetes", "TLS"],
    status: "pending",
    created_at: "2026-10-16T11:45:00Z"
  }
];

export const MOCK_CONTRIBUTOR_APPLICATIONS: ContributorProjectApplication[] = [
  {
    id: "ca-1",
    project_id: "proj-1",
    project_name: "WinterVision Core",
    contributor_id: "u-c1",
    contributor_name: "Aarav Patel",
    github_username: "aaravp-dev",
    message: "I have experience with C++20 and CUDA kernels. I would love to tackle issue #14 (vector transformations).",
    plan: "Implement AVX-512 SIMD vectorization path, add microbenchmarks, and test memory alignments.",
    status: "pending",
    applied_at: "2026-10-16T08:20:00Z"
  },
  {
    id: "ca-2",
    project_id: "proj-2",
    project_name: "OpenPay Web3 SDK",
    contributor_id: "u-c2",
    contributor_name: "Zara Chen",
    github_username: "zarachen-web3",
    message: "Active in open-source Web3 ecosystem. Want to help construct client-side state channels.",
    plan: "Write integration tests with localnet and construct off-chain payment channels.",
    status: "pending",
    applied_at: "2026-10-17T12:00:00Z"
  }
];

export const MOCK_POINTS_LEDGER: PointsLedgerItem[] = [
  {
    id: "pl-1",
    user_id: "c-1",
    points: 100,
    reason: "Merged PR #14: Implement AVX-512 vector acceleration",
    type: "pr_merge",
    reference_id: "pr-1",
    awarded_by: "user-m1",
    created_at: "2026-12-05T16:20:00Z"
  },
  {
    id: "pl-2",
    user_id: "c-1",
    points: 10,
    reason: "Outstanding test coverage quality bonus for PR #14",
    type: "quality_bonus",
    reference_id: "pr-1",
    awarded_by: "user-m1",
    created_at: "2026-12-05T16:21:00Z"
  },
  {
    id: "pl-3",
    user_id: "c-2",
    points: 50,
    reason: "Merged PR #28: Anchor state channel tests",
    type: "pr_merge",
    reference_id: "pr-2",
    awarded_by: "user-m2",
    created_at: "2026-12-07T14:10:00Z"
  }
];

export const MOCK_POINTS_RULES: PointsRulesConfig = {
  easy_points: 10,
  medium_points: 25,
  hard_points: 50,
  streak_bonus: 15,
  quality_bonus_max: 10,
  daily_cap: 100,
  version: 1,
  updated_at: "2026-10-17T00:00:00Z"
};

export const MOCK_LEADERBOARD_SETTINGS: LeaderboardSettings = {
  is_frozen: false,
  disqualified_user_ids: [],
  last_recalculated_at: "2026-10-17T12:00:00Z"
};

export const MOCK_OFFICE_HOURS: OfficeHoursSession[] = [
  {
    id: "oh-1",
    mentor_id: "user-m1",
    mentor_name: "Dr. Aris Thorne",
    project_id: "proj-1",
    project_name: "WinterVision Core",
    title: "Rust & SIMD Optimization Clinic",
    session_date: "2026-12-06",
    start_time: "17:00",
    end_time: "18:00",
    meeting_url: "",
    max_attendees: 15,
    booked_count: 8,
    created_at: "2026-10-16T09:00:00Z"
  },
  {
    id: "oh-2",
    mentor_id: "user-m2",
    mentor_name: "Elena Rostova",
    project_id: "proj-1",
    project_name: "WinterVision Core",
    title: "CUDA Memory Allocation Architecture",
    session_date: "2026-12-08",
    start_time: "19:00",
    end_time: "20:00",
    meeting_url: "",
    max_attendees: 12,
    booked_count: 5,
    created_at: "2026-10-16T11:00:00Z"
  }
];

export const MOCK_MENTOR_FEEDBACK: MentorFeedbackRecord[] = [
  {
    id: "mf-1",
    mentor_id: "user-m1",
    mentor_name: "Dr. Aris Thorne",
    contributor_id: "c-1",
    contributor_name: "Aarav Patel",
    pr_id: "pr-1",
    pr_title: "Implement zero-copy buffer pooling",
    is_private: false,
    feedback_text: "Clean, idiomatic Rust code with comprehensive criterion benchmarks. Outstanding handling of cache-line alignment.",
    quality_rating: 5,
    created_at: "2026-12-05T16:22:00Z"
  },
  {
    id: "mf-2",
    mentor_id: "user-m1",
    mentor_name: "Dr. Aris Thorne",
    contributor_id: "c-1",
    contributor_name: "Aarav Patel",
    is_private: true,
    feedback_text: "Strong technical candidate for next season maintainer invite.",
    quality_rating: 5,
    created_at: "2026-12-05T16:25:00Z"
  }
];

export const MOCK_PROJECT_ANNOUNCEMENTS: ProjectAnnouncement[] = [
  {
    id: "pa-ann-1",
    project_id: "proj-1",
    project_name: "WinterVision Core",
    author_id: "user-m1",
    author_name: "Dr. Aris Thorne",
    title: "Week 1 Focus: Zero-Copy Pipelines & Good-First-Issues",
    content: "Welcome contributors! Please make sure your PRs compile cleanly with `--all-targets` and include unit tests for edge cases.",
    created_at: "2026-12-02T10:00:00Z"
  }
];

export const MOCK_NOTIFICATIONS: InAppNotification[] = [
  {
    id: "notif-1",
    user_id: "all",
    role: "contributor",
    title: "Registration Verified",
    message: "Your OWOC 2026 contributor profile is verified. Browse projects to prepare for December sprints.",
    link: "/projects",
    type: "info",
    is_read: false,
    created_at: "2026-10-17T10:00:00Z"
  },
  {
    id: "notif-2",
    user_id: "all",
    role: "project_admin",
    title: "New Contributor Application",
    message: "Aarav Patel submitted an application to join WinterVision Core.",
    link: "/dashboard/project-admin#applications",
    type: "info",
    is_read: false,
    created_at: "2026-10-17T11:00:00Z"
  },
  {
    id: "notif-3",
    user_id: "all",
    role: "mentor",
    title: "PR Awaiting Review",
    message: "PR #14 on WinterVision Core has been assigned to you for code review.",
    link: "/dashboard/mentor#reviews",
    type: "warning",
    is_read: false,
    created_at: "2026-10-17T11:30:00Z"
  },
  {
    id: "notif-4",
    user_id: "all",
    role: "super_admin",
    title: "Pending Repository Review",
    message: "HyperCache Distributed KV was submitted by Rohan Kulkarni for OWOC listing.",
    link: "/dashboard/admin#approvals",
    type: "alert",
    is_read: false,
    created_at: "2026-10-17T12:00:00Z"
  }
];

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "al-1",
    admin_id: "admin-1",
    admin_email: "organizer@omnikon.org",
    action: "approve_project",
    target_type: "project",
    target_id: "proj-1",
    details_before: { status: "pending" },
    details_after: { status: "approved" },
    created_at: "2026-10-15T14:22:00Z"
  },
  {
    id: "al-2",
    admin_id: "admin-1",
    admin_email: "organizer@omnikon.org",
    action: "update_points_rules",
    target_type: "points_rules_config",
    target_id: "rules-v1",
    details_before: { streak_bonus: 10 },
    details_after: { streak_bonus: 15 },
    created_at: "2026-10-16T09:10:00Z"
  }
];

export const MOCK_SITE_SETTINGS: SiteSettings = {
  contact_email: "contact@omnikon.org",
  conduct_email: "conduct@omnikon.org",
  twitter_url: "",
  linkedin_url: "",
  github_url: "https://github.com/namanlunia/Event",
  discord_url: "",
  ambassador_rewards_config: {
    bronze_threshold: 10,
    silver_threshold: 25,
    gold_threshold: 50,
    master_threshold: 100
  },
  updated_at: "2026-10-17T00:00:00Z"
};

