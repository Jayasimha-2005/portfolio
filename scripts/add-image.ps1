<#
  add-image.ps1
  Simple helper to copy a local image file into the project `assets/images` folder

  Usage examples (PowerShell):
    # copy and overwrite with default destination name
    .\add-image.ps1 -Source 'C:\Users\You\Downloads\myphoto.jpg'

    # copy to a specific destination filename
    .\add-image.ps1 -Source 'C:\Users\You\Downloads\myphoto.jpg' -Destination 'assets/images/headshot.jpg'

  This script will create the destination folder if it doesn't exist.
#>

param(
  [Parameter(Mandatory=$true)][string]$Source,
  [Parameter(Mandatory=$false)][string]$Destination = 'assets/images/JayaPic.jpeg'
)

try {
  $projRoot = Split-Path -Path $PSScriptRoot -Parent
  $destPath = Join-Path -Path $projRoot -ChildPath $Destination
  $destFolder = Split-Path -Path $destPath -Parent

  if(-not (Test-Path $Source)){
    Write-Error "Source file not found: $Source"
    exit 1
  }

  if(-not (Test-Path $destFolder)){
    New-Item -ItemType Directory -Path $destFolder -Force | Out-Null
  }

  Copy-Item -Path $Source -Destination $destPath -Force
  Write-Host "Copied:`n  $Source`n to`n  $destPath" -ForegroundColor Green
  Write-Host "Open your browser and refresh the page to see the new image." -ForegroundColor Yellow
} catch {
  Write-Error "Failed to copy image: $_"
  exit 1
}
