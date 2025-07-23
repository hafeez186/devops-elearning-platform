# 🔵 Azure Deployment Guide for DevOps E-Learning Platform

## 🎯 Your Published Docker Images
- **Backend:** `hafeez654/devops-elearning-backend:latest`
- **Frontend:** `hafeez654/devops-elearning-frontend:latest`

## 🚀 Azure Deployment Options

### Option 1: Azure Container Instances (ACI) - Simplest
**Best for:** Quick deployment, testing, small-scale applications

#### Step 1: Install Azure CLI
```powershell
# Install Azure CLI for Windows
winget install Microsoft.AzureCLI
# OR download from: https://aka.ms/installazurecliwindows
```

#### Step 2: Login and Deploy
```bash
# Login to Azure
az login

# Create resource group
az group create --name devops-elearning-rg --location eastus

# Deploy MongoDB
az container create \
  --resource-group devops-elearning-rg \
  --name mongodb \
  --image mongo:latest \
  --ports 27017 \
  --ip-address Public \
  --memory 2 \
  --cpu 1

# Deploy Backend
az container create \
  --resource-group devops-elearning-rg \
  --name backend \
  --image hafeez654/devops-elearning-backend:latest \
  --ports 5000 \
  --ip-address Public \
  --memory 1 \
  --cpu 1 \
  --environment-variables \
    NODE_ENV=production \
    MONGODB_URI=mongodb://[MONGODB_IP]:27017/devops-elearning \
    JWT_SECRET=your-secret-key

# Deploy Frontend
az container create \
  --resource-group devops-elearning-rg \
  --name frontend \
  --image hafeez654/devops-elearning-frontend:latest \
  --ports 80 \
  --ip-address Public \
  --memory 1 \
  --cpu 1
```

### Option 2: Azure Container Apps - Recommended
**Best for:** Production applications, auto-scaling, modern serverless containers

#### Step 1: Create Container App Environment
```bash
# Install Container Apps extension
az extension add --name containerapp

# Create resource group
az group create --name devops-elearning-rg --location eastus

# Create Container Apps environment
az containerapp env create \
  --name devops-elearning-env \
  --resource-group devops-elearning-rg \
  --location eastus
```

#### Step 2: Deploy Applications
```bash
# Deploy Backend
az containerapp create \
  --name backend \
  --resource-group devops-elearning-rg \
  --environment devops-elearning-env \
  --image hafeez654/devops-elearning-backend:latest \
  --target-port 5000 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 5 \
  --env-vars \
    NODE_ENV=production \
    JWT_SECRET=your-secret-key \
    MONGODB_URI=mongodb://cosmos-connection-string

# Deploy Frontend
az containerapp create \
  --name frontend \
  --resource-group devops-elearning-rg \
  --environment devops-elearning-env \
  --image hafeez654/devops-elearning-frontend:latest \
  --target-port 80 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 3
```

### Option 3: Azure App Service - Docker Container
**Best for:** Traditional web apps, easy management, built-in CI/CD

#### Via Azure Portal
1. Go to **Azure Portal** → **Create a resource**
2. Search for **"Web App"**
3. Configure:
   - **Publish:** Docker Container
   - **Operating System:** Linux
   - **Region:** East US
   - **Docker Options:** Single Container
   - **Image Source:** Docker Hub
   - **Image:** `hafeez654/devops-elearning-frontend:latest`

#### Via Azure CLI
```bash
# Create App Service Plan
az appservice plan create \
  --name devops-elearning-plan \
  --resource-group devops-elearning-rg \
  --is-linux \
  --sku B1

# Create Frontend Web App
az webapp create \
  --name devops-frontend-app \
  --resource-group devops-elearning-rg \
  --plan devops-elearning-plan \
  --deployment-container-image-name hafeez654/devops-elearning-frontend:latest

# Create Backend Web App
az webapp create \
  --name devops-backend-app \
  --resource-group devops-elearning-rg \
  --plan devops-elearning-plan \
  --deployment-container-image-name hafeez654/devops-elearning-backend:latest

# Configure backend environment variables
az webapp config appsettings set \
  --name devops-backend-app \
  --resource-group devops-elearning-rg \
  --settings \
    NODE_ENV=production \
    JWT_SECRET=your-secret-key \
    MONGODB_URI=your-cosmos-db-connection
```

