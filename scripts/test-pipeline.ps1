# CI/CD Pipeline Testing and Verification Script
# This script helps test your CI/CD pipeline locally before pushing to GitHub

Write-Host "🧪 CI/CD Pipeline Testing Script" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

$ErrorActionPreference = "Continue"
$testResults = @()

function Test-Step {
    param($Name, $ScriptBlock)
    
    Write-Host "`n🔍 Testing: $Name" -ForegroundColor Yellow
    Write-Host "-" * 40 -ForegroundColor Gray
    
    try {
        $result = & $ScriptBlock
        if ($LASTEXITCODE -eq 0 -or $result) {
            Write-Host "✅ PASSED: $Name" -ForegroundColor Green
            $script:testResults += @{Name = $Name; Status = "PASSED"; Error = $null}
            return $true
        } else {
            Write-Host "❌ FAILED: $Name" -ForegroundColor Red
            $script:testResults += @{Name = $Name; Status = "FAILED"; Error = "Command failed"}
            return $false
        }
    }
    catch {
        Write-Host "❌ FAILED: $Name - $($_.Exception.Message)" -ForegroundColor Red
        $script:testResults += @{Name = $Name; Status = "FAILED"; Error = $_.Exception.Message}
        return $false
    }
}

# Test 1: Check if all dependencies are installed
Test-Step "Dependencies Installation" {
    Write-Host "Checking if all dependencies are installed..."
    
    if (Test-Path "node_modules") {
        Write-Host "✅ Root node_modules exists"
    } else {
        Write-Host "⚠️  Installing root dependencies..."
        npm install
    }
    
    if (Test-Path "client/node_modules") {
        Write-Host "✅ Client node_modules exists"
    } else {
        Write-Host "⚠️  Installing client dependencies..."
        cd client; npm install; cd ..
    }
    
    if (Test-Path "server/node_modules") {
        Write-Host "✅ Server node_modules exists"
    } else {
        Write-Host "⚠️  Installing server dependencies..."
        cd server; npm install; cd ..
    }
    
    return $true
}

# Test 2: Code Quality Check
Test-Step "Code Quality (ESLint)" {
    Write-Host "Running ESLint checks..."
    npm run lint
    return $LASTEXITCODE -eq 0
}

# Test 3: TypeScript Compilation
Test-Step "TypeScript Compilation" {
    Write-Host "Checking TypeScript compilation..."
    
    # Check client TypeScript
    cd client
    npx tsc --noEmit
    $clientTscResult = $LASTEXITCODE
    cd ..
    
    # Check server TypeScript  
    cd server
    npx tsc --noEmit
    $serverTscResult = $LASTEXITCODE
    cd ..
    
    return ($clientTscResult -eq 0) -and ($serverTscResult -eq 0)
}

# Test 4: Frontend Tests
Test-Step "Frontend Tests" {
    Write-Host "Running frontend tests..."
    cd client
    npm test -- --coverage --watchAll=false
    $result = $LASTEXITCODE
    cd ..
    return $result -eq 0
}

# Test 5: Backend Tests
Test-Step "Backend Tests" {
    Write-Host "Running backend tests..."
    cd server
    npm test
    $result = $LASTEXITCODE
    cd ..
    return $result -eq 0
}

# Test 6: Build Process
Test-Step "Production Build" {
    Write-Host "Testing production build..."
    npm run build
    
    if (Test-Path "client/build") {
        Write-Host "✅ Frontend build created successfully"
        return $true
    } else {
        Write-Host "❌ Frontend build failed"
        return $false
    }
}

# Test 7: Docker Build
Test-Step "Docker Build" {
    Write-Host "Testing Docker builds..."
    
    # Test if Docker is available
    docker --version | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Docker not available, skipping Docker tests"
        return $true
    }
    
    # Build frontend image
    Write-Host "Building frontend Docker image..."
    docker build -t devops-elearning-frontend:test ./client
    $frontendResult = $LASTEXITCODE
    
    # Build backend image
    Write-Host "Building backend Docker image..."
    docker build -t devops-elearning-backend:test ./server
    $backendResult = $LASTEXITCODE
    
    # Clean up test images
    docker rmi devops-elearning-frontend:test devops-elearning-backend:test 2>$null
    
    return ($frontendResult -eq 0) -and ($backendResult -eq 0)
}

