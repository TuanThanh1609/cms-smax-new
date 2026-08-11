import fs from 'node:fs';
import path from 'node:path';

const inputPath = path.resolve(
  process.argv[2] || 'tmp/supabase-mirror/source-privileged/auth-export.json',
);
const outputPath = path.resolve(
  process.argv[3] || 'tmp/supabase-mirror/source-privileged/auth-verify.sql',
);

const payload = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
if (payload.project_ref !== 'byxzjcypifhhgzyrzbfv' || payload.users.length !== 1 || payload.identities.length !== 1) {
  throw new Error('Unexpected source Auth export.');
}

function dollarQuote(value, baseTag) {
  let tag = baseTag;
  while (value.includes(`$${tag}$`)) tag += '_x';
  return `$${tag}$${value}$${tag}$`;
}

const user = dollarQuote(JSON.stringify(payload.users[0]), 'codex_expected_user');
const identity = dollarQuote(JSON.stringify(payload.identities[0]), 'codex_expected_identity');

const sql = `with expected as (
  select ${user}::jsonb as source_user,
         ${identity}::jsonb as source_identity
), actual as (
  select
    (select to_jsonb(u) from auth.users u limit 1) as target_user,
    (select to_jsonb(i) from auth.identities i limit 1) as target_identity
)
select
  (select count(*) from auth.users) as users,
  (select count(*) from auth.identities) as identities,
  (select count(*) from auth.sessions) as sessions,
  (select count(*) from auth.refresh_tokens) as refresh_tokens,
  (actual.target_user->>'id') = (expected.source_user->>'id') as user_id_matches,
  (actual.target_user->>'email') = (expected.source_user->>'email') as email_matches,
  (actual.target_user->>'encrypted_password') = (expected.source_user->>'encrypted_password') as password_hash_matches,
  (actual.target_user - 'confirmed_at') = (expected.source_user - 'confirmed_at') as user_row_matches,
  (actual.target_identity - 'email') = (expected.source_identity - 'email') as identity_row_matches
from expected cross join actual;
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, sql, { encoding: 'utf8', mode: 0o600 });
console.log(JSON.stringify({ output: outputPath }));