### Option 4: Azure Kubernetes Service (AKS) - Enterprise
**Best for:** Large-scale applications, microservices, full orchestration

#### Step 1: Create AKS Cluster
```bash
# Create AKS cluster
az aks create \
  --resource-group devops-elearning-rg \
  --name devops-aks-cluster \
  --node-count 2 \
  --enable-addons monitoring \
  --generate-ssh-keys

# Get credentials
az aks get-credentials \
  --resource-group devops-elearning-rg \
  --name devops-aks-cluster
```

#### Step 2: Create Kubernetes Manifests
Create `azure-k8s-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: hafeez654/devops-elearning-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: NODE_ENV
          value: "production"
        - name: JWT_SECRET
          value: "your-secret-key"
        - name: MONGODB_URI
          value: "mongodb://mongo-service:27017/devops-elearning"
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
  - port: 5000
    targetPort: 5000
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: hafeez654/devops-elearning-frontend:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

#### Step 3: Deploy to AKS
```bash
kubectl apply -f azure-k8s-deployment.yaml
kubectl get services --watch
```

## 🗄️ Database Options for Azure

### Option 1: Azure Cosmos DB (Recommended)
```bash
# Create Cosmos DB account with MongoDB API
az cosmosdb create \
  --name devops-cosmos-db \
  --resource-group devops-elearning-rg \
  --kind MongoDB \
  --locations regionName=eastus

# Get connection string
az cosmosdb keys list \
  --name devops-cosmos-db \
  --resource-group devops-elearning-rg \
  --type connection-strings
```

### Option 2: Azure Database for MongoDB
- Managed MongoDB service
- Full compatibility with your existing code
- Built-in backup and scaling

### Option 3: Container-based MongoDB
- Deploy MongoDB as a container alongside your app
- Good for development/testing
- Requires persistent storage setup

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# Backend
NODE_ENV=production
MONGODB_URI=mongodb://your-azure-cosmos-connection
JWT_SECRET=your-super-secure-secret
PORT=5000

# Frontend (build-time)
REACT_APP_API_URL=https://your-backend-app.azurewebsites.net
```

## 📋 Quick Start Checklist

### 1. Choose Your Deployment Method
- [ ] **Container Instances** (Simplest)
- [ ] **Container Apps** (Recommended)
- [ ] **App Service** (Traditional)
- [ ] **AKS** (Enterprise)

### 2. Set Up Database
- [ ] Create Azure Cosmos DB with MongoDB API
- [ ] Get connection string
- [ ] Update environment variables

### 3. Deploy Applications
- [ ] Deploy backend with environment variables
- [ ] Deploy frontend
- [ ] Configure custom domains (optional)
- [ ] Set up SSL certificates

### 4. Post-Deployment
- [ ] Test application functionality
- [ ] Set up monitoring and alerts
- [ ] Configure scaling rules
- [ ] Set up backup procedures

## 💰 Cost Considerations

### Container Instances
- Pay per second
- Good for testing: ~$10-30/month

### Container Apps
- Pay for resources used
- Auto-scaling: ~$20-50/month

### App Service
- Fixed pricing plans
- B1 Basic: ~$13/month per app

### AKS
- Pay for node VMs
- 2 nodes: ~$70-150/month

## 🎯 Recommended Quick Start

For fastest deployment, I recommend **Azure Container Apps**:

1. Install Azure CLI
2. Run the Container Apps commands above
3. Use Azure Cosmos DB for MongoDB
4. Your app will be live in ~10 minutes!

Would you like me to help you with any specific deployment option?
