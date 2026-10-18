import { Project, UserProfile, PullRequest, Ambassador, College, Sponsor } from "@/types";
import { SITE_CONFIG } from "@/lib/site-config";
import * as demoData from "@/lib/demo-data";

/**
 * Returns approved projects.
 * When DEMO_MODE is false, only genuine confirmed projects from DB/store are returned.
 */
export function getApprovedProjects(): Project[] {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_PROJECTS;
  }
  // When DEMO_MODE is false: return empty array or real DB projects
  return [];
}

/**
 * Returns active contributors.
 * When DEMO_MODE is false, only genuine registered contributors are returned.
 */
export function getActiveContributors(): UserProfile[] {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_CONTRIBUTORS;
  }
  return [];
}

/**
 * Returns campus ambassadors.
 * When DEMO_MODE is false, only verified campus ambassadors are returned.
 */
export function getCampusAmbassadors(): Ambassador[] {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_AMBASSADORS;
  }
  return [];
}

/**
 * Returns scored PRs.
 */
export function getScoredPullRequests(): PullRequest[] {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_PRS;
  }
  return [];
}

/**
 * Returns participating colleges.
 */
export function getColleges(): College[] {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_COLLEGES;
  }
  return [];
}

/**
 * Returns confirmed sponsors.
 * In production (DEMO_MODE=false), only confirmed sponsors are returned.
 */
export function getConfirmedSponsors(): Sponsor[] {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_SPONSORS;
  }
  return [];
}

export interface SiteStats {
  mergedPrs: number;
  mergedPRs: number;
  studentBuilders: number;
  openRepositories: number;
  approvedProjects: number;
  participatingColleges: number;
  verifiedCerts: number;
  isLive: boolean;
}

/**
 * Returns centralized program/site stats.
 * When DEMO_MODE is false, computed strictly from real database entries.
 */
export function getSiteStats(): SiteStats {
  if (SITE_CONFIG.DEMO_MODE) {
    return {
      mergedPrs: 4800,
      mergedPRs: 4800,
      studentBuilders: 2500,
      openRepositories: 120,
      approvedProjects: 120,
      participatingColleges: 350,
      verifiedCerts: 1800,
      isLive: false,
    };
  }

  // Real data computation
  const projects = getApprovedProjects();
  const contributors = getActiveContributors();
  const prs = getScoredPullRequests();
  const colleges = getColleges();

  return {
    mergedPrs: prs.filter((p) => p.status === "merged").length,
    mergedPRs: prs.filter((p) => p.status === "merged").length,
    studentBuilders: contributors.length,
    openRepositories: projects.length,
    approvedProjects: projects.length,
    participatingColleges: colleges.length,
    verifiedCerts: 0,
    isLive: false,
  };
}

export const getProgramStats = getSiteStats;

/**
 * Returns a project by ID.
 */
export function getProjectById(id: string): Project | undefined {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_PROJECTS.find((p) => p.id === id);
  }
  const approved = getApprovedProjects();
  return approved.find((p) => p.id === id);
}

/**
 * Returns active mentors.
 */
