param(
    [string]$BaseUrl = "http://127.0.0.1:8000",
    [string]$RegisterPath = "/auth/register",
    [string]$LoginPath = "/auth/login"
)

$ErrorActionPreference = "Stop"

function Assert-OneOfStatusCodes {
    param(
        [string]$Label,
        [int[]]$Expected,
        [int]$Actual
    )

    if ($Expected -notcontains $Actual) {
        throw "$Label expected one of [$($Expected -join ',')] but got $Actual"
    }

    Write-Host "$Label OK ($Actual)"
}

Write-Host "Running Day 4 auth smoke test against $BaseUrl"

$stamp = Get-Date -Format "yyyyMMddHHmmss"
$email = "smoke.$stamp@example.com"
$password = "P@ssword123!"

$registerBody = @{
    email = $email
    password = $password
} | ConvertTo-Json

$register = Invoke-WebRequest -Method Post -Uri "$BaseUrl$RegisterPath" -ContentType "application/json" -Body $registerBody
Assert-OneOfStatusCodes -Label "REGISTER" -Expected @(200, 201) -Actual ([int]$register.StatusCode)

$loginBody = @{
    email = $email
    password = $password
} | ConvertTo-Json

$login = Invoke-WebRequest -Method Post -Uri "$BaseUrl$LoginPath" -ContentType "application/json" -Body $loginBody
Assert-OneOfStatusCodes -Label "LOGIN" -Expected @(200) -Actual ([int]$login.StatusCode)
$loginJson = $login.Content | ConvertFrom-Json
$token = $null

if ($loginJson.access_token) {
    $token = [string]$loginJson.access_token
} elseif ($loginJson.token) {
    $token = [string]$loginJson.token
}

if ([string]::IsNullOrWhiteSpace($token)) {
    throw "LOGIN response did not include access_token or token"
}

Write-Host "TOKEN OK (found)"

try {
    Invoke-WebRequest -Method Get -Uri "$BaseUrl/tasks" | Out-Null
    throw "UNAUTH_TASKS expected 401 or 403 but request succeeded"
} catch {
    $status = -1
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
        $status = [int]$_.Exception.Response.StatusCode
    }

    if (@(401, 403) -notcontains $status) {
        throw "UNAUTH_TASKS expected 401/403 but got $status"
    }

    Write-Host "UNAUTH_TASKS OK ($status)"
}

$authHeaders = @{ Authorization = "Bearer $token" }
$authTasks = Invoke-WebRequest -Method Get -Uri "$BaseUrl/tasks" -Headers $authHeaders
Assert-OneOfStatusCodes -Label "AUTH_TASKS" -Expected @(200) -Actual ([int]$authTasks.StatusCode)

Write-Host "Day 4 auth smoke test passed."
