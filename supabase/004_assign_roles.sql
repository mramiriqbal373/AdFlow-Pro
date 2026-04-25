-- Set Admin and Moderator roles
-- IMPORTANT: You must first SIGN UP these users in your app
-- then run this SQL to assign their special roles.

-- 1. Assign Admin role
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@gmail.com';

-- 2. Assign Moderator role
UPDATE public.profiles
SET role = 'moderator'
WHERE email = 'moderator@gmail.com';

-- 3. Verify roles
SELECT email, full_name, role FROM public.profiles;
