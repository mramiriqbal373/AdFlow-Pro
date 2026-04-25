-- NUCLEAR RESET & REPAIR SCRIPT
-- This script wipes the public schema and recreates everything correctly.

-- 1. WIPE SCHEMA
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

-- 2. SET PERMISSIONS
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO anon;
GRANT ALL ON SCHEMA public TO authenticated;
GRANT ALL ON SCHEMA public TO service_role;

-- 3. CREATE TYPES
CREATE TYPE user_role AS ENUM ('client', 'moderator', 'admin', 'super_admin');
CREATE TYPE ad_status AS ENUM ('draft', 'submitted', 'under_review', 'payment_pending', 'payment_submitted', 'payment_verified', 'scheduled', 'published', 'expired', 'rejected', 'archived');
CREATE TYPE payment_status AS ENUM ('pending', 'verified', 'rejected');

-- 4. CREATE TABLES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role DEFAULT 'client',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    duration_days INTEGER NOT NULL,
    weight INTEGER DEFAULT 1,
    is_featured BOOLEAN DEFAULT FALSE,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE ads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    package_id INTEGER REFERENCES packages(id),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    city_id INTEGER REFERENCES cities(id) ON DELETE SET NULL,
    description TEXT,
    status ad_status DEFAULT 'draft',
    rank_score INTEGER DEFAULT 0,
    publish_at TIMESTAMP WITH TIME ZONE,
    expire_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ad_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id UUID REFERENCES ads(id) ON DELETE CASCADE,
    source_type TEXT NOT NULL,
    original_url TEXT NOT NULL,
    thumbnail_url TEXT,
    validation_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id UUID REFERENCES ads(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    method TEXT,
    transaction_ref TEXT UNIQUE NOT NULL,
    sender_name TEXT,
    screenshot_url TEXT,
    status payment_status DEFAULT 'pending',
    verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TRIGGERS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    'client'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. SEED INITIAL DATA
INSERT INTO categories (name, slug) VALUES 
('Vehicles', 'vehicles'),
('Real Estate', 'real-estate'),
('Services', 'services'),
('Electronics', 'electronics');

INSERT INTO cities (name, slug) VALUES 
('New York', 'new-york'),
('San Francisco', 'san-francisco'),
('Chicago', 'chicago'),
('Remote', 'remote');

INSERT INTO packages (name, duration_days, weight, is_featured, price) VALUES 
('Basic', 7, 1, false, 19.00),
('Standard', 15, 2, false, 49.00),
('Premium', 30, 3, true, 89.00);

-- 7. REPAIR PROFILES (for existing users)
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'client' FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 8. FINAL PERMISSIONS
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE ads DISABLE ROW LEVEL SECURITY;
ALTER TABLE ad_media DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
