# 🔷 Azure DevOps CI/CD Setup Guide

## 📋 **Overview**

This guide helps you set up a complete CI/CD pipeline in Azure DevOps for your DevOps E-Learning Platform.

## 🚀 **Features of This Pipeline**

✅ **Automated Building** - Builds both frontend and backend  
✅ **Testing** - Runs unit tests with coverage reports  
✅ **Security Scanning** - NPM audit for vulnerabilities  
✅ **Docker Images** - Builds and pushes to Docker Hub  
✅ **Multi-Environment** - Staging and Production deployments  
✅ **Health Checks** - Post-deployment verification  
✅ **Branch-based Deployment** - develop→staging, main→production  

## 🛠️ **Setup Instructions**

### **Step 1: Create Azure DevOps Project**

1. **Go to**: [dev.azure.com](https://dev.azure.com)
2. **Create new project**: "DevOps E-Learning Platform"
3. **Choose**: Git for version control
4. **Visibility**: Public or Private

### **Step 2: Connect Your Repository**

#### **Option A: Import from GitHub**
1. Go to **Repos** → **Import repository**
2. **Source URL**: `https://github.com/hafeez186/devops-elearning-platform.git`
3. **Name**: `devops-elearning-platform`

#### **Option B: Connect Existing GitHub Repo**
1. Go to **Pipelines** → **Create Pipeline**
2. **Choose**: GitHub
3. **Select**: Your repository
4. **Authorize** Azure DevOps to access GitHub

### **Step 3: Create Service Connections**

#### **Docker Hub Connection**
1. Go to **Project Settings** → **Service connections**
2. **Create**: Docker Registry
3. **Registry type**: Docker Hub
4. **Connection name**: `DockerHubConnection`
5. **Credentials**: Your Docker Hub username/password

#### **Azure Subscription Connection**
1. **Create**: Azure Resource Manager
2. **Authentication**: Service principal (automatic)
3. **Subscription**: Your Azure subscription
4. **Connection name**: `AzureServiceConnection`

### **Step 4: Set Up Variable Groups**

1. **Go to**: Pipelines → Library → Variable groups
2. **Create**: `devops-elearning-variables`

#### **Required Variables:**
| Variable | Value | Secure |
|----------|-------|--------|
| `MONGODB_URI` | `mongodb://mongo:27017/devops-elearning` | ✅ |
| `JWT_SECRET` | Your JWT secret | ✅ |
| `subscriptionId` | Your Azure subscription ID | ❌ |

### **Step 5: Create Environments**

1. **Go to**: Pipelines → Environments
2. **Create**: 
   - `staging` environment
   - `production` environment
3. **Add approvals** for production environment

### **Step 6: Create the Pipeline**

1. **Go to**: Pipelines → Create Pipeline
2. **Choose**: Azure Repos Git
3. **Select**: Your repository
4. **Configure**: Existing Azure Pipelines YAML file
5. **Path**: `/azure-pipelines.yml`

## 🗂️ **Pipeline Structure**

### **Stage 1: Build and Test**
```yaml
- Frontend Build (Node.js 18, npm ci, test, lint, Docker build)
- Backend Build (Node.js 18, npm ci, test, lint, Docker build)
- Test Results Publishing
- Docker Image Push to Docker Hub
```

### **Stage 2: Security Scanning**
```yaml
- NPM Audit (vulnerability scanning)
- Dependency checking
- Security validation
```

### **Stage 3: Deploy Staging** (develop branch)
```yaml
- Deploy to Azure Container Apps staging
- Environment-specific configuration
- Staging health checks
```

### **Stage 4: Deploy Production** (main branch)
```yaml
- Deploy to Azure Container Apps production
- Production environment variables
- Infrastructure updates
```

### **Stage 5: Post-Deployment**
```yaml
- Health check endpoints
- Integration testing
- Monitoring validation
```

## 🌍 **Environment Configuration**

### **Staging Environment:**
- **Branch**: `develop`
- **URL**: `https://devops-backend-staging.azurecontainerapps.io`
- **Database**: Staging MongoDB
- **Auto-deploy**: Yes

### **Production Environment:**
- **Branch**: `main`
- **URL**: `https://devops-backend.azurecontainerapps.io`
- **Database**: Production MongoDB
- **Auto-deploy**: With approval gates

## 🔐 **Security Features**

### **Pipeline Security:**
- ✅ **Service connections** with least privilege
- ✅ **Variable groups** with secure variables
- ✅ **Environment approvals** for production
- ✅ **Branch protection** rules

### **Application Security:**
- ✅ **NPM audit** scanning
- ✅ **Docker image** security
- ✅ **Environment variable** management
- ✅ **HTTPS enforcement**

## 📊 **Monitoring and Reporting**

### **Build Reports:**
- ✅ **Test results** with coverage
- ✅ **Build artifacts** tracking
- ✅ **Docker image** versions
- ✅ **Deployment history**

### **Quality Gates:**
- ✅ **All tests must pass**
- ✅ **Code coverage** requirements
- ✅ **Security scan** validation
- ✅ **Health check** success

## 🚀 **Deployment Workflow**

### **Development Workflow:**
```
1. Developer pushes to feature branch
2. Create Pull Request to develop
3. Pipeline runs build + tests
4. Merge to develop triggers staging deployment
5. Testing in staging environment
6. Create Pull Request to main
7. Approval process for production
8. Merge to main triggers production deployment
```

### **Rollback Strategy:**
```bash
# Azure CLI rollback commands
az containerapp revision list --name devops-backend --resource-group devops-elearning-rg
az containerapp revision activate --revision previous-revision-name
```

## 🛠️ **Azure Infrastructure Setup**

### **Required Azure Resources:**
1. **Resource Group**: `devops-elearning-rg`
2. **Container App Environment**: `devops-elearning-env`
3. **Container Apps**: 
   - `devops-backend`
   - `devops-frontend`
   - `devops-backend-staging`
   - `devops-frontend-staging`
4. **Azure Container Registry** (optional)
5. **Azure Database for MongoDB** (optional)

### **Create Infrastructure Script:**
```bash
# Create using provided PowerShell script
./scripts/deploy-azure-container-apps.ps1

# Or using Azure CLI
az group create --name devops-elearning-rg --location eastus
az containerapp env create --name devops-elearning-env --resource-group devops-elearning-rg --location eastus
```

## 📈 **Pipeline Optimization**

### **Performance Tips:**
- ✅ **Cache npm dependencies** between builds
- ✅ **Parallel job execution** for frontend/backend
- ✅ **Docker layer caching**
- ✅ **Incremental builds**

### **Cost Optimization:**
- ✅ **Use free Azure DevOps** tier (1800 build minutes)
- ✅ **Optimize build times** with caching
- ✅ **Clean up old artifacts** automatically
- ✅ **Use self-hosted agents** if needed

## 🔧 **Troubleshooting**

### **Common Issues:**

#### **Service Connection Errors**
```
Error: Could not find service connection
Solution: Verify service connection names match pipeline variables
```

#### **Docker Push Failures**
```
Error: unauthorized: authentication required
Solution: Check Docker Hub credentials in service connection
```

#### **Azure CLI Errors**
```
Error: The subscription is not registered for this resource
Solution: Register Microsoft.App resource provider
```

#### **Health Check Failures**
```
Error: Health check endpoint not responding
Solution: Verify container is running and endpoint is accessible
```

### **Debug Commands:**
```bash
# Check Azure CLI context
az account show

# List container apps
az containerapp list --resource-group devops-elearning-rg

# View container logs
az containerapp logs show --name devops-backend --resource-group devops-elearning-rg
```

## 📚 **Additional Resources**

- **Azure DevOps Documentation**: [docs.microsoft.com/azure/devops](https://docs.microsoft.com/azure/devops)
- **Azure Container Apps**: [docs.microsoft.com/azure/container-apps](https://docs.microsoft.com/azure/container-apps)
- **YAML Pipeline Reference**: [docs.microsoft.com/azure/devops/pipelines/yaml-schema](https://docs.microsoft.com/azure/devops/pipelines/yaml-schema)

## 🎯 **Success Metrics**

After setup, you should achieve:
- ✅ **Build time**: < 10 minutes
- ✅ **Deployment time**: < 5 minutes
- ✅ **Test coverage**: > 80%
- ✅ **Zero-downtime** deployments
- ✅ **Automated rollbacks** on failure

Your Azure DevOps CI/CD pipeline is now ready for enterprise-grade deployment! 🚀
