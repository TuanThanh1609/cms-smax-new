param(
  [string]$EnvFile = ".env.migration.local",
  [string]$OutputRoot = "tmp/supabase-mirror",
  [switch]$Execute
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ExpectedSourceRef = "byxzjcypifhhgzyrzbfv"
$ExpectedTargetRef = "nhmxdvvorcivvhoubjsa"

function Import-DotEnv([string]$Path) {
  if (-not (Test-Path -LiteralPath $Path)) {
    throw "Missing $Path. Copy scripts/supabase-mirror/migration.example.env to .env.migration.local and fill it locally."
  }

  foreach ($line in Get-Content -LiteralPath $Path) {
    if ($line -match '^\s*#' -or [string]::IsNullOrWhiteSpace($line)) { continue }
    if ($line -notmatch '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$') { continue }
    $name = $matches[1]
    $value = $matches[2].Trim()
    if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
      $value = $value.Substring(1, $value.Length - 2)
    }
    [Environment]::SetEnvironmentVariable($name, $value, 'Process')
  }
}

function Require-Env([string]$Name) {
  $value = [Environment]::GetEnvironmentVariable($Name, 'Process')
  if ([string]::IsNullOrWhiteSpace($value) -or $value -eq 'REPLACE_ME' -or $value.Contains(':REPLACE_ME@')) {
    throw "Missing or placeholder value for $Name in $EnvFile."
  }
  return $value
}

function Parse-PostgresUrl([string]$Value) {
  $uri = [Uri]$Value
  if ($uri.Scheme -notin @('postgres', 'postgresql')) { throw "Expected a postgres/postgresql URL." }
  $parts = $uri.UserInfo.Split(':', 2)
  if ($parts.Count -ne 2) { throw "Database URL must include username and password." }
  return [pscustomobject]@{
    Host = $uri.Host
    Port = if ($uri.Port -gt 0) { $uri.Port } else { 5432 }
    User = [Uri]::UnescapeDataString($parts[0])
    Password = [Uri]::UnescapeDataString($parts[1])
    Database = $uri.AbsolutePath.TrimStart('/')
  }
}

function Invoke-PgCommand([string]$Tool, [object]$Connection, [string[]]$Arguments) {
  $previousPassword = $env:PGPASSWORD
  $previousSslMode = $env:PGSSLMODE
  try {
    $env:PGPASSWORD = $Connection.Password
    $env:PGSSLMODE = 'require'
    & $Tool '-h' $Connection.Host '-p' $Connection.Port '-U' $Connection.User '-d' $Connection.Database @Arguments
    if ($LASTEXITCODE -ne 0) { throw "$Tool failed with exit code $LASTEXITCODE." }
  } finally {
    $env:PGPASSWORD = $previousPassword
    $env:PGSSLMODE = $previousSslMode
  }
}

Import-DotEnv $EnvFile

$sourceRef = Require-Env 'SOURCE_PROJECT_REF'
$targetRef = Require-Env 'TARGET_PROJECT_REF'
$sourceDbUrl = Require-Env 'SOURCE_DB_URL'
$targetDbUrl = Require-Env 'TARGET_DB_URL'

if ($sourceRef -ne $ExpectedSourceRef) { throw "SOURCE_PROJECT_REF must be $ExpectedSourceRef." }
if ($targetRef -ne $ExpectedTargetRef) { throw "TARGET_PROJECT_REF must be $ExpectedTargetRef." }
if (-not $sourceDbUrl.Contains($ExpectedSourceRef)) { throw "SOURCE_DB_URL does not point to the expected source project." }
if (-not $targetDbUrl.Contains($ExpectedTargetRef)) { throw "TARGET_DB_URL does not point to the expected target project." }

