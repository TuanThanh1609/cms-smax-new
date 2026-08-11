import fs from 'node:fs';
import path from 'node:path';

const inputPath = path.resolve(
  process.argv[2] || 'tmp/supabase-mirror/source-privileged/auth-export.json',
);
const outputPath = path.resolve(
  process.argv[3] || 'tmp/supabase-mirror/source-privileged/auth-import.sql',
);

const payload = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

if (payload.project_ref !== 'byxzjcypifhhgzyrzbfv') {
  throw new Error(`Unexpected source project: ${payload.project_ref}`);
}
if (!Array.isArray(payload.users) || payload.users.length !== 1) {
  throw new Error(`Expected exactly one source Auth user, found ${payload.users?.length ?? 'invalid'}`);
}
if (!Array.isArray(payload.identities) || payload.identities.length !== 1) {
  throw new Error(`Expected exactly one source identity, found ${payload.identities?.length ?? 'invalid'}`);
}
if (!Array.isArray(payload.mfa_factors) || payload.mfa_factors.length !== 0) {
  throw new Error('This prepared import expects no MFA factors. Review manually before continuing.');
}

function dollarQuote(value, baseTag) {
  let tag = baseTag;
  while (value.includes(`$${tag}$`)) tag += '_x';
  return `$${tag}$${value}$${tag}$`;
}

const userJson = dollarQuote(JSON.stringify(payload.users[0]), 'codex_auth_user');
const identityJson = dollarQuote(JSON.stringify(payload.identities[0]), 'codex_auth_identity');

const sql = `-- Generated from an ignored local source export. Contains sensitive Auth data.
-- Do not commit, print, or paste this file.
begin;

truncate table auth.users cascade;

with src as (
  select ${userJson}::jsonb as j
)
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at,
  recovery_token, recovery_sent_at, email_change_token_new, email_change,
  email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
  is_super_admin, created_at, updated_at, phone, phone_confirmed_at,
  phone_change, phone_change_token, phone_change_sent_at,
  email_change_token_current, email_change_confirm_status, banned_until,
  reauthentication_token, reauthentication_sent_at, is_sso_user,
  deleted_at, is_anonymous
)
select
  nullif(j->>'instance_id', '')::uuid,
  (j->>'id')::uuid,
  j->>'aud',
  j->>'role',
  j->>'email',
  j->>'encrypted_password',
  nullif(j->>'email_confirmed_at', '')::timestamptz,
  nullif(j->>'invited_at', '')::timestamptz,
  j->>'confirmation_token',
  nullif(j->>'confirmation_sent_at', '')::timestamptz,
  j->>'recovery_token',
  nullif(j->>'recovery_sent_at', '')::timestamptz,
  j->>'email_change_token_new',
  j->>'email_change',
  nullif(j->>'email_change_sent_at', '')::timestamptz,
  nullif(j->>'last_sign_in_at', '')::timestamptz,
  j->'raw_app_meta_data',
  j->'raw_user_meta_data',
  nullif(j->>'is_super_admin', '')::boolean,
  nullif(j->>'created_at', '')::timestamptz,
  nullif(j->>'updated_at', '')::timestamptz,
  j->>'phone',
  nullif(j->>'phone_confirmed_at', '')::timestamptz,
  j->>'phone_change',
  j->>'phone_change_token',
  nullif(j->>'phone_change_sent_at', '')::timestamptz,
  j->>'email_change_token_current',
  nullif(j->>'email_change_confirm_status', '')::smallint,
  nullif(j->>'banned_until', '')::timestamptz,
  j->>'reauthentication_token',
  nullif(j->>'reauthentication_sent_at', '')::timestamptz,
  coalesce((j->>'is_sso_user')::boolean, false),
  nullif(j->>'deleted_at', '')::timestamptz,
  coalesce((j->>'is_anonymous')::boolean, false)
from src;

with src as (
  select ${identityJson}::jsonb as j
)
insert into auth.identities (
  provider_id, user_id, identity_data, provider,
  last_sign_in_at, created_at, updated_at, id
)
select
  j->>'provider_id',
  (j->>'user_id')::uuid,
  j->'identity_data',
  j->>'provider',
  nullif(j->>'last_sign_in_at', '')::timestamptz,
  nullif(j->>'created_at', '')::timestamptz,
  nullif(j->>'updated_at', '')::timestamptz,
  (j->>'id')::uuid
from src;

commit;
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sql, { encoding: 'utf8', mode: 0o600 });

console.log(JSON.stringify({
  output: outputPath,
  users: payload.users.length,
  identities: payload.identities.length,
  mfaFactors: payload.mfa_factors.length,
}));
