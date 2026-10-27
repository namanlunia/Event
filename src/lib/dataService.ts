import { Project, UserProfile, PullRequest, Ambassador, College, Sponsor } from "@/types";
import { SITE_CONFIG } from "@/lib/site-config";
import * as demoData from "@/lib/demo-data";

/**
 * Returns approved projects.
 * In launch mode, projects are "To Be Announced" prior to official onboarding.
 */
export function getApprovedProjects(): Project[] {
  return [];
}

export function getActiveContributors(): UserProfile[] {
  return [];
}

export function getCampusAmbassadors(): Ambassador[] {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_AMBASSADORS;
  }
  return [];
}

export function getScoredPullRequests(): PullRequest[] {
  if (SITE_CONFIG.DEMO_MODE) {
    return demoData.MOCK_PRS;
  }
  return [];
}

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
export function getProjectById(_id: string): Project | undefined {
  return undefined;
}

/**
 * Returns active mentors.
 */
export function getMentors(): {
  name: string;
  role: string;
  company: string;
  domain: string;
  github: string;
  bio: string;
  project?: string;
  projectId?: string;
}[] {
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
      answer: "Yes, 100% free! OWOC provides accessible open-source mentorship, project contribution opportunities, and digital certificates.",
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
      answer: "All contributors who merge at least 1 approved pull request receive an official Digital Certificate of Participation.",
    },
  ];
}
