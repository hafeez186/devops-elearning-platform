# 🔷 Azure DevOps CI/CD Setup Script
# This script creates the necessary Azure infrastructure for the CI/CD pipeline

param(
    [string]$ResourceGroup = "devops-elearning-rg",
    [string]$Location = "eastus",
    [string]$EnvironmentName = "devops-elearning-env",
    [string]$SubscriptionId = "",
    [string]$DevOpsOrgUrl = "",
    [string]$DevOpsProjectName = "DevOps-ELearning-Platform"
)

Write-Host "🔷 Setting up Azure DevOps CI/CD Pipeline Infrastructure..." -ForegroundColor Blue

# Check if Azure CLI is installed
try {
    az version | Out-Null
    Write-Host "✅ Azure CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI is not installed. Please install it first." -ForegroundColor Red
    Write-Host "📥 Download from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Yellow
    exit 1
}

# Login to Azure
Write-Host "🔑 Logging in to Azure..." -ForegroundColor Cyan
try {
    $account = az account show --query "user.name" -o tsv 2>$null
    if ($account) {
        Write-Host "✅ Already logged in as: $account" -ForegroundColor Green
    } else {
        az login
    }
} catch {
    Write-Host "❌ Azure login failed" -ForegroundColor Red
    exit 1
}

# Set subscription if provided
if ($SubscriptionId) {
    Write-Host "🎯 Setting subscription to: $SubscriptionId" -ForegroundColor Cyan
    az account set --subscription $SubscriptionId
}

# Get current subscription
$currentSub = az account show --query "name" -o tsv
Write-Host "📋 Using subscription: $currentSub" -ForegroundColor White

# Create Resource Group
Write-Host "📁 Creating Resource Group: $ResourceGroup..." -ForegroundColor Cyan
az group create --name $ResourceGroup --location $Location --output table

# Register required resource providers
Write-Host "🔧 Registering required resource providers..." -ForegroundColor Cyan
az provider register --namespace Microsoft.App --wait
az provider register --namespace Microsoft.ContainerService --wait
az provider register --namespace Microsoft.OperationalInsights --wait

# Create Container App Environment
Write-Host "🌐 Creating Container App Environment: $EnvironmentName..." -ForegroundColor Cyan
az containerapp env create `
    --name $EnvironmentName `
    --resource-group $ResourceGroup `
    --location $Location `
    --output table

# Create Container Apps for Production
Write-Host "🚀 Creating Production Container Apps..." -ForegroundColor Cyan

# Backend Production
az containerapp create `
    --name "devops-backend" `
    --resource-group $ResourceGroup `
    --environment $EnvironmentName `
    --image "hafeez654/devops-elearning-backend:latest" `
    --target-port 5000 `
    --ingress external `
    --min-replicas 1 `
    --max-replicas 3 `
    --env-vars "NODE_ENV=production" "PORT=5000" `
    --output table

# Frontend Production
az containerapp create `
    --name "devops-frontend" `
    --resource-group $ResourceGroup `
    --environment $EnvironmentName `
    --image "hafeez654/devops-elearning-frontend:latest" `
    --target-port 80 `
    --ingress external `
    --min-replicas 1 `
    --max-replicas 3 `
    --output table

# Create Container Apps for Staging
Write-Host "🧪 Creating Staging Container Apps..." -ForegroundColor Cyan

# Backend Staging
az containerapp create `
    --name "devops-backend-staging" `
    --resource-group $ResourceGroup `
    --environment $EnvironmentName `
    --image "hafeez654/devops-elearning-backend:latest" `
    --target-port 5000 `
    --ingress external `
    --min-replicas 1 `
    --max-replicas 2 `
    --env-vars "NODE_ENV=staging" "PORT=5000" `
    --output table

# Frontend Staging
az containerapp create `
    --name "devops-frontend-staging" `
    --resource-group $ResourceGroup `
    --environment $EnvironmentName `
    --image "hafeez654/devops-elearning-frontend:latest" `
    --target-port 80 `
    --ingress external `
    --min-replicas 1 `
    --max-replicas 2 `
    --output table