# Test 8: Security Audit
Test-Step "Security Audit" {
    Write-Host "Running security audit..."
    
    # Audit root dependencies
    npm audit --audit-level moderate
    $rootAudit = $LASTEXITCODE
    
    # Audit client dependencies
    cd client
    npm audit --audit-level moderate
    $clientAudit = $LASTEXITCODE
    cd ..
    
    # Audit server dependencies
    cd server  
    npm audit --audit-level moderate
    $serverAudit = $LASTEXITCODE
    cd ..
    
    # Return true if no high/critical vulnerabilities
    return ($rootAudit -eq 0) -and ($clientAudit -eq 0) -and ($serverAudit -eq 0)
}

# Test 9: Environment Configuration
Test-Step "Environment Configuration" {
    Write-Host "Checking environment configuration..."
    
    $envFiles = @(
        "server/.env.example",
        ".github/workflows/ci-cd.yml",
        "docker-compose.yml",
        "package.json"
    )
    
    $allExist = $true
    foreach ($file in $envFiles) {
        if (Test-Path $file) {
            Write-Host "✅ $file exists"
        } else {
            Write-Host "❌ $file missing"
            $allExist = $false
        }
    }
    
    return $allExist
}

# Test 10: Git Configuration
Test-Step "Git Configuration" {
    Write-Host "Checking Git configuration..."
    
    if (-not (Test-Path ".git")) {
        Write-Host "❌ Not a Git repository"
        return $false
    }
    
    # Check if there are uncommitted changes
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "⚠️  You have uncommitted changes:"
        git status --short
        Write-Host "💡 Commit your changes before deploying"
    } else {
        Write-Host "✅ Working directory is clean"
    }
    
    # Check remote origin
    $remote = git remote get-url origin 2>$null
    if ($remote) {
        Write-Host "✅ Remote origin configured: $remote"
    } else {
        Write-Host "⚠️  No remote origin configured"
    }
    
    return $true
}

# Display Results Summary
Write-Host "`n📊 Test Results Summary" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray

$passed = 0
$failed = 0

foreach ($result in $testResults) {
    if ($result.Status -eq "PASSED") {
        Write-Host "✅ $($result.Name)" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "❌ $($result.Name)" -ForegroundColor Red
        if ($result.Error) {
            Write-Host "   Error: $($result.Error)" -ForegroundColor Red
        }
        $failed++
    }
}

Write-Host "`n📈 Results: $passed passed, $failed failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })

if ($failed -eq 0) {
    Write-Host "`n🎉 All tests passed! Your CI/CD pipeline is ready!" -ForegroundColor Green
    Write-Host "✅ You can safely push to GitHub and trigger the pipeline" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Some tests failed. Please fix the issues before deploying." -ForegroundColor Yellow
    Write-Host "💡 Check the error messages above and run this script again." -ForegroundColor Blue
}

# Next Steps
Write-Host "`n📋 Next Steps" -ForegroundColor Cyan
Write-Host "-" * 30 -ForegroundColor Gray

if ($failed -eq 0) {
    Write-Host "1. Commit any remaining changes:" -ForegroundColor White
    Write-Host "   git add ." -ForegroundColor Cyan
    Write-Host "   git commit -m 'feat: ready for CI/CD deployment'" -ForegroundColor Cyan
    Write-Host "`n2. Push to GitHub to trigger CI/CD:" -ForegroundColor White
    Write-Host "   git push origin main" -ForegroundColor Cyan
    Write-Host "`n3. Monitor the pipeline at:" -ForegroundColor White
    Write-Host "   https://github.com/yourusername/yourrepo/actions" -ForegroundColor Cyan
} else {
    Write-Host "1. Fix the failing tests above" -ForegroundColor White
    Write-Host "2. Run this script again: .\scripts\test-pipeline.ps1" -ForegroundColor Cyan
    Write-Host "3. Once all tests pass, push to GitHub" -ForegroundColor White
}

Write-Host "`n🚀 Happy deploying!" -ForegroundColor Magenta
