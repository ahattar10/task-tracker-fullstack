param(
  [string]$ComposeFile = "infra/docker-compose.yml",
  [string]$FrontendBase = "http://127.0.0.1:3000",
  [int]$MaxWaitSeconds = 120
)

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

$stamp = Get-Date -Format yyyyMMddHHmmss
$email = "day9_verify_$stamp@example.com"
$password = "Password123"

function Invoke-JsonRequest {
  param(
    [string]$Method,
    [string]$Url,
    [hashtable]$Body,
    [hashtable]$Headers
  )

  $args = @{
    Method = $Method
    Uri = $Url
    ErrorAction = "Stop"
  }

  if ($PSVersionTable.PSVersion.Major -lt 6) {
    $args.UseBasicParsing = $true
  }

  if ($Headers) {
    $args.Headers = $Headers
  }

  if ($Body) {
    $args.ContentType = "application/json"
    $args.Body = ($Body | ConvertTo-Json -Compress)
  }

  try {
    $response = Invoke-WebRequest @args
    return @{
      code = [int]$response.StatusCode
      body = $response.Content
    }
  }
  catch {
    if ($_.Exception.Response) {
      $resp = $_.Exception.Response
      $reader = New-Object System.IO.StreamReader($resp.GetResponseStream())
      $txt = $reader.ReadToEnd()
      $reader.Close()
      return @{
        code = [int]$resp.StatusCode
        body = $txt
      }
    }

    return @{
      code = -1
      body = $_.Exception.Message
    }
  }
}

function Wait-ForHttp200 {
  param(
    [string]$Url,
    [int]$TimeoutSeconds
  )

  $start = Get-Date
  while (((Get-Date) - $start).TotalSeconds -lt $TimeoutSeconds) {
    $result = Invoke-JsonRequest -Method "GET" -Url $Url
    if ($result.code -eq 200) {
      return $true
    }
    Start-Sleep -Seconds 2
  }

  return $false
}

Write-Output "Starting compose stack..."
docker compose -f $ComposeFile up --build -d | Out-Null

$migrationsRan = $false
try {
  docker compose -f $ComposeFile exec -T backend alembic upgrade head | Out-Null
  $migrationsRan = $true
}
catch {
  $migrationsRan = $false
}

$frontendReady = Wait-ForHttp200 -Url "$FrontendBase/health" -TimeoutSeconds $MaxWaitSeconds
$backendReady = Wait-ForHttp200 -Url "http://127.0.0.1:8000/health" -TimeoutSeconds $MaxWaitSeconds

$register = Invoke-JsonRequest -Method "POST" -Url "$FrontendBase/api/auth/register" -Body @{ email = $email; password = $password }
$login = Invoke-JsonRequest -Method "POST" -Url "$FrontendBase/api/auth/login" -Body @{ email = $email; password = $password }

$token = $null
if ($login.code -eq 200) {
  $token = ($login.body | ConvertFrom-Json).access_token
}

$authHeaders = @{}
if ($token) {
  $authHeaders = @{ Authorization = "Bearer $token" }
}

$create = Invoke-JsonRequest -Method "POST" -Url "$FrontendBase/api/tasks" -Headers $authHeaders -Body @{
  title = "Day9 Verify Task"
  description = "Created by day9-compose-verify"
  priority = "high"
  status = "todo"
}

$taskId = $null
if ($create.code -eq 201) {
  $taskId = ($create.body | ConvertFrom-Json).id
}

$list = Invoke-JsonRequest -Method "GET" -Url "$FrontendBase/api/tasks?priority=high" -Headers $authHeaders
$update = @{ code = -1; body = "skipped" }
$delete = @{ code = -1; body = "skipped" }

if ($taskId) {
  $update = Invoke-JsonRequest -Method "PUT" -Url "$FrontendBase/api/tasks/$taskId" -Headers $authHeaders -Body @{
    title = "Day9 Verify Task Updated"
    description = "Updated by day9-compose-verify"
    priority = "medium"
    status = "done"
  }

  $delete = Invoke-JsonRequest -Method "DELETE" -Url "$FrontendBase/api/tasks/$taskId" -Headers $authHeaders
}

Write-Output "FRONTEND_HEALTH=$([int]$frontendReady)"
Write-Output "BACKEND_HEALTH=$([int]$backendReady)"
Write-Output "MIGRATIONS_RAN=$migrationsRan"
Write-Output "REGISTER=$($register.code)"
Write-Output "LOGIN=$($login.code)"
Write-Output "CREATE_TASK=$($create.code)"
Write-Output "LIST_TASKS=$($list.code)"
Write-Output "UPDATE_TASK=$($update.code)"
Write-Output "DELETE_TASK=$($delete.code)"

if (
  $frontendReady -and
  $backendReady -and
  $register.code -eq 201 -and
  $login.code -eq 200 -and
  $create.code -eq 201 -and
  $list.code -eq 200 -and
  $update.code -eq 200 -and
  $delete.code -eq 204
) {
  Write-Output "DAY9_COMPOSE_VERIFY=PASS"
  exit 0
}

Write-Output "DAY9_COMPOSE_VERIFY=FAIL"
exit 1
