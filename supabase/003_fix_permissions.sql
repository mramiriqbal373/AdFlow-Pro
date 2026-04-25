-- Fix Permissions for all tables
-- Run this in your Supabase SQL Editor if you see "Permission Denied" errors

-- 1. Disable RLS on all tables for now to ensure smooth development
-- (You can re-enable and configure specific policies later if needed)
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS seller_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cities DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ads DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ad_media DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ad_status_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS notifications DISABLE ROW LEVEL SECURITY;

-- 2. Grant all permissions to authenticated and anon users
-- This ensures the frontend can read/write data correctly
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
