param(
  [string]$RepoUrl,
  [string]$Branch = "main",
  [string]$CommitMessage = "Initial commit"
)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
function Exec($cmd) { $p = Start-Process -FilePath "powershell" -ArgumentList "-NoProfile","-Command",$cmd -Wait -PassThru -WindowStyle Hidden; if ($p.ExitCode -ne 0) { throw "Command failed: $cmd" } }
function Git($args) { Exec("git $args") }
if (-not (Test-Path ".git")) { Git "init" }
Git "config --global init.defaultBranch $Branch"
Git "branch -M $Branch"
$status = & git status --porcelain
if ($status) {
  Git "add -A"
  Git "commit -m \"$CommitMessage\""
}
$remotes = & git remote
if (-not $remotes) { Git "remote add origin $RepoUrl" } else { Git "remote set-url origin $RepoUrl" }
Git "config --global credential.helper manager-core"
$gh = Get-Command gh -ErrorAction SilentlyContinue
if ($env:GH_TOKEN -and $gh) {
  $ownerRepo = ($RepoUrl -replace '^https://github.com/','') -replace '\.git$',''
  $repoExists = $false
  try { Exec("gh repo view $ownerRepo --json name") ; $repoExists = $true } catch { $repoExists = $false }
  if (-not $repoExists) { Exec("gh repo create $ownerRepo --source . --remote origin --push") }
  $pubBranch = "auto/publish-" + (Get-Date -Format "yyyyMMdd-HHmmss")
  try {
    Git "checkout -B $pubBranch"
    Git "push -u origin $pubBranch"
    Exec("gh pr create --fill --base $Branch --head $pubBranch")
    try {
      Exec("gh pr merge --merge")
    } catch {
      Write-Host "Merge requires passing checks or permissions. Please merge PR manually."
    }
  } catch {
    Git "push -u origin $Branch"
  }
} else {
  if ($env:GH_TOKEN) {
    $token = $env:GH_TOKEN
    if ($RepoUrl -match '^https://github\.com/([^/]+)/([^/]+)(\.git)?$') {
      $owner = $matches[1]
      $repoName = $matches[2]
      try {
        $headers = @{ Authorization = "token $token"; "User-Agent" = "TraePublish"; Accept = "application/vnd.github+json" }
        $body = @{ name = $repoName; private = $false } | ConvertTo-Json
        if ($owner -eq $env:GITHUB_USER) {
          Invoke-RestMethod -Method Post -Uri "https://api.github.com/user/repos" -Headers $headers -Body $body | Out-Null
        } else {
          Invoke-RestMethod -Method Post -Uri "https://api.github.com/orgs/$owner/repos" -Headers $headers -Body $body | Out-Null
        }
      } catch {
        Write-Host "Repository may already exist or creation failed. Continuing with push."
      }
    }
    $repoUrlToken = ($RepoUrl -replace '^https://','https://'+$token+'@')
    try {
      Git "remote set-url origin $repoUrlToken"
      Git "push -u origin $Branch"
    } finally {
      Git "remote set-url origin $RepoUrl"
    }
  } else {
    Git "push -u origin $Branch"
  }
}
