-- =========================================================
-- OWOC 2026: Role Dashboards, RBAC & Extended Tables Migration
-- =========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER ROLES (Multi-role support per user)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'project_admin', 'mentor', 'contributor', 'ambassador')),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    granted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    UNIQUE(user_id, role)
);

-- 2. EXTEND PROJECTS TABLE WITH ADMIN & MAINTAINER FIELDS
ALTER TABLE public.projects 
    ADD COLUMN IF NOT EXISTS license TEXT DEFAULT 'MIT',
    ADD COLUMN IF NOT EXISTS guidelines_url TEXT,
    ADD COLUMN IF NOT EXISTS good_first_issues_count INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS preferred_mentors TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS ownership_confirmed BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS admin_review_notes TEXT,
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE;

-- 3. MENTOR APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.mentor_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    github_username TEXT NOT NULL,
    linkedin_url TEXT,
    bio TEXT NOT NULL,
    expertise_domains TEXT[] DEFAULT '{}',
    weekly_availability_hours INT NOT NULL DEFAULT 4,
    preferred_projects TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- 4. PROJECT ADMIN APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.project_admin_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    github_username TEXT NOT NULL,
    project_name TEXT NOT NULL,
    repo_url TEXT NOT NULL,
    project_desc TEXT NOT NULL,
    domain TEXT NOT NULL,
    tech_stack TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- 5. CONTRIBUTOR APPLICATIONS TO JOIN PROJECT
CREATE TABLE IF NOT EXISTS public.contributor_project_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    contributor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    plan TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    review_message TEXT
);

-- 6. EXTEND POINTS LEDGER WITH AWARDED_BY
ALTER TABLE public.points_ledger
    ADD COLUMN IF NOT EXISTS awarded_by TEXT;

-- 7. POINTS RULES CONFIG TABLE (Versioned)
CREATE TABLE IF NOT EXISTS public.points_rules_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    easy_points INT NOT NULL DEFAULT 10,
    medium_points INT NOT NULL DEFAULT 25,
    hard_points INT NOT NULL DEFAULT 50,
    streak_bonus INT NOT NULL DEFAULT 15,
    quality_bonus_max INT NOT NULL DEFAULT 10,
    daily_cap INT NOT NULL DEFAULT 100,
    version INT NOT NULL DEFAULT 1,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. LEADERBOARD SETTINGS & INTEGRITY
CREATE TABLE IF NOT EXISTS public.leaderboard_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_frozen BOOLEAN DEFAULT FALSE,
    frozen_at TIMESTAMP WITH TIME ZONE,
    disqualified_user_ids UUID[] DEFAULT '{}',
    last_recalculated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. MENTOR OFFICE HOURS
CREATE TABLE IF NOT EXISTS public.office_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    session_date DATE NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    meeting_url TEXT NOT NULL,
    max_attendees INT NOT NULL DEFAULT 15,
    booked_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. MENTOR FEEDBACK (Private and Public)
CREATE TABLE IF NOT EXISTS public.mentor_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    contributor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    pr_id UUID REFERENCES public.pull_requests(id) ON DELETE SET NULL,
    is_private BOOLEAN DEFAULT FALSE,
    feedback_text TEXT NOT NULL,
    quality_rating INT NOT NULL CHECK (quality_rating >= 1 AND quality_rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. PROJECT ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.project_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. IN-APP NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'alert')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_email TEXT NOT NULL DEFAULT 'contact@omnikonhub.com',
    conduct_email TEXT NOT NULL DEFAULT 'contact@omnikonhub.com',
    twitter_url TEXT DEFAULT '',
    linkedin_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    discord_url TEXT DEFAULT '',
    ambassador_rewards_config JSONB DEFAULT '{"bronze_threshold": 10, "silver_threshold": 25, "gold_threshold": 50, "master_threshold": 100}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR NEW TABLES
-- =========================================================

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_admin_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributor_project_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_rules_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.office_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user has super_admin role
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'super_admin'
    ) OR EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if current user has project_admin role
CREATE OR REPLACE FUNCTION public.is_project_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'project_admin'
    ) OR EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('maintainer', 'project_admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for user_roles
CREATE POLICY "Users read own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id OR public.is_super_admin());

CREATE POLICY "Super admin manages roles" ON public.user_roles
    FOR ALL USING (public.is_super_admin());

-- Policies for applications
CREATE POLICY "Applicants read own mentor applications" ON public.mentor_applications
    FOR SELECT USING (auth.uid() = user_id OR public.is_super_admin());

CREATE POLICY "Anyone submit mentor application" ON public.mentor_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Super admin update mentor application" ON public.mentor_applications
    FOR UPDATE USING (public.is_super_admin());

CREATE POLICY "Applicants read own project admin applications" ON public.project_admin_applications
    FOR SELECT USING (auth.uid() = user_id OR public.is_super_admin());

CREATE POLICY "Anyone submit project admin application" ON public.project_admin_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Super admin update project admin application" ON public.project_admin_applications
    FOR UPDATE USING (public.is_super_admin());

-- Policies for notifications
CREATE POLICY "Users read own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Policies for office hours
CREATE POLICY "Public read office hours" ON public.office_hours
    FOR SELECT USING (true);

CREATE POLICY "Mentors create office hours" ON public.office_hours
    FOR INSERT WITH CHECK (auth.uid() = mentor_id OR public.is_super_admin());

-- Policies for mentor feedback
CREATE POLICY "Read feedback" ON public.mentor_feedback
    FOR SELECT USING (
        (NOT is_private AND auth.uid() = contributor_id) OR
        auth.uid() = mentor_id OR
        public.is_super_admin()
    );

CREATE POLICY "Mentors create feedback" ON public.mentor_feedback
    FOR INSERT WITH CHECK (auth.uid() = mentor_id OR public.is_super_admin());

-- Policies for project announcements
CREATE POLICY "Public read announcements" ON public.project_announcements
    FOR SELECT USING (true);

CREATE POLICY "Maintainers post announcements" ON public.project_announcements
    FOR INSERT WITH CHECK (
        auth.uid() = author_id OR 
        public.is_project_admin() OR 
        public.is_super_admin()
    );

-- Policies for site settings
CREATE POLICY "Public read site settings" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Super admin update site settings" ON public.site_settings
    FOR ALL USING (public.is_super_admin());
