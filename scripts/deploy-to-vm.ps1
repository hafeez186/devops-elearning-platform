# 🚀 VM Deployment Script for DevOps E-Learning Platform (PowerShell)

param(
    [string]$VMUser = "your-username",
    [string]$VMHost = "your-vm-ip-address", 
    [string]$DockerUsername = "yourusername"
)

Write-Host "🚀 Deploying DevOps E-Learning Platform to VM..." -ForegroundColor Blue
Write-Host "================================================" -ForegroundColor Blue

# Step 1: Build images locally
Write-Host "🔨 Building Docker images..." -ForegroundColor Yellow
try {
    docker build -t "$DockerUsername/devops-frontend:latest" ./client
    docker build -t "$DockerUsername/devops-backend:latest" ./server
    Write-Host "✅ Images built successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to build images: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Push to registry
Write-Host "📤 Pushing to Docker Hub..." -ForegroundColor Yellow
try {
    docker push "$DockerUsername/devops-frontend:latest"
    docker push "$DockerUsername/devops-backend:latest"
    Write-Host "✅ Images pushed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to push images. Make sure you're logged in: docker login" -ForegroundColor Red
    exit 1
}

# Step 3: Update docker-compose.prod.yml
Write-Host "📝 Updating docker-compose.prod.yml..." -ForegroundColor Yellow
$composeContent = Get-Content docker-compose.prod.yml
$composeContent = $composeContent -replace "hafeez654/devops-elearning-frontend:latest", "$DockerUsername/devops-frontend:latest"
$composeContent = $composeContent -replace "hafeez654/devops-elearning-backend:latest", "$DockerUsername/devops-backend:latest"
Set-Content docker-compose.prod.yml $composeContent

# Step 4: Copy files to VM using SCP (requires OpenSSH or WSL)
Write-Host "📁 Copying files to VM..." -ForegroundColor Yellow
try {
    scp docker-compose.prod.yml "$VMUser@$VMHost":/home/$VMUser/
    Write-Host "✅ Files copied successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to copy files. Make sure SSH is configured and VM is accessible" -ForegroundColor Red
    Write-Host "💡 Alternative: Manually copy docker-compose.prod.yml to your VM" -ForegroundColor Cyan
}

# Step 5: Deploy on VM
Write-Host "🚀 Deploying on VM..." -ForegroundColor Yellow
$deployScript = @"
# Stop existing containers
docker-compose -f docker-compose.prod.yml down

# Pull latest images  
docker-compose -f docker-compose.prod.yml pull

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Show status
docker-compose -f docker-compose.prod.yml ps

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://`$(curl -s ifconfig.me):3000"
echo "🔧 Backend: http://`$(curl -s ifconfig.me):5000"
"@

try {
    ssh "$VMUser@$VMHost" $deployScript
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to deploy on VM" -ForegroundColor Red
    Write-Host "💡 Try running these commands manually on your VM:" -ForegroundColor Cyan
    Write-Host $deployScript -ForegroundColor White
}

Write-Host ""
Write-Host "🎉 Deployment finished!" -ForegroundColor Magenta
Write-Host "🔍 Check VM status with SSH:" -ForegroundColor Cyan
Write-Host "ssh $VMUser@$VMHost 'docker-compose -f docker-compose.prod.yml ps'" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your application should be available at:" -ForegroundColor Cyan
Write-Host "Frontend: http://$VMHost:3000" -ForegroundColor White
Write-Host "Backend:  http://$VMHost:5000" -ForegroundColor White
