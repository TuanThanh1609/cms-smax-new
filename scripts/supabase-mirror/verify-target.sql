SELECT * FROM (VALUES
  ('channel_platform_fees', (SELECT count(*)::bigint FROM public.channel_platform_fees), 111::bigint),
  ('facebook_users', (SELECT count(*)::bigint FROM public.facebook_users), 0::bigint),
  ('game_scores', (SELECT count(*)::bigint FROM public.game_scores), 0::bigint),
  ('kpi_targets', (SELECT count(*)::bigint FROM public.kpi_targets), 111::bigint),
  ('monthly_expenses', (SELECT count(*)::bigint FROM public.monthly_expenses), 0::bigint),
  ('player_sessions', (SELECT count(*)::bigint FROM public.player_sessions), 0::bigint),
  ('referrals', (SELECT count(*)::bigint FROM public.referrals), 0::bigint),
  ('site_content', (SELECT count(*)::bigint FROM public.site_content), 3418::bigint),
  ('smax_tracking_events', (SELECT count(*)::bigint FROM public.smax_tracking_events), 22318::bigint)
) AS counts(table_name, actual_rows, snapshot_rows)
ORDER BY table_name;

SELECT
  (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') AS public_tables,
  (SELECT count(*) FROM auth.users) AS auth_users,
  (SELECT count(*) FROM auth.identities) AS auth_identities,
  (SELECT count(*) FROM storage.buckets) AS storage_buckets,
  (SELECT count(*) FROM storage.objects) AS storage_objects,
  (SELECT coalesce(sum((metadata->>'size')::bigint), 0) FROM storage.objects) AS storage_bytes,
  (SELECT count(*) FROM pg_policies WHERE schemaname = 'public') AS public_policies,
  (SELECT count(*) FROM pg_policies WHERE schemaname = 'storage') AS storage_policies,
  (SELECT count(*) FROM pg_constraint c JOIN pg_class t ON t.oid = c.conrelid JOIN pg_namespace n ON n.oid = t.relnamespace WHERE n.nspname = 'public') AS public_constraints,
  (SELECT count(*) FROM pg_indexes WHERE schemaname = 'public') AS public_indexes,
  (SELECT count(*) FROM pg_sequences WHERE schemaname = 'public') AS public_sequences,
  (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace WHERE n.nspname = 'public' AND p.proname = 'smax_get_analytics') AS analytics_functions,
  (SELECT count(*) FROM pg_publication_tables WHERE pubname = 'supabase_realtime') AS realtime_tables,
  (SELECT count(*) FROM cron.job) AS cron_jobs,
  (SELECT count(*) FROM public.site_content WHERE content_value LIKE '%byxzjcypifhhgzyrzbfv%') AS source_storage_refs,
  (SELECT count(*) FROM public.site_content WHERE content_value LIKE '%nhmxdvvorcivvhoubjsa.supabase.co/storage/v1/object/public/site_assets/%') AS target_storage_refs;

SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
ORDER BY name;

SELECT extname, extversion
FROM pg_extension
WHERE extname IN ('pg_cron', 'pg_net', 'pg_stat_statements', 'pgcrypto', 'plpgsql', 'supabase_vault', 'uuid-ossp')
ORDER BY extname;
