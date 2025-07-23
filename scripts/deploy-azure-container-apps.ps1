# 🔵 Azure Container Apps Deployment Script (PowerShell)
# This script deploys your DevOps e-learning platform to Azure Container Apps

param(
    [string]$ResourceGroup = "devops-elearning-rg",
    [string]$Location = "eastus",
    [string]$EnvironmentName = "devops-elearning-env"
)

Write-Host "🔵 Starting Azure Container Apps Deployment..." -ForegroundColor Blue

# Configuration
$BackendApp = "devops-backend"
$FrontendApp = "devops-frontend"
$BackendImage = "hafeez654/devops-elearning-backend:latest"
$FrontendImage = "hafeez654/devops-elearning-frontend:latest"

Write-Host "📋 Configuration:" -ForegroundColor Cyan
Write-Host "  Resource Group: $ResourceGroup" -ForegroundColor White
Write-Host "  Location: $Location" -ForegroundColor White
Write-Host "  Backend Image: $BackendImage" -ForegroundColor White
Write-Host "  Frontend Image: $FrontendImage" -ForegroundColor White
Write-Host ""

# Check if Azure CLI is installed
try {
    az --version | Out-Null
    Write-Host "✅ Azure CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI not found. Please install from: https://aka.ms/installazurecliwindows" -ForegroundColor Red
    exit 1
}

# Check if logged in to Azure
try {
    az account show | Out-Null
    Write-Host "✅ Azure login verified" -ForegroundColor Green
} catch {
    Write-Host "❌ Not logged in to Azure. Please run 'az login' first." -ForegroundColor Red
    exit 1
}

# Install Container Apps extension
Write-Host "🔧 Installing Container Apps extension..." -ForegroundColor Yellow
az extension add --name containerapp --upgrade --only-show-errors

# Create resource group
Write-Host "📂 Creating resource group..." -ForegroundColor Yellow
az group create --name $ResourceGroup --location $Location --only-show-errors

# Create Container Apps environment
Write-Host "🌍 Creating Container Apps environment..." -ForegroundColor Yellow
az containerapp env create `
  --name $EnvironmentName `
  --resource-group $ResourceGroup `
  --location $Location `
  --only-show-errors

Write-Host "✅ Environment created: $EnvironmentName" -ForegroundColor Green

# Deploy Backend
Write-Host "🚀 Deploying Backend..." -ForegroundColor Yellow
az containerapp create `
  --name $BackendApp `
  --resource-group $ResourceGroup `
  --environment $EnvironmentName `
  --image $BackendImage `
  --target-port 5000 `
  --ingress external `
  --min-replicas 1 `
  --max-replicas 3 `
  --cpu 1.0 `
  --memory 2Gi `
  --env-vars NODE_ENV=production JWT_SECRET=azure-super-secret-key-change-me PORT=5000 `
  --only-show-errors

# Get backend URL
$BackendUrl = az containerapp show `
  --name $BackendApp `
  --resource-group $ResourceGroup `
  --query properties.configuration.ingress.fqdn `
  --output tsv

Write-Host "✅ Backend deployed: https://$BackendUrl" -ForegroundColor Green

# Deploy Frontend
Write-Host "🚀 Deploying Frontend..." -ForegroundColor Yellow
az containerapp create `
  --name $FrontendApp `
  --resource-group $ResourceGroup `
  --environment $EnvironmentName `
  --image $FrontendImage `
  --target-port 80 `
  --ingress external `
  --min-replicas 1 `
  --max-replicas 3 `
  --cpu 0.5 `
  --memory 1Gi `
  --only-show-errors

# Get frontend URL
$FrontendUrl = az containerapp show `
  --name $FrontendApp `
  --resource-group $ResourceGroup `
  --query properties.configuration.ingress.fqdn `
  --output tsv

Write-Host "✅ Frontend deployed: https://$FrontendUrl" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Your Application URLs:" -ForegroundColor Cyan
Write-Host "  🌐 Frontend: https://$FrontendUrl" -ForegroundColor White
Write-Host "  🔧 Backend:  https://$BackendUrl" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Set up Azure Cosmos DB for MongoDB" -ForegroundColor White
Write-Host "  2. Update backend MONGODB_URI environment variable" -ForegroundColor White
Write-Host "  3. Configure custom domain (optional)" -ForegroundColor White
Write-Host "  4. Set up monitoring and alerts" -ForegroundColor White
Write-Host ""
Write-Host "💡 To update environment variables:" -ForegroundColor Cyan
Write-Host "   az containerapp update --name $BackendApp --resource-group $ResourceGroup --set-env-vars MONGODB_URI=your-cosmos-connection-string" -ForegroundColor Gray
Write-Host ""
Write-Host "🗑️  To delete everything:" -ForegroundColor Red
Write-Host "   az group delete --name $ResourceGroup --yes --no-wait" -ForegroundColor Gray
