#!/bin/bash

# 🔵 Azure Container Apps Deployment Script
# This script deploys your DevOps e-learning platform to Azure Container Apps

set -e

echo "🔵 Starting Azure Container Apps Deployment..."

# Configuration
RESOURCE_GROUP="devops-elearning-rg"
LOCATION="eastus"
ENVIRONMENT_NAME="devops-elearning-env"
BACKEND_APP="devops-backend"
FRONTEND_APP="devops-frontend"

# Your Docker images
BACKEND_IMAGE="hafeez654/devops-elearning-backend:latest"
FRONTEND_IMAGE="hafeez654/devops-elearning-frontend:latest"

echo "📋 Configuration:"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  Location: $LOCATION"
echo "  Backend Image: $BACKEND_IMAGE"
echo "  Frontend Image: $FRONTEND_IMAGE"
echo ""

# Check if logged in to Azure
echo "🔐 Checking Azure login..."
if ! az account show > /dev/null 2>&1; then
    echo "❌ Not logged in to Azure. Please run 'az login' first."
    exit 1
fi

echo "✅ Azure login verified"

# Install Container Apps extension if not present
echo "🔧 Installing Container Apps extension..."
az extension add --name containerapp --upgrade --only-show-errors

# Create resource group
echo "📂 Creating resource group..."
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION \
  --only-show-errors

# Create Container Apps environment
echo "🌍 Creating Container Apps environment..."
az containerapp env create \
  --name $ENVIRONMENT_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --only-show-errors

echo "✅ Environment created: $ENVIRONMENT_NAME"

# Deploy Backend
echo "🚀 Deploying Backend..."
az containerapp create \
  --name $BACKEND_APP \
  --resource-group $RESOURCE_GROUP \
  --environment $ENVIRONMENT_NAME \
  --image $BACKEND_IMAGE \
  --target-port 5000 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 3 \
  --cpu 1.0 \
  --memory 2Gi \
  --env-vars \
    NODE_ENV=production \
    JWT_SECRET=azure-super-secret-key-change-me \
    PORT=5000 \
  --only-show-errors

# Get backend URL
BACKEND_URL=$(az containerapp show \
  --name $BACKEND_APP \
  --resource-group $RESOURCE_GROUP \
  --query properties.configuration.ingress.fqdn \
  --output tsv)

echo "✅ Backend deployed: https://$BACKEND_URL"

# Deploy Frontend
echo "🚀 Deploying Frontend..."
az containerapp create \
  --name $FRONTEND_APP \
  --resource-group $RESOURCE_GROUP \
  --environment $ENVIRONMENT_NAME \
  --image $FRONTEND_IMAGE \
  --target-port 80 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 3 \
  --cpu 0.5 \
  --memory 1Gi \
  --only-show-errors

# Get frontend URL
FRONTEND_URL=$(az containerapp show \
  --name $FRONTEND_APP \
  --resource-group $RESOURCE_GROUP \
  --query properties.configuration.ingress.fqdn \
  --output tsv)

echo "✅ Frontend deployed: https://$FRONTEND_URL"

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📋 Your Application URLs:"
echo "  🌐 Frontend: https://$FRONTEND_URL"
echo "  🔧 Backend:  https://$BACKEND_URL"
echo ""
echo "⚠️  Next Steps:"
echo "  1. Set up Azure Cosmos DB for MongoDB"
echo "  2. Update backend MONGODB_URI environment variable"
echo "  3. Configure custom domain (optional)"
echo "  4. Set up monitoring and alerts"
echo ""
echo "💡 To update environment variables:"
echo "   az containerapp update --name $BACKEND_APP --resource-group $RESOURCE_GROUP --set-env-vars MONGODB_URI=your-cosmos-connection-string"
echo ""
echo "🗑️  To delete everything:"
echo "   az group delete --name $RESOURCE_GROUP --yes --no-wait"
