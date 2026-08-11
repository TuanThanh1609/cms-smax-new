# Supabase cold-standby status

Last verified: 2026-08-10 15:25 (Asia/Saigon)

## Projects

- Source: `byxzjcypifhhgzyrzbfv` (`demo-game`) - preserved and read-only during this migration.
- Target: `nhmxdvvorcivvhoubjsa` (`project smax web`) - active cold standby.

## Verified target state

- Public database catalog matches the source: 9 tables, 73 columns, 18 constraints, 19 indexes, 3 identity sequences, 13 RLS policies, and 2 `smax_get_analytics` overloads.
- The analytics function bodies and grants match the source. Target-only `search_path = public, pg_temp` hardening removes the mutable-search-path warning without changing application behavior.
- Public snapshot time: `2026-08-10T08:25:26.636Z` (`15:25:26` Asia/Saigon).
- Public rows: 25,958 total.
  - `channel_platform_fees`: 111
  - `kpi_targets`: 111
  - `site_content`: 3,418
  - `smax_tracking_events`: 22,318
  - Remaining five tables: 0
- Storage: public bucket `site_assets`, 299 objects, 23,774,160 bytes. All 299 target objects pass SHA-256 verification against the refreshed source snapshot.
- Storage policies: 3, matching the source.
- CMS Storage URLs: 176 target references, 0 source references.
- Auth: exact source user and identity restored, including the original user ID and password hash. Full-row, identity-row, and password-hash comparisons all pass. Sessions and refresh tokens were intentionally not copied.
- Auth login email: `tuannt160990@gmail.com`; the existing source password remains the password for the target. Plaintext passwords cannot be recovered from a password hash.
- Edge Functions: `sync-orders` is retired on the target with a JWT-protected `410 Gone` handler because `order_biluxury` is not used. All temporary migration functions are also disabled JWT-protected handlers; unauthenticated calls return 401.
- Cron: 0 target jobs. The source five-minute job is intentionally not enabled on standby.
- Realtime publication tables: 0, matching source inventory.
- Extensions: source set present; target `pg_net` is the platform default 0.20.4 instead of source 0.19.5.
- Target Data API smoke test: HTTP 200 using the publishable key.

## Deployment state

- Production security deployment: `dpl_CfJEtKiLJHUNUp2Wvf7NGJzNqrRY` (`READY`).
- Production aliases `https://portal.smax.ai` and `https://newweb-smax.vercel.app` return 200 for the site and 404 for `/supabase-config.json`; the leaked `service_role` is no longer served.
- Standby preview: `https://newweb-smax-6aavc2d7z-tuan-smaxs-projects.vercel.app` (`dpl_By5hp4RAD5b7wY1FdD7JQVNRvhSF`, `READY`).
- Standby preview `/supabase-config.json` points to the target and contains only an `sb_publishable_*` key. Main and Admin pages return 200 with no source project ref.

## Remaining operational work

1. Rotate the source legacy service-role/JWT key because it was publicly exposed before remediation.
2. Enable leaked-password protection in target Auth if the plan supports it. The remaining `SECURITY DEFINER` advisor warnings match the source's intentional authenticated analytics access.
3. If the original password is unknown, use a password-reset flow; do not replace the preserved password hash merely to disclose a new password.
4. This is a point-in-time cold snapshot, not continuous replication. Run a refresh before failover if the source remains available and has received new writes.

The exact catalog/Auth migration no longer requires privileged database URLs. The prepared database-URL runner remains available as a future independent full-dump recovery path.
