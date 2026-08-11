# Supabase cold-standby mirror

Source: `byxzjcypifhhgzyrzbfv` (`demo-game`)

Target: `nhmxdvvorcivvhoubjsa` (`project smax web`)

This workflow preserves the source and writes only to the empty target. It intentionally does not create or enable the source cron job on the target, so the standby cannot call external systems every five minutes.

## Current verified inventory

- Source database: about 250 MB.
- Source public data snapshot: 9 tables and exactly 25,958 rows at the final export time (`2026-08-10T08:25:26.636Z`).
- Source Auth: 1 user and 1 identity.
- Source Storage: public bucket `site_assets`, 299 objects, about 22.7 MiB.
- Source Edge Function: `sync-orders`, JWT verification enabled.
- Source extensions missing from a fresh target: `pg_net` and `pg_cron`.
- Target was verified empty before preparation; it now contains the source-matching public catalog and the full REST-readable data snapshot.
- Target Storage now contains the complete `site_assets` copy: 299 objects and 23,774,160 bytes, verified against the source SHA-256 manifest.
- Target `site_content` has 176 Storage URLs rewritten to the target; zero source project references remain in that table.
- Target Auth public settings match the source. The exact source Auth user and identity are restored, including the source user ID and password hash; the earlier emergency credential was invalidated by this replacement.

The target already has `pg_net` and `pg_cron` enabled. `sync-orders` was retired with a JWT-protected `410 Gone` handler because `order_biluxury` is not used; the target therefore does not require `SMAX_URL`, `SMAX_TOKEN`, that table, or a cron schedule.

The source public data that is readable through the existing anon configuration can be snapshotted with:

```powershell
node scripts/supabase-mirror/download-source-public-data.mjs .env.local
```

The manifest treats the previously verified source row counts as minimums, then requires the exported count to match the current exact REST count. This allows append-only tracking data to grow without producing a false incomplete warning. The snapshot is evidence and emergency recovery material, not a substitute for the privileged database/Auth dump.

## Credentials

The primary catalog/Auth mirror is complete without database URLs. For a future independent full-dump recovery path, fill the two Session pooler database URLs in the already-created repository-root `.env.migration.local`. Service-role keys are only needed for a future direct Storage refresh. The populated local file is ignored by Git.

Do not paste secrets into chat, source files, commits, or command output.

## Database and Auth

PostgreSQL 17.10 client tools have been prepared under the ignored `tmp/pg17/bin` directory. The runner uses them automatically when they are not available globally. Run a safe preflight first:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/supabase-mirror/run-database-mirror.ps1
```

When preflight passes, execute:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/supabase-mirror/run-database-mirror.ps1 -Execute
```

The script refuses to continue unless the target still matches the prepared state: 9 public tables, exactly one emergency Auth user, and the already-verified 299 objects in `site_assets`. The privileged source dump uses `--clean` to replace the reconstructed public schema with the exact source schema. It then reapplies target Storage URLs, truncates the emergency Auth user with its dependent sessions, and restores the original `auth.users`, `auth.identities`, and MFA-factor rows, including the source password hash while preserving the target's managed Auth schema migrations.

## Storage

An independent source snapshot can be created immediately from the existing public bucket configuration:

```powershell
node scripts/supabase-mirror/download-source-storage.mjs .env.local
```

It writes the 299 objects and a SHA-256 manifest under the ignored `tmp/supabase-mirror/source-storage` directory.

For the initial mirror, the snapshot was uploaded through a short-lived, randomly authenticated Edge Function. The endpoint is redeployed as a disabled `410 Gone` handler immediately after object-count and byte-count verification.

The initial Storage copy is already complete. The direct copier below is retained only for a future refresh after both service keys are available:

```powershell
node scripts/supabase-mirror/copy-storage.mjs .env.migration.local
```

The Storage copier creates missing buckets, preserves public/private configuration and MIME/cache metadata, uploads with upsert, retries failures, and verifies object counts. It never deletes source files.

## Verification and failover

Run `verify-target.sql` against the target and compare its output to the source inventory. The exact password-hash comparison now passes. Existing user passwords are not recoverable as plaintext; the same source password applies to the target, while old sessions/tokens are intentionally invalid on the new project.

The target Storage URLs have already been rewritten. After any future exact database restore, run `post-restore-failover.sql` to apply the rewrite again. `target-failover.example.env` contains the browser-safe target URL and publishable key.

The build and Sites worker now reject privileged JWTs from browser configuration. A prior generated `public/supabase-config.json` contained a `service_role` JWT and was removed locally and from production; both production aliases now return `404` for that path. Rotate the source service-role key before treating the source project as secure.

A target-backed standby preview is live at `https://newweb-smax-6aavc2d7z-tuan-smaxs-projects.vercel.app`. It returns only the target publishable key, has no source project references in its built static output, and its target Auth password login is verified. Do not promote it to production unless failover is intended. Configure target function secrets and resolve the missing `public.order_biluxury` dependency before enabling `sync-orders` or its cron.