$localPgDump = Join-Path (Get-Location) 'tmp/pg17/bin/pg_dump.exe'
$localPsql = Join-Path (Get-Location) 'tmp/pg17/bin/psql.exe'
$pgDump = Get-Command pg_dump -ErrorAction SilentlyContinue
$psql = Get-Command psql -ErrorAction SilentlyContinue
if (-not $pgDump -and (Test-Path -LiteralPath $localPgDump)) { $pgDump = Get-Item -LiteralPath $localPgDump }
if (-not $psql -and (Test-Path -LiteralPath $localPsql)) { $psql = Get-Item -LiteralPath $localPsql }
if (-not $pgDump -or -not $psql) {
  throw "PostgreSQL 17 client tools are required (pg_dump and psql). Install PostgreSQL 17 client tools, then rerun."
}

$source = Parse-PostgresUrl $sourceDbUrl
$target = Parse-PostgresUrl $targetDbUrl
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$outputDir = Join-Path $OutputRoot $timestamp
$publicDump = Join-Path $outputDir 'public.sql'
$authDump = Join-Path $outputDir 'auth-users.sql'
$failoverSql = Join-Path (Get-Location) 'scripts/supabase-mirror/post-restore-failover.sql'

Write-Host "Source: $sourceRef"
Write-Host "Target: $targetRef"
Write-Host "Output: $outputDir"
Write-Host "Secrets are loaded but will not be printed."

if (-not $Execute) {
  Write-Host "Preflight passed. Rerun with -Execute to dump source and restore the empty target."
  exit 0
}

New-Item -ItemType Directory -Path $outputDir -Force | Out-Null

$targetState = & {
  $previousPassword = $env:PGPASSWORD
  $previousSslMode = $env:PGSSLMODE
  try {
    $env:PGPASSWORD = $target.Password
    $env:PGSSLMODE = 'require'
    & $psql.Source '-h' $target.Host '-p' $target.Port '-U' $target.User '-d' $target.Database '-Atqc' "SELECT (SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE') || '|' || (SELECT count(*) FROM auth.users) || '|' || (SELECT count(*) FROM storage.objects) || '|' || (SELECT count(*) FROM storage.buckets WHERE id='site_assets');"
    if ($LASTEXITCODE -ne 0) { throw "Target preflight query failed." }
  } finally {
    $env:PGPASSWORD = $previousPassword
    $env:PGSSLMODE = $previousSslMode
  }
}

if ($targetState.Trim() -ne '9|1|299|1') {
  throw "Target does not match the prepared cold-standby state (public tables|auth users|storage objects|site_assets buckets = $($targetState.Trim()), expected 9|1|299|1). Refusing to overwrite it."
}

Write-Host "Dumping public schema and data from source..."
Invoke-PgCommand $pgDump.Source $source @(
  '--format=plain', '--clean', '--if-exists', '--quote-all-identifiers', '--no-owner',
  '--schema=public', "--file=$publicDump"
)

Write-Host "Dumping password-bearing Auth user data from source..."
Invoke-PgCommand $pgDump.Source $source @(
  '--format=plain', '--data-only', '--table=auth.users', '--table=auth.identities', '--table=auth.mfa_factors',
  '--use-copy', '--no-owner', "--file=$authDump"
)

Write-Host "Restoring public schema and data to target..."
Invoke-PgCommand $psql.Source $target @('--single-transaction', '--set=ON_ERROR_STOP=1', "--file=$publicDump")

Write-Host "Rewriting restored Storage URLs for the target..."
Invoke-PgCommand $psql.Source $target @('--single-transaction', '--set=ON_ERROR_STOP=1', "--file=$failoverSql")

Write-Host "Replacing the emergency Auth user with the original password hash..."
Invoke-PgCommand $psql.Source $target @(
  '--single-transaction', '--set=ON_ERROR_STOP=1',
  '--command=TRUNCATE TABLE auth.users CASCADE;',
  '--command=SET session_replication_role = replica;', "--file=$authDump"
)

Write-Host "Database and Auth restore completed. The emergency password is now invalid; use the original source password. Dumps remain under $outputDir for verification and rollback evidence."
