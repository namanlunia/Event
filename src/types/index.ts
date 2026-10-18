export type StandardRole = "super_admin" | "project_admin" | "mentor" | "contributor" | "ambassador";
export type LegacyRole = "admin" | "maintainer";
export type UserRole = StandardRole | LegacyRole;

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role: StandardRole;
  granted_at: string;
  granted_by?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  roles?: StandardRole[];
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
  status?: "active" | "suspended";
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
  license?: string;
  guidelines_url?: string;
  good_first_issues_count?: number;
  preferred_mentors?: string[];
  ownership_confirmed?: boolean;
  admin_review_notes?: string;
  is_featured?: boolean;
  created_at: string;
  reviewed_at?: string;
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
  type: "pr_merge" | "streak_bonus" | "quality_bonus" | "mentor_bonus" | "referral" | "bonus";
  reference_id?: string;
  awarded_by?: string;
  created_at: string;
}

export interface Badge {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  tier: "Bronze" | "Silver" | "Gold" | "Obsidian";
  award_rule?: string;
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
  created_at?: string;
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
  id?: string;
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
  confirmed?: boolean;
}

export interface TimelineStep {
  date: string;
  title: string;
  description: string;
  status: "completed" | "active" | "upcoming";
  badge: string;
}

// Application & Workflow Interfaces
export interface MentorApplication {
  id: string;
  user_id?: string;
  full_name: string;
  email: string;
  github_username: string;
  linkedin_url?: string;
  bio: string;
  expertise_domains: string[];
  weekly_availability_hours: number;
  preferred_projects?: string;
  status: "pending" | "approved" | "rejected";
  admin_notes?: string;
  created_at: string;
  reviewed_at?: string;
}

export interface ProjectAdminApplication {
  id: string;
  user_id?: string;
  full_name: string;
  email: string;
  github_username: string;
  project_name: string;
  repo_url: string;
  project_desc: string;
  domain: ProjectDomain;
  tech_stack: string[];
  status: "pending" | "approved" | "rejected";
  admin_notes?: string;
  created_at: string;
  reviewed_at?: string;
}

export interface ContributorProjectApplication {
  id: string;
  project_id: string;
  project_name?: string;
  contributor_id: string;
  contributor_name: string;
  contributor_avatar?: string;
  github_username: string;
  message: string;
  plan?: string;
  status: "pending" | "accepted" | "declined";
  applied_at: string;
  reviewed_at?: string;
  review_message?: string;
}

export interface PointsRulesConfig {
  id?: string;
  easy_points: number;
  medium_points: number;
  hard_points: number;
  streak_bonus: number;
  quality_bonus_max: number;
  daily_cap: number;
  version: number;
  updated_by?: string;
  updated_at: string;
}

export interface LeaderboardSettings {
  is_frozen: boolean;
  frozen_at?: string;
  disqualified_user_ids: string[];
  last_recalculated_at?: string;
}

export interface OfficeHoursSession {
  id: string;
  mentor_id: string;
  mentor_name: string;
  project_id?: string;
  project_name?: string;
  title: string;
  session_date: string;
  start_time: string;
  end_time: string;
  meeting_url: string;
  max_attendees: number;
  booked_count: number;
  created_at: string;
}

export interface MentorFeedbackRecord {
  id: string;
  mentor_id: string;
  mentor_name: string;
  contributor_id: string;
  contributor_name: string;
  pr_id?: string;
  pr_title?: string;
  is_private: boolean;
  feedback_text: string;
  quality_rating: number; // 1 to 5
  created_at: string;
}

export interface ProjectAnnouncement {
  id: string;
  project_id: string;
  project_name: string;
  author_id: string;
  author_name: string;
  title: string;
  content: string;
  created_at: string;
}

export interface InAppNotification {
  id: string;
  user_id: string;
  role?: UserRole;
  title: string;
  message: string;
  link?: string;
  type: "info" | "success" | "warning" | "alert";
  is_read: boolean;
  created_at: string;
}

export interface AuditLogItem {
  id: string;
  admin_id: string;
  admin_email: string;
  action: string;
  target_type: string;
  target_id: string;
  details_before?: Record<string, unknown>;
  details_after?: Record<string, unknown>;
  created_at: string;
}

export interface SiteSettings {
  contact_email: string;
  conduct_email: string;
  twitter_url: string;
  linkedin_url: string;
  github_url: string;
  discord_url: string;
  ambassador_rewards_config: {
    bronze_threshold: number;
    silver_threshold: number;
    gold_threshold: number;
    master_threshold: number;
  };
  updated_at: string;
}
