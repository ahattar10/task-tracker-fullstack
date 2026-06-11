param(
  [string]$BaseUrl = "http://127.0.0.1:8000"
)

$ErrorActionPreference = "Stop"

$stamp = Get-Date -Format yyyyMMddHHmmss
$email = "day7_verify_$stamp@example.com"
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

$register = Invoke-JsonRequest -Method "POST" -Url "$BaseUrl/auth/register" -Body @{ email = $email; password = $password }
$login = Invoke-JsonRequest -Method "POST" -Url "$BaseUrl/auth/login" -Body @{ email = $email; password = $password }

if ($login.code -ne 200) {
  Write-Output "LOGIN_FAIL=$($login.code)"
  exit 1
}

$token = ($login.body | ConvertFrom-Json).access_token
$authHeaders = @{ Authorization = "Bearer $token" }

$createA = Invoke-JsonRequest -Method "POST" -Url "$BaseUrl/tasks" -Headers $authHeaders -Body @{
  title = "Day7 Verify A"
  description = "Created by day7-api-verify"
  priority = "medium"
  status = "todo"
}
$createB = Invoke-JsonRequest -Method "POST" -Url "$BaseUrl/tasks" -Headers $authHeaders -Body @{
  title = "Day7 Verify B"
  description = "Created by day7-api-verify"
  priority = "high"
  status = "in_progress"
}

$idA = $null
if ($createA.code -eq 201) {
  $idA = ($createA.body | ConvertFrom-Json).id
}

$listPage1 = Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/tasks?page=1&limit=1" -Headers $authHeaders
$listPage2 = Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/tasks?page=2&limit=1" -Headers $authHeaders
$filterHigh = Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/tasks?priority=high" -Headers $authHeaders
$searchA = Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/tasks?search=Day7%20Verify%20A" -Headers $authHeaders

$updateDone = @{ code = -1; body = "skipped" }
$deleteA = @{ code = -1; body = "skipped" }

if ($idA) {
  $updateDone = Invoke-JsonRequest -Method "PUT" -Url "$BaseUrl/tasks/$idA" -Headers $authHeaders -Body @{
    title = "Day7 Verify A Updated"
    description = "Updated by day7-api-verify"
    priority = "low"
    status = "done"
  }

  $deleteA = Invoke-JsonRequest -Method "DELETE" -Url "$BaseUrl/tasks/$idA" -Headers $authHeaders
}

Write-Output "REGISTER=$($register.code)"
Write-Output "LOGIN=$($login.code)"
Write-Output "CREATE_A=$($createA.code)"
Write-Output "CREATE_B=$($createB.code)"
Write-Output "LIST_PAGE1=$($listPage1.code)"
Write-Output "LIST_PAGE2=$($listPage2.code)"
Write-Output "FILTER_PRIORITY_HIGH=$($filterHigh.code)"
Write-Output "SEARCH_A=$($searchA.code)"
Write-Output "UPDATE_DONE=$($updateDone.code)"
Write-Output "DELETE_A=$($deleteA.code)"

if (
  $login.code -eq 200 -and
  $createA.code -eq 201 -and
  $createB.code -eq 201 -and
  $listPage1.code -eq 200 -and
  $listPage2.code -eq 200 -and
  $filterHigh.code -eq 200 -and
  $searchA.code -eq 200 -and
  $updateDone.code -eq 200 -and
  $deleteA.code -eq 204
) {
  Write-Output "DAY7_API_VERIFY=PASS"
  exit 0
}

Write-Output "DAY7_API_VERIFY=FAIL"
exit 1
