param(
  [string]$ComposeFile = "infra/docker-compose.yml"
)

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

$backendEnvExample = Test-Path "backend/.env.example"
$frontendEnvExample = Test-Path "frontend/.env.example"

$gitignoreText = Get-Content ".gitignore" -Raw
$gitignoreHasDotEnv = $gitignoreText -match "(?m)^\.env$"
$gitignoreHasVenv = $gitignoreText -match "(?m)^(\.venv/|\.venv)$"

$trackedEnvFiles = git ls-files "*.env" | Where-Object { $_ -ne $null -and $_.Trim() -ne "" }
$trackedEnvCount = @($trackedEnvFiles).Count

$trackedEnvExamples = git ls-files "*.env.example" | Where-Object { $_ -ne $null -and $_.Trim() -ne "" }
$trackedEnvExampleCount = @($trackedEnvExamples).Count

$composeConfig = docker compose -f $ComposeFile config
$composeText = ($composeConfig | Out-String)
$composeHasRestart = $composeText -match "(?m)^\s*restart:\s+"
$composeHasHealthcheck = $composeText -match "(?m)^\s*healthcheck:\s*"

$composePs = docker compose -f $ComposeFile ps
$composePsText = ($composePs | Out-String)
$composeHasHealthy = $composePsText -match "healthy|Up"

Write-Output "BACKEND_ENV_EXAMPLE=$backendEnvExample"
Write-Output "FRONTEND_ENV_EXAMPLE=$frontendEnvExample"
Write-Output "GITIGNORE_HAS_DOTENV=$gitignoreHasDotEnv"
Write-Output "GITIGNORE_HAS_VENV=$gitignoreHasVenv"
Write-Output "TRACKED_ENV_FILES=$trackedEnvCount"
Write-Output "TRACKED_ENV_EXAMPLE_FILES=$trackedEnvExampleCount"
Write-Output "COMPOSE_HAS_RESTART=$composeHasRestart"
Write-Output "COMPOSE_HAS_HEALTHCHECK=$composeHasHealthcheck"
Write-Output "COMPOSE_PS_HAS_HEALTHY_OR_UP=$composeHasHealthy"

if (
  $backendEnvExample -and
  $frontendEnvExample -and
  $gitignoreHasDotEnv -and
  $gitignoreHasVenv -and
  $trackedEnvCount -eq 0 -and
  $trackedEnvExampleCount -ge 2 -and
  $composeHasRestart -and
  $composeHasHealthcheck
) {
  Write-Output "DAY10_RELIABILITY_VERIFY=PASS"
  exit 0
}

Write-Output "DAY10_RELIABILITY_VERIFY=FAIL"
exit 1
