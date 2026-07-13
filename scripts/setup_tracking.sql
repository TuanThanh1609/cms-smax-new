-- SQL Script: Setup User Tracking for Smax.ai Website
-- Run this script inside the Supabase SQL Editor

-- 1. Create tracking events table
CREATE TABLE IF NOT EXISTS public.smax_tracking_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    page_path TEXT NOT NULL,
    page_title TEXT NOT NULL,
    referrer TEXT,
    event_data JSONB DEFAULT '{}'::jsonb,
    user_agent TEXT,
    screen_width INTEGER,
    screen_height INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.smax_tracking_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent errors during re-runs
DROP POLICY IF EXISTS "Allow public inserts" ON public.smax_tracking_events;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.smax_tracking_events;

-- Policy: Allow inserts for everyone (including anonymous website visitors)
CREATE POLICY "Allow public inserts" 
ON public.smax_tracking_events 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy: Allow select for authenticated users (admin dashboard)
CREATE POLICY "Allow authenticated select" 
ON public.smax_tracking_events 
FOR SELECT 
TO authenticated 
USING (true);

-- 3. Create database indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_smax_events_name_path ON public.smax_tracking_events(event_name, page_path);
CREATE INDEX IF NOT EXISTS idx_smax_events_created_at ON public.smax_tracking_events(created_at);

-- 4. Create aggregation function with built-in 90-day cleanup
CREATE OR REPLACE FUNCTION public.smax_get_analytics(range_days INTEGER DEFAULT 30)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
    start_date TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Auto-cleanup old data older than 90 days
    DELETE FROM public.smax_tracking_events 
    WHERE created_at < now() - INTERVAL '90 days';
    
    -- Calculate start date based on range_days parameter
    start_date := now() - (range_days || ' days')::INTERVAL;
    
    SELECT jsonb_build_object(
        'summary', (
            SELECT jsonb_build_object(
                'total_pageviews', count(*),
                'total_visitors', count(DISTINCT visitor_id),
                'total_sessions', count(DISTINCT session_id),
                'total_clicks', count(*) FILTER (WHERE event_name = 'click')
            )
            FROM public.smax_tracking_events
            WHERE created_at >= start_date
        ),
        'popular_pages', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT page_path, page_title, count(*) as count, count(DISTINCT visitor_id) as visitors
                FROM public.smax_tracking_events
                WHERE event_name = 'page_view' AND created_at >= start_date
                GROUP BY page_path, page_title
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'referrers', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT COALESCE(NULLIF(referrer, ''), 'Direct') as referrer, count(*) as count
                FROM public.smax_tracking_events
                WHERE created_at >= start_date
                GROUP BY referrer
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'clicks', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    COALESCE(event_data->>'element_text', 'Không có text') as text, 
                    COALESCE(event_data->>'element_tag', 'ELEMENT') as tag,
                    page_path, 
                    count(*) as count
                FROM public.smax_tracking_events
                WHERE event_name = 'click' AND created_at >= start_date
                GROUP BY text, tag, page_path
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'devices', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    CASE 
                        WHEN user_agent ILIKE '%mobile%' OR user_agent ILIKE '%android%' OR user_agent ILIKE '%iphone%' THEN 'Mobile'
                        ELSE 'Desktop'
                    END as device,
                    count(*) as count
                FROM public.smax_tracking_events
                WHERE created_at >= start_date
                GROUP BY device
            ) item
        ),
        'views_over_time', (
            -- Daily page views and visitors
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD') as date, 
                    count(*) as views, 
                    count(DISTINCT visitor_id) as visitors
                FROM public.smax_tracking_events
                WHERE created_at >= start_date
                GROUP BY date
                ORDER BY date ASC
            ) item
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Restrict function execution to authenticated users only for security
REVOKE EXECUTE ON FUNCTION public.smax_get_analytics(INTEGER) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.smax_get_analytics(INTEGER) TO authenticated;
