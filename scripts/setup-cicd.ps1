# DevOps E-Learning Platform CI/CD Setup Script
# This script helps you set up Git, Docker, and CI/CD for your project

param(
    [string]$GitHubUsername,
    [string]$RepoName = "devops-elearning-platform",
    [string]$DockerHubUsername
)

Write-Host "🚀 Setting up CI/CD for DevOps E-Learning Platform" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Docker is not installed. Please install Docker Desktop." -ForegroundColor Yellow
}

# Initialize Git repository if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "📁 Initializing Git repository..." -ForegroundColor Green
    git init
    
    # Create .gitignore if it doesn't exist
    if (-not (Test-Path ".gitignore")) {
        Write-Host "📝 Creating .gitignore file..." -ForegroundColor Green
        @"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
client/build/
server/dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Docker
.docker/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Uploads
uploads/
temp/
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
    }
    
    # Add all files
    Write-Host "📦 Adding files to Git..." -ForegroundColor Green
    git add .
    git commit -m "Initial commit: DevOps E-Learning Platform setup"
}

# Set up remote repository
if ($GitHubUsername) {
    $remoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"
    
    Write-Host "🌐 Setting up GitHub remote..." -ForegroundColor Green
    Write-Host "Repository URL: $remoteUrl" -ForegroundColor Yellow
    
    # Check if remote already exists
    $existingRemote = git remote get-url origin 2>$null
    if (-not $existingRemote) {
        git remote add origin $remoteUrl
        Write-Host "✅ Remote origin added successfully!" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  Remote origin already exists: $existingRemote" -ForegroundColor Blue
    }
    
    # Create and push develop branch
    $currentBranch = git branch --show-current
    if ($currentBranch -ne "main") {
        git checkout -b main
    }
    
    Write-Host "🔄 Creating develop branch..." -ForegroundColor Green
    git checkout -b develop
    git checkout main
    
    Write-Host "📤 Ready to push to GitHub!" -ForegroundColor Green
    Write-Host "Run these commands to push your code:" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor Cyan
    Write-Host "git push -u origin develop" -ForegroundColor Cyan
}

# Docker setup
Write-Host "`n🐳 Docker Configuration" -ForegroundColor Cyan
Write-Host "-" * 30 -ForegroundColor Gray

if ($DockerHubUsername) {
    Write-Host "Setting up Docker Hub integration..." -ForegroundColor Green
    Write-Host "Docker Hub Username: $DockerHubUsername" -ForegroundColor Yellow
    
    # Test Docker
    try {
        docker --version | Out-Host
        Write-Host "✅ Docker is working!" -ForegroundColor Green
        
        # Build local images for testing
        Write-Host "🔨 Building Docker images..." -ForegroundColor Green
        docker-compose build
        Write-Host "✅ Docker images built successfully!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Docker build failed. Please check Docker installation." -ForegroundColor Red
    }
}

# CI/CD Pipeline Information
Write-Host "`n🚀 CI/CD Pipeline Setup" -ForegroundColor Cyan
Write-Host "-" * 30 -ForegroundColor Gray

Write-Host "Your CI/CD pipeline includes:" -ForegroundColor Green
Write-Host "✅ Code quality checks (ESLint, TypeScript)" -ForegroundColor White
Write-Host "✅ Automated testing (Frontend & Backend)" -ForegroundColor White
Write-Host "✅ Docker build and push" -ForegroundColor White
Write-Host "✅ Staging and Production deployments" -ForegroundColor White
Write-Host "✅ Health checks and monitoring" -ForegroundColor White

# GitHub Secrets Setup
Write-Host "`n🔐 GitHub Secrets Required" -ForegroundColor Cyan
Write-Host "-" * 30 -ForegroundColor Gray

$secrets = @(
    "DOCKERHUB_USERNAME - Your Docker Hub username",
    "DOCKERHUB_TOKEN - Your Docker Hub access token", 
    "MONGODB_URI - MongoDB connection string",
    "JWT_SECRET - JWT secret key for authentication"
)

Write-Host "Add these secrets in GitHub Repository Settings > Secrets and Variables > Actions:" -ForegroundColor Yellow
foreach ($secret in $secrets) {
    Write-Host "  • $secret" -ForegroundColor White
}

# Next Steps
Write-Host "`n📋 Next Steps" -ForegroundColor Cyan
Write-Host "-" * 30 -ForegroundColor Gray

$nextSteps = @(
    "1. Create GitHub repository at: https://github.com/new",
    "2. Push your code to GitHub",
    "3. Configure GitHub Secrets",
    "4. Create Docker Hub account and access token",
    "5. Push a commit to trigger the CI/CD pipeline",
    "6. Monitor the pipeline in GitHub Actions tab"
)

foreach ($step in $nextSteps) {
    Write-Host $step -ForegroundColor White
}

# Useful commands
Write-Host "`n💡 Useful Commands" -ForegroundColor Cyan
Write-Host "-" * 30 -ForegroundColor Gray

Write-Host "Local Development:" -ForegroundColor Yellow
Write-Host "  npm run dev                 # Start development servers" -ForegroundColor White
Write-Host "  npm test                    # Run all tests" -ForegroundColor White
Write-Host "  npm run lint                # Check code quality" -ForegroundColor White
Write-Host "  docker-compose up --build   # Run with Docker" -ForegroundColor White

Write-Host "`nGit Workflow:" -ForegroundColor Yellow
Write-Host "  git checkout develop        # Switch to develop branch" -ForegroundColor White
Write-Host "  git checkout -b feature/xyz # Create feature branch" -ForegroundColor White
Write-Host "  git push origin feature/xyz # Push feature for review" -ForegroundColor White

Write-Host "`n🎉 CI/CD setup complete! Your platform is ready for automated deployment!" -ForegroundColor Green

# Example usage information
Write-Host "`n💡 Example Usage:" -ForegroundColor Magenta
Write-Host ".\setup-cicd.ps1 -GitHubUsername 'yourusername' -DockerHubUsername 'yourdockerhub'" -ForegroundColor Cyan
