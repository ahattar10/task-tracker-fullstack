param(
  [string]$RepoRoot = ""
)

if ([string]::IsNullOrWhiteSpace($RepoRoot)) {
  $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

Set-Location $RepoRoot

$nodeDir = Get-ChildItem ".tools/node" -Directory -ErrorAction Stop | Select-Object -First 1
$env:Path = "$($nodeDir.FullName);" + $env:Path

Write-Host "Portable Node enabled from: $($nodeDir.FullName)"
node -v
npm -v