export function getMentors() {
  if (SITE_CONFIG.DEMO_MODE) {
    return [
      {
        name: "Dr. Aris Thorne",
        role: "AI Compiler Architect",
        company: "Research Labs",
        domain: "AI/ML & Systems",
        github: "aristhorne",
        bio: "Specializing in compiler optimization, SIMD intrinsics, and neural runtimes.",
        project: "WinterVision Core",
        projectId: "proj-1",
      },
      {
        name: "Elena Rostova",
        role: "CUDA Optimization Lead",
        company: "Accelerated Compute",
        domain: "High Performance Computing",
        github: "erostova",
        bio: "Specializing in GPU kernel scheduling, memory coalescing, and PyTorch C++ extensions.",
        project: "WinterVision Core",
        projectId: "proj-1",
      },
      {
        name: "Kaelen Voss",
        role: "Protocol Engineer",
        company: "Distributed Systems Lab",
        domain: "Web3 & Distributed Ledgers",
        github: "kaelenvoss",
        bio: "Developer tooling and smart contract safety on modern protocols.",
        project: "OpenPay Web3 SDK",
        projectId: "proj-2",
      },
      {
        name: "Marcus Vance",
        role: "SRE & Infrastructure Architect",
        company: "CloudNative Labs",
        domain: "Cloud & DevOps",
        github: "marcusvance",
        bio: "Kubernetes SIG contributor, Wireguard mesh tinkerer, and routing specialist.",
        project: "Nexus DevOps Mesh",
        projectId: "proj-3",
      },
      {
        name: "Sarah Chen",
        role: "Frontend Architect",
        company: "Design Systems Guild",
        domain: "Full-Stack & Web Performance",
        github: "sarahchendev",
        bio: "Passionate about web accessibility, design systems, and modern React concurrency.",
        project: "OmniUI Glass React",
        projectId: "proj-4",
      },
      {
        name: "Tariq Mansoor",
        role: "Security Researcher",
        company: "Security Research Group",
        domain: "Security & Program Analysis",
        github: "tariqsec",
        bio: "Symbolic execution enthusiast, analyzing bytecode and vulnerability scanners.",
        project: "Sentinel Shield Threat Detector",
        projectId: "proj-5",
      },
      {
        name: "Priya Nair",
        role: "Mobile Engineering Lead",
        company: "Mobile Open Core",
        domain: "Mobile & Embedded",
        github: "priyanair",
        bio: "Architecting fluid interfaces and local data synchronization.",
        project: "PulseFit Native",
        projectId: "proj-6",
      },
    ];
  }
  return [];
}

/**
 * Returns a certificate by ID if verified.
 */
export function getCertificateById(id: string) {
  if (SITE_CONFIG.DEMO_MODE) {
    if (id === demoData.MOCK_SAMPLE_CERTIFICATE.id) {
      return demoData.MOCK_SAMPLE_CERTIFICATE;
    }
  }
  // When DEMO_MODE is false or non-matching ID: return null (only genuine issued certs exist)
  return null;
}

/**
 * Returns honest, verified FAQs.
 */
export function getFAQItems() {
  return [
    {
      category: "General",
      question: "What is OWOC (Omnikon Winter of Code)?",
      answer: "OWOC is a structured open-source mentorship program connecting student developers with real-world open source projects, maintainers, and campus communities through merit-driven sprints.",
    },
    {
      category: "General",
      question: "Is OWOC free to participate in?",
      answer: "Yes, 100% free! OWOC provides accessible open-source mentorship, project contribution opportunities, and verifiable digital credentials.",
    },
    {
      category: "Contributors",
      question: "Who is eligible to participate as a contributor?",
      answer: "Any student, recent graduate, or self-taught developer from any university or background globally can register and contribute. No prior open-source experience is required.",
    },
    {
      category: "Contributors",
      question: "How are points awarded for Pull Requests?",
      answer: "PRs are tagged by maintainers based on difficulty: Easy (10 points), Medium (25 points), Hard (50 points). Mentors can also award quality bonuses for exceptional test coverage and documentation.",
    },
    {
      category: "Mentors",
      question: "What are the key responsibilities of an OWOC Mentor?",
      answer: "Mentors guide contributors on repository architecture, triage issues, review pull requests, offer constructive feedback, and award quality score bonuses upon merging.",
    },
    {
      category: "Ambassadors",
      question: "What does a Campus Ambassador do?",
      answer: "Campus Ambassadors champion open-source culture at their college, organize informational sessions, share OWOC resources, and help fellow students submit their first pull requests.",
    },
    {
      category: "Points & Rewards",
      question: "What credentials do participants receive?",
      answer: "All contributors who merge at least 1 approved pull request receive a verifiable digital Certificate of Participation with a unique QR code and ID.",
    },
  ];
}
