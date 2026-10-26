-- =========================================================
-- OWOC 2026: Profiles RBAC Lock Migration
-- Migration: 20261026_profiles_rbac_lock.sql
-- =========================================================

-- 1. Ensure public.profiles table exists and has single role column
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    github_handle TEXT,
    avatar_url TEXT,
    college TEXT,
    points INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add role column with check constraint and default 'contributor'
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'role'
    ) THEN
        ALTER TABLE public.profiles 
        ADD COLUMN role TEXT NOT NULL DEFAULT 'contributor' 
        CHECK (role IN ('super_admin', 'project_admin', 'mentor', 'contributor', 'ambassador'));
    ELSE
        -- Ensure check constraint exists
        ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
            CHECK (role IN ('super_admin', 'project_admin', 'mentor', 'contributor', 'ambassador'));
    END IF;
END $$;

-- 2. Backfill profiles from user_roles if user_roles exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'user_roles'
    ) THEN
        -- Prioritize super_admin > project_admin > mentor > ambassador > contributor
        UPDATE public.profiles p
        SET role = COALESCE(
            (SELECT ur.role FROM public.user_roles ur 
             WHERE ur.user_id = p.id 
             ORDER BY CASE ur.role 
                WHEN 'super_admin' THEN 1 
                WHEN 'project_admin' THEN 2 
                WHEN 'mentor' THEN 3 
                WHEN 'ambassador' THEN 4 
                ELSE 5 END ASC 
             LIMIT 1),
            'contributor'
        );
        -- Drop legacy user_roles table to enforce single role per profile
        DROP TABLE IF EXISTS public.user_roles CASCADE;
    END IF;
END $$;

-- 3. Drop legacy workspace or persona switching artifacts if any exist
DROP TABLE IF EXISTS public.user_workspaces CASCADE;
DROP TABLE IF EXISTS public.workspaces CASCADE;

-- 4. Enable Row Level Security on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Policy: Super Admins can view all profiles
DROP POLICY IF EXISTS "Super admins can view all profiles" ON public.profiles;
CREATE POLICY "Super admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Policy: Users can update their own personal info (but NOT their role)
DROP POLICY IF EXISTS "Users can update own details excluding role" ON public.profiles;
CREATE POLICY "Users can update own details excluding role"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id AND 
        role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
    );

-- Policy: Only super_admin can update profiles.role
DROP POLICY IF EXISTS "Super admins can update any profile role" ON public.profiles;
CREATE POLICY "Super admins can update any profile role"
    ON public.profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );
