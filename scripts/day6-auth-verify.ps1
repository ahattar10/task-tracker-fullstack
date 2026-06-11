Set-Location (Join-Path $PSScriptRoot "..")

$base = "http://127.0.0.1:8000"
$ts = Get-Date -Format yyyyMMddHHmmss
$email = "day6_$ts@example.com"
$password = "Password123"

function Invoke-Check {
  param(
    [string]$Method,
    [string]$Url,
    [hashtable]$Payload
  )

  try {
    if ($null -eq $Payload) {
      $r = Invoke-WebRequest -Method $Method -Uri $Url -ErrorAction Stop
    } else {
      $b = $Payload | ConvertTo-Json
      $r = Invoke-WebRequest -Method $Method -Uri $Url -ContentType "application/json" -Body $b -ErrorAction Stop
    }

    return @{
      code = [int]$r.StatusCode
      body = $r.Content
    }
  } catch {
    if ($_.Exception.Response) {
      $resp = $_.Exception.Response
      $sr = New-Object System.IO.StreamReader($resp.GetResponseStream())
      $txt = $sr.ReadToEnd()
      $sr.Close()

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

$h = Invoke-Check -Method "GET" -Url "$base/health" -Payload $null
$r1 = Invoke-Check -Method "POST" -Url "$base/auth/register" -Payload @{ email = $email; password = $password }
$r2 = Invoke-Check -Method "POST" -Url "$base/auth/register" -Payload @{ email = $email; password = $password }
$l1 = Invoke-Check -Method "POST" -Url "$base/auth/login" -Payload @{ email = $email; password = $password }
$l2 = Invoke-Check -Method "POST" -Url "$base/auth/login" -Payload @{ email = $email; password = "WrongPass123" }

Write-Output ("EMAIL=" + $email)
Write-Output ("HEALTH=" + $h.code + " " + $h.body)
Write-Output ("REGISTER_OK=" + $r1.code + " " + $r1.body)
Write-Output ("REGISTER_DUP=" + $r2.code + " " + $r2.body)
Write-Output ("LOGIN_OK=" + $l1.code + " " + $l1.body)
Write-Output ("LOGIN_BAD=" + $l2.code + " " + $l2.body)
