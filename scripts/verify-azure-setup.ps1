# 🔍 Azure DevOps Pipeline Setup Verification Script

Write-Host "🔷 Azure DevOps Pipeline Setup Verification" -ForegroundColor Blue
Write-Host "==========================================" -ForegroundColor Blue
Write-Host ""

# Function to check URL accessibility
function Test-Url {
    param($Url, $Description)
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Head -TimeoutSec 10 -ErrorAction Stop
        Write-Host "✅ $Description is accessible" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ $Description is not accessible" -ForegroundColor Red
        return $false
    }
}

Write-Host "🔧 Step 1: Checking Prerequisites" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Yellow

# Check if Azure DevOps is accessible
Test-Url "https://dev.azure.com" "Azure DevOps"

# Check if GitHub repo is accessible
Test-Url "https://github.com/hafeez186/devops-elearning-platform" "GitHub Repository"

# Check if Docker Hub is accessible
Test-Url "https://hub.docker.com" "Docker Hub"

Write-Host ""
Write-Host "📋 Step 2: Configuration Checklist" -ForegroundColor Yellow
Write-Host "===================================" -ForegroundColor Yellow

$checklist = @(
    "Azure DevOps project created at dev.azure.com",
    "Repository imported from GitHub",
    "Docker Hub service connection created (DockerHubConnection)",
    "Azure service connection created (AzureServiceConnection)", 
    "Variable group created (devops-elearning-variables)",
    "DATABASE_URL variable added (marked as secret)",
    "JWT_SECRET variable added (marked as secret)",
    "Pipeline created using azure-pipelines.yml",
    "PostgreSQL database provisioned"
)

foreach ($item in $checklist) {
    Write-Host "☐ $item" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎯 Step 3: Quick Setup Links" -ForegroundColor Yellow
Write-Host "============================" -ForegroundColor Yellow

Write-Host "📖 Complete Setup Guide: " -ForegroundColor Cyan -NoNewline
Write-Host "AZURE_DEVOPS_PIPELINE_SETUP.md" -ForegroundColor White

Write-Host "🔷 Azure DevOps: " -ForegroundColor Cyan -NoNewline
Write-Host "https://dev.azure.com" -ForegroundColor White

Write-Host "☁️ Azure Portal: " -ForegroundColor Cyan -NoNewline
Write-Host "https://portal.azure.com" -ForegroundColor White

Write-Host "🐳 Docker Hub: " -ForegroundColor Cyan -NoNewline
Write-Host "https://hub.docker.com" -ForegroundColor White

Write-Host ""
Write-Host "🚀 Step 4: Database Options" -ForegroundColor Yellow
Write-Host "============================" -ForegroundColor Yellow

Write-Host "Option A - Azure PostgreSQL (~$7/month):" -ForegroundColor Cyan
Write-Host "  portal.azure.com → Create resource → Azure Database for PostgreSQL" -ForegroundColor White

Write-Host "Option B - Supabase (Free):" -ForegroundColor Cyan
Write-Host "  supabase.com → New project → Copy connection string" -ForegroundColor White

Write-Host "Option C - Render (Free 1GB):" -ForegroundColor Cyan
Write-Host "  render.com → New PostgreSQL → Copy connection string" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Once Setup is Complete:" -ForegroundColor Green
Write-Host "==========================" -ForegroundColor Green

Write-Host "✅ Push to 'develop' branch → Deploys to staging" -ForegroundColor White
Write-Host "✅ Push to 'main' branch → Deploys to production" -ForegroundColor White
Write-Host "✅ Monitor at: dev.azure.com/yourorg/DevOps-ELearning-Platform/_build" -ForegroundColor White

Write-Host ""
Write-Host "📞 Need Help?" -ForegroundColor Magenta
Write-Host "=============" -ForegroundColor Magenta
Write-Host "Check the detailed guide: AZURE_DEVOPS_PIPELINE_SETUP.md" -ForegroundColor White
