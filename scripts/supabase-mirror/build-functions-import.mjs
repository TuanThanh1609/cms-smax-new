import fs from 'node:fs';
import path from 'node:path';

const inputPath = path.resolve(
  process.argv[2] || 'tmp/supabase-mirror/source-privileged/schema-access.json',
);
const outputPath = path.resolve(
  process.argv[3] || 'tmp/supabase-mirror/source-privileged/functions-import.sql',
);

const access = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
if (access.project_ref !== 'byxzjcypifhhgzyrzbfv' || access.functions.length !== 2) {
  throw new Error('Unexpected source function export.');
}

function quoteIdent(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

const routineGrantees = new Map();
for (const grant of access.routine_grants) {
  if (grant.grantee === 'postgres') continue;
  if (!routineGrantees.has(grant.routine_name)) routineGrantees.set(grant.routine_name, new Set());
  routineGrantees.get(grant.routine_name).add(grant.grantee);
}

const lines = ['begin;', ''];
for (const fn of access.functions) {
  const signature = `public.${quoteIdent(fn.name)}(${fn.identity_arguments})`;
  lines.push(fn.definition.trimEnd() + ';');
  lines.push(`alter function ${signature} owner to ${quoteIdent(fn.owner)};`);
  lines.push(`revoke all on function ${signature} from PUBLIC;`);
  for (const grantee of routineGrantees.get(fn.name) || []) {
    lines.push(`grant execute on function ${signature} to ${quoteIdent(grantee)};`);
  }
  lines.push('');
}
lines.push('commit;', '');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, lines.join('\n'), { encoding: 'utf8', mode: 0o600 });
console.log(JSON.stringify({ output: outputPath, functions: access.functions.length }));
