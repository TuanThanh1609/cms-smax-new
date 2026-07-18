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
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    performance_metrics JSONB DEFAULT '{}'::jsonb,
    error_details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Safely add columns if they do not exist (for existing tables)
ALTER TABLE public.smax_tracking_events ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE public.smax_tracking_events ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE public.smax_tracking_events ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE public.smax_tracking_events ADD COLUMN IF NOT EXISTS performance_metrics JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.smax_tracking_events ADD COLUMN IF NOT EXISTS error_details JSONB DEFAULT '{}'::jsonb;

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
CREATE OR REPLACE FUNCTION public.smax_get_analytics(
    range_days INTEGER DEFAULT 30,
    filter_path TEXT DEFAULT NULL,
    filter_referrer TEXT DEFAULT NULL,
    filter_device TEXT DEFAULT NULL,
    filter_campaign TEXT DEFAULT NULL
)
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
    
    WITH filtered_events AS (
        SELECT *
        FROM public.smax_tracking_events
        WHERE created_at >= start_date 
          AND page_path NOT LIKE '%admin.html%'
          AND (filter_path IS NULL OR page_path = filter_path)
          AND (filter_referrer IS NULL OR COALESCE(NULLIF(referrer, ''), 'Direct') = filter_referrer)
          AND (filter_device IS NULL OR (
              CASE 
                WHEN user_agent ILIKE '%mobile%' OR user_agent ILIKE '%android%' OR user_agent ILIKE '%iphone%' THEN 'Mobile'
                ELSE 'Desktop'
              END = filter_device
          ))
          AND (filter_campaign IS NULL OR utm_campaign = filter_campaign)
    ),
    session_stats AS (
        SELECT 
            session_id,
            visitor_id,
            count(*) FILTER (WHERE event_name = 'page_view') as pv_count,
            count(*) FILTER (WHERE event_name = 'click') as click_count,
            COALESCE(max((event_data->>'duration_sec')::numeric) FILTER (WHERE event_name = 'heartbeat'), 0) as duration_sec
        FROM filtered_events
        GROUP BY session_id, visitor_id
    )
    SELECT jsonb_build_object(
        'summary', (
            SELECT jsonb_build_object(
                'total_pageviews', (SELECT count(*) FROM filtered_events WHERE event_name = 'page_view'),
                'total_visitors', count(DISTINCT visitor_id),
                'total_sessions', count(*),
                'total_clicks', (SELECT count(*) FROM filtered_events WHERE event_name = 'click'),
                'avg_duration_sec', COALESCE(round(avg(duration_sec)), 0),
                'bounce_rate_pct', COALESCE(round((count(*) FILTER (WHERE duration_sec < 10 AND pv_count < 2 AND click_count = 0)::numeric / NULLIF(count(*), 0)::numeric) * 100, 1), 0.0)
            )
            FROM session_stats
        ),
        'popular_pages', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT page_path, page_title, count(*) as count, count(DISTINCT visitor_id) as visitors
                FROM filtered_events
                WHERE event_name = 'page_view'
                GROUP BY page_path, page_title
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'referrers', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT COALESCE(NULLIF(referrer, ''), 'Direct') as referrer, count(*) as count
                FROM filtered_events
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
                FROM filtered_events
                WHERE event_name = 'click'
                GROUP BY text, tag, page_path
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'button_clicks', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    COALESCE(event_data->>'element_text', 'Không có text') as text, 
                    COALESCE(event_data->>'element_tag', 'ELEMENT') as tag,
                    page_path, 
                    count(*) as count
                FROM filtered_events
                WHERE event_name = 'button_click'
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
                FROM filtered_events
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
                FROM filtered_events
                WHERE event_name = 'page_view'
                GROUP BY date
                ORDER BY date ASC
            ) item
        ),
        'user_acquisition', (
            WITH first_events AS (
                SELECT DISTINCT ON (visitor_id) 
                    visitor_id, 
                    utm_source, 
                    utm_medium, 
                    utm_campaign
                FROM public.smax_tracking_events
                WHERE created_at >= start_date AND page_path NOT LIKE '%admin.html%'
                ORDER BY visitor_id, created_at ASC
            )
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    COALESCE(utm_source, 'Direct') as source, 
                    COALESCE(utm_medium, 'None') as medium, 
                    COALESCE(utm_campaign, 'None') as campaign,
                    count(*) as count
                FROM first_events
                GROUP BY source, medium, campaign
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'traffic_acquisition', (
            WITH session_sources AS (
                SELECT DISTINCT ON (session_id) 
                    session_id, 
                    utm_source, 
                    utm_medium, 
                    utm_campaign
                FROM filtered_events
                ORDER BY session_id, created_at ASC
            )
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    COALESCE(utm_source, 'Direct') as source, 
                    COALESCE(utm_medium, 'None') as medium, 
                    COALESCE(utm_campaign, 'None') as campaign,
                    count(*) as count
                FROM session_sources
                GROUP BY source, medium, campaign
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'cohort_retention', (
            WITH user_first_week AS (
                SELECT 
                    visitor_id,
                    date_trunc('week', min(created_at)) as first_week
                FROM public.smax_tracking_events
                WHERE created_at >= start_date - interval '42 days' AND page_path NOT LIKE '%admin.html%'
                GROUP BY visitor_id
            ),
            user_active_weeks AS (
                SELECT DISTINCT
                    visitor_id,
                    date_trunc('week', created_at) as active_week
                FROM public.smax_tracking_events
                WHERE created_at >= start_date AND page_path NOT LIKE '%admin.html%'
            )
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    to_char(f.first_week, 'YYYY-MM-DD') as cohort_week,
                    count(DISTINCT f.visitor_id) as cohort_size,
                    COALESCE(round(count(DISTINCT a.visitor_id) FILTER (WHERE a.active_week = f.first_week)::numeric / NULLIF(count(DISTINCT f.visitor_id), 0)::numeric * 100, 1), 100.0) as week_0,
                    COALESCE(round(count(DISTINCT a.visitor_id) FILTER (WHERE a.active_week = f.first_week + interval '1 week')::numeric / NULLIF(count(DISTINCT f.visitor_id), 0)::numeric * 100, 1), 0.0) as week_1,
                    COALESCE(round(count(DISTINCT a.visitor_id) FILTER (WHERE a.active_week = f.first_week + interval '2 week')::numeric / NULLIF(count(DISTINCT f.visitor_id), 0)::numeric * 100, 1), 0.0) as week_2,
                    COALESCE(round(count(DISTINCT a.visitor_id) FILTER (WHERE a.active_week = f.first_week + interval '3 week')::numeric / NULLIF(count(DISTINCT f.visitor_id), 0)::numeric * 100, 1), 0.0) as week_3,
                    COALESCE(round(count(DISTINCT a.visitor_id) FILTER (WHERE a.active_week = f.first_week + interval '4 week')::numeric / NULLIF(count(DISTINCT f.visitor_id), 0)::numeric * 100, 1), 0.0) as week_4
                FROM user_first_week f
                LEFT JOIN user_active_weeks a ON f.visitor_id = a.visitor_id
                GROUP BY cohort_week
                ORDER BY cohort_week DESC
                LIMIT 5
            ) item
        ),
        'event_counts', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    event_name,
                    count(*) as total_events,
                    count(DISTINCT visitor_id) as unique_visitors
                FROM filtered_events
                GROUP BY event_name
                ORDER BY total_events DESC
            ) item
        ),
        'outbound_clicks', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    COALESCE(event_data->>'destination_url', 'Không rõ') as destination_url,
                    COALESCE(event_data->>'link_text', 'Link ngoài') as link_text,
                    count(*) as count
                FROM filtered_events
                WHERE event_name = 'outbound_click'
                GROUP BY destination_url, link_text
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'file_downloads', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    COALESCE(event_data->>'file_url', 'Không rõ') as file_url,
                    COALESCE(event_data->>'file_name', 'Tập tin') as file_name,
                    count(*) as count
                FROM filtered_events
                WHERE event_name = 'file_download'
                GROUP BY file_url, file_name
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'broken_links', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT page_path, count(*) as count, count(DISTINCT visitor_id) as visitors
                FROM filtered_events
                WHERE event_name = 'page_view' AND (event_data->>'is_404')::boolean = true
                GROUP BY page_path
                ORDER BY count DESC
                LIMIT 10
            ) item
        ),
        'web_vitals', (
            SELECT jsonb_build_object(
                'avg_fcp', COALESCE(round(avg((performance_metrics->>'fcp_ms')::numeric)), 0),
                'avg_lcp', COALESCE(round(avg((performance_metrics->>'lcp_ms')::numeric)), 0),
                'avg_cls', COALESCE(round(avg((performance_metrics->>'cls')::numeric), 3), 0)
            )
            FROM filtered_events
            WHERE event_name = 'web_vitals'
        ),
        'js_errors', (
            SELECT COALESCE(jsonb_agg(item), '[]'::jsonb) FROM (
                SELECT 
                    error_details->>'message' as message, 
                    page_path, 
                    count(*) as count
                FROM filtered_events
                WHERE event_name = 'js_error'
                GROUP BY message, page_path
                ORDER BY count DESC
                LIMIT 5
            ) item
        ),
        'funnel', (
            SELECT jsonb_build_object(
                'step1_views', count(DISTINCT session_id) FILTER (WHERE event_name = 'page_view'),
                'step2_clicks', count(DISTINCT session_id) FILTER (WHERE event_name = 'click'),
                'step3_scroll50', count(DISTINCT session_id) FILTER (WHERE event_name = 'scroll' AND (event_data->>'depth_pct')::integer >= 50),
                'step4_scroll100', count(DISTINCT session_id) FILTER (WHERE event_name = 'scroll' AND (event_data->>'depth_pct')::integer = 100)
            )
            FROM filtered_events
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Restrict function execution to authenticated users only for security
REVOKE EXECUTE ON FUNCTION public.smax_get_analytics(INTEGER, TEXT, TEXT, TEXT, TEXT) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.smax_get_analytics(INTEGER, TEXT, TEXT, TEXT, TEXT) TO authenticated;