# Create Azure Database for MongoDB (optional)
Write-Host "🗄️ Do you want to create Azure Cosmos DB with MongoDB API? (Y/N)" -ForegroundColor Yellow
$createDB = Read-Host
if ($createDB -eq "Y" -or $createDB -eq "y") {
    $dbAccountName = "devops-elearning-cosmos-" + (Get-Random -Minimum 1000 -Maximum 9999)
    Write-Host "🗄️ Creating Cosmos DB: $dbAccountName..." -ForegroundColor Cyan
    
    az cosmosdb create `
        --name $dbAccountName `
        --resource-group $ResourceGroup `
        --kind MongoDB `
        --server-version 4.2 `
        --default-consistency-level BoundedStaleness `
        --enable-free-tier true `
        --output table
    
    # Get connection string
    $mongoUri = az cosmosdb keys list --name $dbAccountName --resource-group $ResourceGroup --type connection-strings --query "connectionStrings[0].connectionString" -o tsv
    Write-Host "📋 MongoDB Connection String (save this):" -ForegroundColor Yellow
    Write-Host $mongoUri -ForegroundColor Green
}

# Get Container App URLs
Write-Host "🌐 Getting Container App URLs..." -ForegroundColor Cyan
$backendUrl = az containerapp show --name "devops-backend" --resource-group $ResourceGroup --query "properties.configuration.ingress.fqdn" -o tsv
$frontendUrl = az containerapp show --name "devops-frontend" --resource-group $ResourceGroup --query "properties.configuration.ingress.fqdn" -o tsv
$backendStagingUrl = az containerapp show --name "devops-backend-staging" --resource-group $ResourceGroup --query "properties.configuration.ingress.fqdn" -o tsv
$frontendStagingUrl = az containerapp show --name "devops-frontend-staging" --resource-group $ResourceGroup --query "properties.configuration.ingress.fqdn" -o tsv

# Display results
Write-Host "`n🎉 Azure Infrastructure Created Successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

Write-Host "`n🚀 Production URLs:" -ForegroundColor Yellow
Write-Host "Frontend: https://$frontendUrl" -ForegroundColor Green
Write-Host "Backend:  https://$backendUrl" -ForegroundColor Green

Write-Host "`n🧪 Staging URLs:" -ForegroundColor Yellow
Write-Host "Frontend: https://$frontendStagingUrl" -ForegroundColor Green
Write-Host "Backend:  https://$backendStagingUrl" -ForegroundColor Green

Write-Host "`n📋 Azure DevOps Setup:" -ForegroundColor Yellow
Write-Host "1. Go to: https://dev.azure.com" -ForegroundColor White
Write-Host "2. Create new project: $DevOpsProjectName" -ForegroundColor White
Write-Host "3. Import repository from GitHub" -ForegroundColor White
Write-Host "4. Create service connections:" -ForegroundColor White
Write-Host "   - DockerHubConnection (Docker Registry)" -ForegroundColor White
Write-Host "   - AzureServiceConnection (Azure Resource Manager)" -ForegroundColor White
Write-Host "5. Create variable group with:" -ForegroundColor White
Write-Host "   - MONGODB_URI (secure)" -ForegroundColor White
Write-Host "   - JWT_SECRET (secure)" -ForegroundColor White
Write-Host "6. Create pipeline from azure-pipelines.yml" -ForegroundColor White

Write-Host "`n🔧 Next Steps:" -ForegroundColor Yellow
Write-Host "1. ✅ Set up Azure DevOps project" -ForegroundColor White
Write-Host "2. ✅ Configure service connections" -ForegroundColor White
Write-Host "3. ✅ Create variable groups" -ForegroundColor White
Write-Host "4. ✅ Create pipeline from azure-pipelines.yml" -ForegroundColor White
Write-Host "5. ✅ Test pipeline with a commit to develop branch" -ForegroundColor White

Write-Host "`n📚 Documentation:" -ForegroundColor Yellow
Write-Host "- Full setup guide: docs/AZURE_DEVOPS_SETUP.md" -ForegroundColor White
Write-Host "- Pipeline config: azure-pipelines.yml" -ForegroundColor White

Write-Host "`n✨ Your Azure DevOps CI/CD infrastructure is ready!" -ForegroundColor Green
