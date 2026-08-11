import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const sourceUsersPath = path.resolve(process.argv[2] || 'tmp/supabase-mirror/source-auth-metadata/users.json');
const outputRoot = path.resolve(process.argv[3] || 'tmp/supabase-mirror/target-emergency-auth');
const targetRef = 'nhmxdvvorcivvhoubjsa';
const endpoint = process.env.MIRROR_AUTH_ENDPOINT || `https://${targetRef}.supabase.co/functions/v1/mirror-emergency-auth`;
const token = process.env.MIRROR_AUTH_TOKEN || '';
const publishableKey = process.env.TARGET_PUBLISHABLE_KEY || '';

if (!token) throw new Error('MIRROR_AUTH_TOKEN is required.');
if (!publishableKey) throw new Error('TARGET_PUBLISHABLE_KEY is required.');
const sourceUsers = JSON.parse(fs.readFileSync(sourceUsersPath, 'utf8'));
if (!Array.isArray(sourceUsers) || sourceUsers.length !== 1 || !sourceUsers[0]?.email) {
  throw new Error('Expected exactly one source Auth user with an email address.');
}

const sourceUser = sourceUsers[0];
const password = `${crypto.randomBytes(24).toString('base64url')}Aa1!`;
const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-mirror-token': token,
  },
  body: JSON.stringify({
    email: sourceUser.email,
    password,
    user_metadata: sourceUser.user_metadata || {},
    app_metadata: sourceUser.app_metadata || {},
  }),
});

if (!response.ok) throw new Error(`Emergency Auth creation failed: ${response.status} ${(await response.text()).slice(0, 500)}`);
const result = await response.json();
if (!result?.user_id) throw new Error('Emergency Auth endpoint did not return a user ID.');

const loginResponse = await fetch(`https://${targetRef}.supabase.co/auth/v1/token?grant_type=password`, {
  method: 'POST',
  headers: {
    apikey: publishableKey,
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email: sourceUser.email, password }),
});
if (!loginResponse.ok) throw new Error(`Emergency Auth login verification failed: ${loginResponse.status}`);
const loginResult = await loginResponse.json();
if (loginResult?.user?.id !== result.user_id || !loginResult?.access_token) {
  throw new Error('Emergency Auth login returned an unexpected user or no access token.');
}

fs.mkdirSync(outputRoot, { recursive: true });
const outputPath = path.join(outputRoot, 'login.env');
fs.writeFileSync(outputPath, [
  `SUPABASE_URL=https://${targetRef}.supabase.co`,
  `EMAIL=${sourceUser.email}`,
  `PASSWORD=${password}`,
  `USER_ID=${result.user_id}`,
  'AUTH_MODE=emergency-recreated-user-not-original-password-hash',
  '',
].join('\n'));
console.log(`Emergency Auth user created and password login verified. Credentials saved locally to ${outputPath}.`);
