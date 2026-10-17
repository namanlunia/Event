export type UserRole = "admin" | "maintainer" | "mentor" | "contributor" | "ambassador";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  username: string;
  avatar_url: string;
  github_username: string;
  bio: string;
  college_id?: string;
  college_name?: string;
  year_of_study?: string;
  skills: string[];
  linkedin_url?: string;
  twitter_url?: string;
  created_at: string;
  points?: number;
  rank?: number;
  streak_days?: number;
}

export interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  contributor_count: number;
  points_total: number;
}

export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type ProjectDomain = "Web3" | "AI/ML" | "Cloud & DevOps" | "Full-Stack" | "Mobile" | "Security";
export type ProjectStatus = "approved" | "pending" | "rejected";

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  repository_url: string;
  tech_stack: string[];
  difficulty: ProjectDifficulty;
  domain: ProjectDomain;
  organization: string;
  status: ProjectStatus;
  maintainer_id: string;
  maintainer_name: string;
  maintainer_avatar: string;
  mentor_ids: string[];
  mentors?: { name: string; avatar: string; role: string; github: string }[];
  open_issues_count: number;
  stars_count: number;
  forks_count: number;
  banner_url?: string;
  contribution_guide?: string;
  created_at: string;
}

export interface Issue {
  id: string;
  project_id: string;
  project_name: string;
  title: string;
  issue_number: number;
  issue_url: string;
  labels: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  status: "open" | "assigned" | "closed";
  assigned_to?: string;
  assigned_to_name?: string;
}

export interface PullRequest {
  id: string;
  project_id: string;
  project_name: string;
  contributor_id: string;
  contributor_name: string;
  contributor_avatar: string;
  pr_number: number;
  pr_url: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points_awarded: number;
  quality_bonus: number;
  status: "pending" | "approved" | "merged" | "rejected";
  mentor_feedback?: string;
  merged_at?: string;
  created_at: string;
}

export interface PointsLedgerItem {
  id: string;
  user_id: string;
  points: number;
  reason: string;
  type: "pr_merge" | "streak_bonus" | "mentor_bonus" | "referral" | "bonus";
  reference_id?: string;
  created_at: string;
}

export interface Badge {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  tier: "Bronze" | "Silver" | "Gold" | "Obsidian";
  unlocked: boolean;
  unlocked_at?: string;
}

export interface Ambassador {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string;
  college_name: string;
  referral_code: string;
  referrals_count: number;
  target_goal: number;
  reward_tier: "Bronze" | "Silver" | "Gold" | "Master Ambassador";
  rank: number;
}

export interface Certificate {
  id: string;
  user_id: string;
  recipient_name: string;
  role: string;
  project_name?: string;
  rank?: number;
  points?: number;
  issued_date: string;
  verification_hash: string;
  qr_code_data: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: "Announcement" | "Guide" | "Spotlight" | "Release";
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  cover_image: string;
  reading_time: string;
  published_at: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Contributors" | "Mentors" | "Ambassadors" | "Points & Rewards";
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "Alpha Title" | "Crimson Partner" | "Community Supporter";
  logo: string;
  website: string;
  description: string;
}

export interface TimelineStep {
  date: string;
  title: string;
  description: string;
  status: "completed" | "active" | "upcoming";
  badge: string;
}
