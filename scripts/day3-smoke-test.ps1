param(
    [string]$BaseUrl = "http://127.0.0.1:8000"
)

$ErrorActionPreference = "Stop"

function Assert-StatusCode {
    param(
        [string]$Label,
        [int]$Expected,
        [int]$Actual
    )

    if ($Expected -ne $Actual) {
        throw "$Label expected status $Expected but got $Actual"
    }

    Write-Host "$Label OK ($Actual)"
}

Write-Host "Running Day 3 smoke test against $BaseUrl"

$createBody = @{
    title = "day3-smoke"
    description = "automation"
    is_complete = $false
} | ConvertTo-Json

$created = Invoke-WebRequest -Method Post -Uri "$BaseUrl/tasks" -ContentType "application/json" -Body $createBody
Assert-StatusCode -Label "CREATE" -Expected 201 -Actual ([int]$created.StatusCode)
$createdJson = $created.Content | ConvertFrom-Json
$taskId = [int]$createdJson.id

$list = Invoke-WebRequest -Method Get -Uri "$BaseUrl/tasks"
Assert-StatusCode -Label "LIST" -Expected 200 -Actual ([int]$list.StatusCode)

$getOne = Invoke-WebRequest -Method Get -Uri "$BaseUrl/tasks/$taskId"
Assert-StatusCode -Label "GET_ONE" -Expected 200 -Actual ([int]$getOne.StatusCode)

$updateBody = @{
    title = "day3-smoke-updated"
    is_complete = $true
} | ConvertTo-Json

$updated = Invoke-WebRequest -Method Put -Uri "$BaseUrl/tasks/$taskId" -ContentType "application/json" -Body $updateBody
Assert-StatusCode -Label "UPDATE" -Expected 200 -Actual ([int]$updated.StatusCode)

$deleted = Invoke-WebRequest -Method Delete -Uri "$BaseUrl/tasks/$taskId"
Assert-StatusCode -Label "DELETE" -Expected 204 -Actual ([int]$deleted.StatusCode)

try {
    Invoke-WebRequest -Method Get -Uri "$BaseUrl/tasks/$taskId" | Out-Null
    throw "GET_AFTER_DELETE expected 404 but request succeeded"
} catch {
    $status = -1
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
        $status = [int]$_.Exception.Response.StatusCode
    }

    if ($status -ne 404) {
        throw "GET_AFTER_DELETE expected 404 but got $status"
    }

    Write-Host "GET_AFTER_DELETE OK (404)"
}

Write-Host "Day 3 smoke test passed."
