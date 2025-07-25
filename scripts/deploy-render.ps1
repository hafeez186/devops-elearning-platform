# Render Deployment Setup Script for Windows
# This script helps configure the DevOps E-Learning Platform for Render deployment

Write-Host "🚀 Render Deployment Setup for DevOps E-Learning Platform" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Pre-deployment Checklist:" -ForegroundColor Yellow
Write-Host "1. ✅ Ensure your code is pushed to GitHub"
Write-Host "2. ✅ Have a Render account ready"
Write-Host "3. ✅ PostgreSQL database will be created on Render"
Write-Host ""

# Generate JWT Secret
Write-Host "🔐 Generating secure JWT secret..." -ForegroundColor Green
try {
    $JWT_SECRET = -join ((1..64) | ForEach {'{0:X}' -f (Get-Random -Max 16)})
} catch {
    # Fallback method
    $bytes = [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes(32)
    $JWT_SECRET = [System.BitConverter]::ToString($bytes).Replace('-', '').ToLower()
}
Write-Host "Generated JWT_SECRET: $JWT_SECRET" -ForegroundColor Green
Write-Host ""

# Display environment variables template
Write-Host "📝 Environment Variables for Render Backend Service:" -ForegroundColor Yellow
Write-Host "=================================================="
@"
NODE_ENV=production
PORT=5000
DATABASE_URL=[Copy from your PostgreSQL service in Render]
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://[your-frontend-service-name].onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
"@

Write-Host ""
Write-Host "🔧 Build Commands for Render Services:" -ForegroundColor Yellow
Write-Host "======================================"
Write-Host ""
Write-Host "Backend Service Configuration:" -ForegroundColor Cyan
Write-Host "  Name: devops-elearning-backend"
Write-Host "  Environment: Node"
Write-Host "  Build Command: cd server && npm ci && npm run build"
Write-Host "  Start Command: cd server && npm start"
Write-Host "  Health Check Path: /health"
Write-Host ""
Write-Host "Frontend Service Configuration:" -ForegroundColor Cyan
Write-Host "  Name: devops-elearning-frontend"
Write-Host "  Environment: Static Site"
Write-Host "  Build Command: cd client && npm ci && REACT_APP_API_URL=https://devops-elearning-backend.onrender.com npm run build"
Write-Host "  Publish Directory: client/build"
Write-Host ""

# Check for required files
Write-Host "🔍 Checking required files..." -ForegroundColor Yellow
Write-Host ""

$filesToCheck = @(
    "server/package.json",
    "client/package.json", 
    "server/Dockerfile",
    "client/Dockerfile",
    "render.yaml",
    "server/prisma/schema.prisma"
)

$allGood = $true
foreach ($file in $filesToCheck) {
    if (Test-Path $file) {
        Write-Host "✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $file missing" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""
if ($allGood) {
    Write-Host "🎉 All required files are present!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Some files are missing. Please ensure all files are committed." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📚 Next Steps:" -ForegroundColor Yellow
Write-Host "============="
Write-Host "1. 🔗 Go to https://render.com and sign in"
Write-Host "2. 🗄️  Create PostgreSQL database (free tier available)"
Write-Host "3. 🖥️  Deploy backend service with above configuration"
Write-Host "4. 🎨 Deploy frontend service with above configuration"
Write-Host "5. 🔄 Update CORS_ORIGIN after frontend deployment"
Write-Host "6. ✅ Test deployment with health check"
Write-Host ""
Write-Host "📖 For detailed instructions, see: RENDER_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🆘 Need help? Check the troubleshooting section in the deployment guide" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Happy deploying!" -ForegroundColor Green

# Keep the window open
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
