-- Run on the target after any fresh database dump restore.
-- This keeps the cold standby independent from source Storage.

update public.site_content
set content_value = replace(
  content_value,
  'https://byxzjcypifhhgzyrzbfv.supabase.co/storage/v1/object/public/site_assets/',
  'https://nhmxdvvorcivvhoubjsa.supabase.co/storage/v1/object/public/site_assets/'
)
where content_value like '%https://byxzjcypifhhgzyrzbfv.supabase.co/storage/v1/object/public/site_assets/%';
