import { Project, UserProfile, PullRequest, Ambassador, College, Sponsor } from "@/types";

/**
 * Returns approved projects.
 * In launch mode, projects are "To Be Announced" prior to official onboarding.
 */
export function getApprovedProjects(): Project[] {
  // In launch mode, projects are cleared and "To Be Announced"
  return [];
}

export function getActiveContributors(): UserProfile[] {
  // In launch mode, leaderboard is cleared and "To Be Continued" until sprint starts
  return [];
}

export function getCampusAmbassadors(): Ambassador[] {
  return [];
}

export function getScoredPullRequests(): PullRequest[] {
  return [];
}

export function getColleges(): College[] {
  return [];
}

/**
 * Returns confirmed sponsors.
 */
export function getConfirmedSponsors(): Sponsor[] {
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
  return {
    mergedPrs: 0,
    mergedPRs: 0,
    studentBuilders: 0,
    openRepositories: 0,
    approvedProjects: 0,
    participatingColleges: 0,
    verifiedCerts: 0,
    isLive: false,
  };
}

export const getProgramStats = getSiteStats;

/**
 * Returns a project by ID.
 * Returns undefined as projects are cleared/TBA.
 */
export function getProjectById(_id: string): Project | undefined {
  return undefined;
}

/**
 * Returns active mentors.
 * Empty until official mentor onboarding announces approved mentors.
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
 * Returns null until certificates are officially issued at program completion.
 */
export function getCertificateById(_id: string) {
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
