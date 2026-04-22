-- AdFlow Pro Supabase Database Schema

-- 1. Custom Types (Enums)
CREATE TYPE user_role AS ENUM ('client', 'moderator', 'admin', 'super_admin');
CREATE TYPE ad_status AS ENUM ('draft', 'submitted', 'under_review', 'payment_pending', 'payment_submitted', 'payment_verified', 'scheduled', 'published', 'expired', 'rejected', 'archived');
CREATE TYPE payment_status AS ENUM ('pending', 'verified', 'rejected');

-- 2. Profiles (Extended Users table tied to auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role DEFAULT 'client',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Seller Profiles (Public metadata for clients)
CREATE TABLE seller_profiles (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    business_name TEXT,
    phone TEXT,
    city TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Packages
CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    duration_days INTEGER NOT NULL,
    weight INTEGER DEFAULT 1,
    is_featured BOOLEAN DEFAULT FALSE,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 6. Cities
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 7. Ads (Main Listing Record)
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

-- 8. Ad Media (External media references)
CREATE TABLE ad_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id UUID REFERENCES ads(id) ON DELETE CASCADE,
    source_type TEXT NOT NULL, -- 'youtube', 'image', 'github_raw', etc.
    original_url TEXT NOT NULL,
    thumbnail_url TEXT,
    validation_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Payments (Verification records)
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

-- 10. Audit Logs & Status History
CREATE TABLE ad_status_history (
    id SERIAL PRIMARY KEY,
    ad_id UUID REFERENCES ads(id) ON DELETE CASCADE,
    previous_status ad_status,
    new_status ad_status NOT NULL,
    changed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    note TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,
    target_type TEXT NOT NULL, -- 'ad', 'payment', 'user'
    target_id TEXT NOT NULL,
    old_value JSONB,
    new_value JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Utility text searching index for ads
CREATE INDEX idx_ads_status ON ads(status);
CREATE INDEX idx_ads_category ON ads(category_id);
CREATE INDEX idx_ads_city ON ads(city_id);

-- Optional Row Level Security (enable later or let backend handle with service role)
-- Do not enforce strictly without setting up properly across all clients
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
