-- =========================================================
-- OWOC 2026 Seed Data Script
-- =========================================================

-- Note: Seed data is intended for local Supabase emulator or staging setup.
-- In production (DEMO_MODE=false), live records are populated via verified auth & applications.

-- Sample Settings
INSERT INTO public.site_settings (id, contact_email, conduct_email, twitter_url, linkedin_url, github_url, discord_url)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'contact@omnikon.org',
    'conduct@omnikon.org',
    'https://x.com/omnikon_owoc',
    'https://linkedin.com/company/omnikon',
    'https://github.com/namanlunia/Event',
    'https://discord.gg/owoc'
) ON CONFLICT (id) DO NOTHING;

-- Sample Points Rules
INSERT INTO public.points_rules_config (id, easy_points, medium_points, hard_points, streak_bonus, quality_bonus_max, daily_cap, version)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    10,
    25,
    50,
    15,
    10,
    100,
    1
) ON CONFLICT (id) DO NOTHING;

-- Sample Leaderboard Settings
INSERT INTO public.leaderboard_settings (id, is_frozen)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    false
) ON CONFLICT (id) DO NOTHING;
