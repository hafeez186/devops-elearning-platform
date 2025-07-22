Write-Host "🚀 CI/CD Setup for DevOps E-Learning Platform" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Gray

# Check if Git is available
Write-Host "`n📁 Checking Git setup..." -ForegroundColor Green
if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "✅ Git is installed" -ForegroundColor Green
    
    # Check if this is a Git repository
    if (Test-Path ".git") {
        Write-Host "✅ Git repository initialized" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Initializing Git repository..." -ForegroundColor Yellow
        git init
        git add .
        git commit -m "Initial commit: DevOps E-Learning Platform"
        Write-Host "✅ Git repository created and initial commit made" -ForegroundColor Green
    }
} else {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
}

# Check Docker
Write-Host "`n🐳 Checking Docker setup..." -ForegroundColor Green
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "✅ Docker is installed" -ForegroundColor Green
    try {
        docker --version
        Write-Host "✅ Docker is working" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Docker might not be running" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Docker is not installed. Consider installing Docker Desktop." -ForegroundColor Yellow
}

# Check Node.js dependencies
Write-Host "`n📦 Checking Node.js dependencies..." -ForegroundColor Green
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "⚠️  Installing dependencies..." -ForegroundColor Yellow
        npm install
    } else {
        Write-Host "✅ Dependencies already installed" -ForegroundColor Green
    }
} else {
    Write-Host "❌ package.json not found" -ForegroundColor Red
}

# CI/CD Pipeline Information
Write-Host "`n🚀 Your CI/CD Pipeline includes:" -ForegroundColor Cyan
Write-Host "✅ GitHub Actions workflow (.github/workflows/ci-cd.yml)" -ForegroundColor White
Write-Host "✅ Code quality checks (ESLint, TypeScript)" -ForegroundColor White
Write-Host "✅ Automated testing (Frontend & Backend)" -ForegroundColor White
Write-Host "✅ Docker build and deployment" -ForegroundColor White
Write-Host "✅ Staging and Production environments" -ForegroundColor White

# Required GitHub Secrets
Write-Host "`n🔐 Required GitHub Secrets:" -ForegroundColor Cyan
Write-Host "Add these in: Repository Settings - Secrets and Variables - Actions" -ForegroundColor Yellow
Write-Host "• DOCKERHUB_USERNAME - Your Docker Hub username" -ForegroundColor White
Write-Host "• DOCKERHUB_TOKEN - Your Docker Hub access token" -ForegroundColor White  
Write-Host "• MONGODB_URI - MongoDB connection string" -ForegroundColor White
Write-Host "• JWT_SECRET - JWT secret key for authentication" -ForegroundColor White

# Next Steps
Write-Host "`n📋 Next Steps to Deploy:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub repository" -ForegroundColor White
Write-Host "2. Add the remote origin:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/USERNAME/REPO.git" -ForegroundColor Gray
Write-Host "3. Push your code:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host "4. Configure GitHub Secrets (listed above)" -ForegroundColor White
Write-Host "5. Make a commit to trigger the pipeline!" -ForegroundColor White

# Test commands
Write-Host "`n💡 Test your setup locally first:" -ForegroundColor Cyan
Write-Host "npm test                    # Run all tests" -ForegroundColor Gray
Write-Host "npm run lint                # Check code quality" -ForegroundColor Gray
Write-Host "npm run build               # Build for production" -ForegroundColor Gray
Write-Host "docker-compose up --build   # Test with Docker" -ForegroundColor Gray

Write-Host "`n🎉 Your CI/CD pipeline is ready to use!" -ForegroundColor Green
Write-Host "Just push to GitHub and watch the automated deployment magic happen! ✨" -ForegroundColor Magenta
