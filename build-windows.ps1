[CmdletBinding()]
param(
    [switch]$InstallDependencies
)

$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$tauriConfigPath = Join-Path $projectRoot "src-tauri\tauri.conf.json"
$cargoManifestPath = Join-Path $projectRoot "src-tauri\Cargo.toml"
$packageJsonPath = Join-Path $projectRoot "package.json"
$tauriTargetPath = Join-Path $projectRoot ".build\tauri-target"
$targetReleasePath = Join-Path $tauriTargetPath "release"
$bundlePath = Join-Path $targetReleasePath "bundle"

Set-Location $projectRoot

# Keep packaging output separate from executables that may be running from the development target.
$env:CARGO_TARGET_DIR = $tauriTargetPath

$tauriConfig = Get-Content -Raw $tauriConfigPath | ConvertFrom-Json
$packageJson = Get-Content -Raw $packageJsonPath | ConvertFrom-Json
$cargoPackageMatch = Select-String -Path $cargoManifestPath -Pattern '^name\s*=\s*"([^"]+)"' |
    Select-Object -First 1

if (-not $cargoPackageMatch) {
    throw "The Rust package name was not found in src-tauri\Cargo.toml."
}

$productName = $tauriConfig.productName
$version = $tauriConfig.version
$applicationBinaryName = if ($tauriConfig.mainBinaryName) {
    $tauriConfig.mainBinaryName
} else {
    $cargoPackageMatch.Matches[0].Groups[1].Value
}

Write-Host "Building $productName for Windows." -ForegroundColor Cyan

$npmCommand = (Get-Command npm.cmd -ErrorAction Stop).Source
$null = Get-Command cargo.exe -ErrorAction Stop

if ($InstallDependencies -or -not (Test-Path (Join-Path $projectRoot "node_modules"))) {
    Write-Host "Installing dependencies from package-lock.json." -ForegroundColor Cyan
    & $npmCommand ci

    if ($LASTEXITCODE -ne 0) {
        throw "npm ci failed with exit code $LASTEXITCODE."
    }
}

Write-Host "Generating the Tauri release executable, NSIS installer, and MSI installer." -ForegroundColor Cyan
if ($packageJson.scripts.PSObject.Properties.Name -contains "tauri:build") {
    & $npmCommand run tauri:build
} elseif ($packageJson.scripts.PSObject.Properties.Name -contains "tauri") {
    & $npmCommand run tauri -- build
} else {
    throw 'Neither the "tauri:build" nor "tauri" npm script was found in package.json.'
}

if ($LASTEXITCODE -ne 0) {
    throw "Tauri build failed with exit code $LASTEXITCODE."
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$artifactPath = Join-Path $projectRoot "artifacts\windows\$version-$timestamp"
$applicationExePath = Join-Path $targetReleasePath "$applicationBinaryName.exe"

$artifacts = @()

if (Test-Path $applicationExePath) {
    $artifacts += Get-Item $applicationExePath
}

if (Test-Path $bundlePath) {
    $artifacts += Get-ChildItem $bundlePath -Recurse -File |
        Where-Object { $_.Extension -in ".exe", ".msi" }
}

if ($artifacts.Count -eq 0) {
    throw "No release executable, NSIS installer, or MSI installer was found."
}

$null = New-Item -ItemType Directory -Path $artifactPath -Force

foreach ($artifact in $artifacts) {
    Copy-Item -LiteralPath $artifact.FullName -Destination $artifactPath -Force
}

$hashLines = Get-ChildItem $artifactPath -File |
    Sort-Object Name |
    ForEach-Object {
        $hash = Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256
        "$($hash.Hash)  $($_.Name)"
    }

$hashLines | Set-Content -Path (Join-Path $artifactPath "SHA256SUMS.txt") -Encoding utf8

Write-Host ""
Write-Host "Build completed successfully." -ForegroundColor Green
Write-Host "Artifacts: $artifactPath" -ForegroundColor Green
Get-ChildItem $artifactPath -File | Sort-Object Name | ForEach-Object {
    Write-Host "  $($_.Name)"
}
