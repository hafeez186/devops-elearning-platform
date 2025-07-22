#!/usr/bin/env pwsh
# Docker Hub Authentication Setup Script for Windows PowerShell

Write-Host "🐳 Docker Hub Authentication Setup for DevOps E-Learning Platform" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

# Check if running in GitHub Actions environment
if ($env:GITHUB_ACTIONS -eq "true") {
    Write-Host "❌ This script should not be run in GitHub Actions!" -ForegroundColor Red
    Write-Host "Please set up GitHub Secrets manually." -ForegroundColor Yellow
    exit 1
}

# Function to test Docker Hub credentials
function Test-DockerHubCredentials {
    param(
        [string]$Username,
        [string]$Token
    )
    
    Write-Host "🔐 Testing Docker Hub credentials..." -ForegroundColor Yellow
    
    try {
        # Create temporary config for testing
        $dockerConfig = @{
            auths = @{
                "https://index.docker.io/v1/" = @{
                    auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${Username}:${Token}"))
                }
            }
        }
        
        $configPath = "$env:USERPROFILE\.docker\config.json"
        $configDir = Split-Path $configPath -Parent
        
        if (-not (Test-Path $configDir)) {
            New-Item -ItemType Directory -Path $configDir -Force | Out-Null
        }
        
        $dockerConfig | ConvertTo-Json -Depth 3 | Set-Content $configPath
        
        # Test login
        $result = docker login --username $Username --password $Token 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Docker Hub credentials are valid!" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Docker Hub login failed: $result" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Error testing credentials: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main setup process
Write-Host ""
Write-Host "📋 Steps to fix Docker Hub authentication:" -ForegroundColor White
Write-Host "1. Create/verify Docker Hub account at https://hub.docker.com/" -ForegroundColor Gray
Write-Host "2. Generate access token in Docker Hub → Account Settings → Security" -ForegroundColor Gray
Write-Host "3. Set GitHub repository secrets" -ForegroundColor Gray
Write-Host ""

# Get Docker Hub credentials
$dockerUsername = Read-Host "Enter your Docker Hub username"
$dockerToken = Read-Host "Enter your Docker Hub access token" -AsSecureString
$dockerTokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($dockerToken))

if ([string]::IsNullOrWhiteSpace($dockerUsername) -or [string]::IsNullOrWhiteSpace($dockerTokenPlain)) {
    Write-Host "❌ Username and token are required!" -ForegroundColor Red
    exit 1
}

# Test credentials
if (Test-DockerHubCredentials -Username $dockerUsername -Token $dockerTokenPlain) {
    Write-Host ""
    Write-Host "🎯 Next Steps - Configure GitHub Secrets:" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. Go to your GitHub repository" -ForegroundColor White
    Write-Host "2. Navigate to Settings → Secrets and variables → Actions" -ForegroundColor White
    Write-Host "3. Add these secrets:" -ForegroundColor White
    Write-Host ""
    Write-Host "   DOCKERHUB_USERNAME = $dockerUsername" -ForegroundColor Yellow
    Write-Host "   DOCKERHUB_TOKEN = [your-access-token]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "4. Additional secrets for production:" -ForegroundColor White
    Write-Host "   MONGODB_URI = [your-mongodb-connection-string]" -ForegroundColor Cyan
    Write-Host "   JWT_SECRET = [your-jwt-secret-key]" -ForegroundColor Cyan
    Write-Host "   REACT_APP_API_URL = [your-backend-api-url]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "5. Trigger the workflow again" -ForegroundColor White
    Write-Host ""
    Write-Host "✅ Setup complete! Your Docker Hub credentials are working." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Docker Hub authentication failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "========================" -ForegroundColor Yellow
    Write-Host "1. Verify your Docker Hub username (case-sensitive)" -ForegroundColor White
    Write-Host "2. Generate a new access token with Read/Write permissions" -ForegroundColor White
    Write-Host "3. Ensure Docker Desktop is running" -ForegroundColor White
    Write-Host "4. Try logging in manually: docker login" -ForegroundColor White
    Write-Host ""
    Write-Host "🌐 Alternative: Use GitHub Container Registry" -ForegroundColor Cyan
    Write-Host "No additional setup required - uses GITHUB_TOKEN automatically" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📚 For more help, see: DOCKER_HUB_FIX.md" -ForegroundColor Blue

# Clean up sensitive data
$dockerToken = $null
$dockerTokenPlain = $null
