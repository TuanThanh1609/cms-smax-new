-- ==========================================
-- SMAX.AI CMS DATABASE SCHEMA
-- Copy-paste this SQL into the Supabase SQL Editor
-- ==========================================

-- 1. Create table site_content
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_name VARCHAR(100) NOT NULL,
    content_key VARCHAR(100) UNIQUE NOT NULL,
    content_value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 2. Configure RLS Policies

-- Policy 1: Allow public read access to all rows (Anonymous and authenticated)
CREATE POLICY "Allow public read access" 
ON public.site_content 
FOR SELECT 
USING (true);

-- Policy 2: Allow authenticated users (Admin) to insert/update/delete rows
CREATE POLICY "Allow admin write access" 
ON public.site_content 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 3. Insert some default homepage data for testing (Optional)
INSERT INTO public.site_content (page_name, content_key, content_value)
VALUES 
('index', 'hero-title', 'Smax.ai | AI-Automation cho bán hàng đa kênh'),
('index', 'hero-sub', 'Nền tảng AI-Automation giúp doanh nghiệp vận hành bán hàng, tiếp thị và chăm sóc khách hàng đa kênh tự động.')
ON CONFLICT (content_key) DO NOTHING;
