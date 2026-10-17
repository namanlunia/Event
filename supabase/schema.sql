-- =========================================================
-- OWOC (Omnikon Winter of Code) Database Schema (PostgreSQL)
-- Compatible with Supabase Auth & Row Level Security (RLS)
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COLLEGES TABLE
CREATE TABLE IF NOT EXISTS public.colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contributor_count INT DEFAULT 0,
    points_total INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. USER PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'maintainer', 'mentor', 'contributor', 'ambassador')),
    full_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    github_username TEXT NOT NULL,
    bio TEXT,
    college_id UUID REFERENCES public.colleges(id) ON DELETE SET NULL,
    year_of_study TEXT,
    skills TEXT[] DEFAULT '{}',
    linkedin_url TEXT,
    twitter_url TEXT,
    points INT DEFAULT 0,
    rank INT,
    streak_days INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    repository_url TEXT NOT NULL UNIQUE,
    tech_stack TEXT[] DEFAULT '{}',
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    domain TEXT NOT NULL CHECK (domain IN ('Web3', 'AI/ML', 'Cloud & DevOps', 'Full-Stack', 'Mobile', 'Security')),
    organization TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    maintainer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    open_issues_count INT DEFAULT 0,
    stars_count INT DEFAULT 0,
    forks_count INT DEFAULT 0,
    banner_url TEXT,
    contribution_guide TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PROJECT MENTORS
CREATE TABLE IF NOT EXISTS public.project_mentors (
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    mentor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_description TEXT,
    PRIMARY KEY (project_id, mentor_id)
);

-- 5. ISSUES TABLE
CREATE TABLE IF NOT EXISTS public.issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    issue_number INT NOT NULL,
    issue_url TEXT NOT NULL,
    labels TEXT[] DEFAULT '{}',
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    points INT NOT NULL DEFAULT 10,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'closed')),
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PULL REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.pull_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    contributor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    pr_number INT NOT NULL,
    pr_url TEXT NOT NULL,
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    points_awarded INT DEFAULT 0,
    quality_bonus INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'merged', 'rejected')),
    mentor_feedback TEXT,
    merged_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. POINTS LEDGER TABLE
CREATE TABLE IF NOT EXISTS public.points_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    points INT NOT NULL,
    reason TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('pr_merge', 'streak_bonus', 'mentor_bonus', 'referral', 'bonus')),
    reference_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. BADGES & USER BADGES
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Obsidian')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_badges (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, badge_id)
);

-- 9. AMBASSADORS & REFERRALS
CREATE TABLE IF NOT EXISTS public.ambassadors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    referral_code TEXT UNIQUE NOT NULL,
    referrals_count INT DEFAULT 0,
    target_goal INT DEFAULT 100,
    reward_tier TEXT DEFAULT 'Bronze' CHECK (reward_tier IN ('Bronze', 'Silver', 'Gold', 'Master Ambassador')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ambassador_id UUID REFERENCES public.ambassadors(id) ON DELETE CASCADE,
    referred_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    status TEXT DEFAULT 'signed_up' CHECK (status IN ('signed_up', 'active_contributor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id TEXT PRIMARY KEY, -- e.g. OWOC-2024-C-9821
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_name TEXT NOT NULL,
    role TEXT NOT NULL,
    project_name TEXT,
    rank INT,
    points INT,
    issued_date TEXT NOT NULL,
    verification_hash TEXT NOT NULL,
    qr_code_data TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pull_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Public can view approved projects, issues, colleges, profiles, and certificates
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (status = 'approved');
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read issues" ON public.issues FOR SELECT USING (true);
CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT USING (true);

-- Authenticated users can create & edit their own profile
CREATE POLICY "Users edit own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Maintainers can update their own projects
CREATE POLICY "Maintainers edit projects" ON public.projects FOR UPDATE USING (auth.uid() = maintainer_id);
