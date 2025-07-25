# 🚀 Azure DevOps Pipeline - Quick Start Guide
## Deploy Your DevOps E-Learning Platform with Professional CI/CD

---

## ✨ **What You Already Have**

Your repository is **Azure DevOps ready**! Here's what's configured:

✅ **Complete Pipeline** (`azure-pipelines.yml`)  
✅ **Multi-stage deployment** (Build → Test → Deploy → Verify)  
✅ **Docker integration** for both frontend and backend  
✅ **PostgreSQL support** with Prisma  
✅ **Security scanning** built-in  
✅ **Health checks** automated  

---

## 🎯 **30-Minute Deployment Plan**

### **Phase 1: Azure Setup (10 minutes)**
1. Create Azure account (free $200 credit)
2. Set up Azure DevOps organization
3. Create basic Azure resources

### **Phase 2: Pipeline Setup (10 minutes)**  
1. Import your GitHub repo
2. Configure service connections
3. Set environment variables

### **Phase 3: Deploy & Verify (10 minutes)**
1. Trigger first deployment
2. Monitor pipeline execution
3. Verify everything works

---

## 🏗️ **Step 1: Azure Infrastructure (5 commands)**

```bash
# Login to Azure
az login

# Create resource group
az group create --name devops-elearning-rg --location eastus

# Create PostgreSQL database
az postgres flexible-server create \
  --resource-group devops-elearning-rg \
  --name devops-elearning-db \
  --location eastus \
  --admin-user dbadmin \
  --admin-password SecurePass123!

# Create Container Apps environment
az containerapp env create \
  --name devops-elearning-env \
  --resource-group devops-elearning-rg \
  --location eastus

# Create placeholder container apps
az containerapp create --name devops-backend --resource-group devops-elearning-rg --environment devops-elearning-env --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest --target-port 5000 --ingress external
az containerapp create --name devops-frontend --resource-group devops-elearning-rg --environment devops-elearning-env --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest --target-port 80 --ingress external
```

---

## 🔧 **Step 2: Azure DevOps Setup**

### **2.1 Create Project**
1. **Go to**: https://dev.azure.com
2. **Create**: New project "DevOps-ELearning-Platform"
3. **Import**: Your GitHub repository

### **2.2 Service Connections**
**Azure Connection**:
- Project Settings → Service Connections
- New → Azure Resource Manager
- Service Principal (automatic)
- Name: `AzureServiceConnection`

**Docker Hub Connection**:
- New → Docker Registry  
- Docker Hub credentials
- Name: `DockerHubConnection`

### **2.3 Environment Variables**
Create variable group: `DevOps-ELearning-Variables`

```yaml
DATABASE_URL: postgresql://dbadmin:SecurePass123!@devops-elearning-db.postgres.database.azure.com:5432/postgres?sslmode=require
JWT_SECRET: 8f2a4e6c9b1d3f5a7c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c6e8b0d2f4a
NODE_ENV: production
PORT: 5000
CORS_ORIGIN: https://devops-frontend.proudsky-12345678.eastus.azurecontainerapps.io
```

---

## 🚀 **Step 3: Deploy**

### **3.1 Trigger Staging Deployment**
```bash
# Push to develop branch
git checkout develop
git push origin develop
```

### **3.2 Trigger Production Deployment**  
```bash
# Push to main branch
git checkout main
git merge develop  
git push origin main
```

### **3.3 Monitor Pipeline**
- Go to Pipelines → Your Pipeline
- Watch stages execute:
  - ✅ Build (5-8 min)
  - ✅ Security Scan (2-3 min)
  - ✅ Deploy (3-5 min)  
  - ✅ Health Check (1-2 min)

---

## ✅ **Step 4: Verify Success**

### **4.1 Get Your URLs**
```bash
# Get frontend URL
az containerapp show --name devops-frontend --resource-group devops-elearning-rg --query properties.configuration.ingress.fqdn

# Get backend URL
az containerapp show --name devops-backend --resource-group devops-elearning-rg --query properties.configuration.ingress.fqdn
```

### **4.2 Test Everything**
- **Frontend**: Should show your React app
- **Backend Health**: `/health` endpoint should return `{"status": "OK"}`
- **API**: `/api` endpoint should show API documentation
- **Features**: User registration, login, course browsing

---

## 🎯 **Your Pipeline Features**

### **Automated Stages**
```
📦 Build Stage
├── Frontend build (React + TypeScript)
├── Backend build (Node.js + Prisma)
├── Unit tests with coverage
└── Docker image creation

🔒 Security Stage  
├── NPM vulnerability scanning
├── Dependency audit
└── Security report generation

🚀 Deploy Stage
├── Container registry push
├── Azure Container Apps update
├── Environment configuration
└── Database migration

✅ Verify Stage
├── Health check validation
├── API endpoint testing
└── Success/failure reporting
```

### **Branch Strategy**
- **`main`**: Triggers production deployment
- **`develop`**: Triggers staging deployment  
- **`feature/*`**: Runs build and tests only

---

## 🚨 **Troubleshooting**

### **Common Issues & Solutions**

**Pipeline fails on Docker build**:
```bash
# Check service connection
Project Settings → Service Connections → Test connection
```

**Container App deployment fails**:
```bash
# Verify resources exist
az containerapp list --resource-group devops-elearning-rg
```

**Health check fails**:
```bash
# Check database connection
# Verify environment variables are set correctly
```

**CORS errors**:
```bash
# Update CORS_ORIGIN with actual frontend URL
# Get URL: az containerapp show --name devops-frontend --resource-group devops-elearning-rg --query properties.configuration.ingress.fqdn
```

---

## 💰 **Cost Breakdown**

### **Free Tier Included**
- ✅ **Azure DevOps**: 1800 build minutes/month
- ✅ **Container Apps**: 180,000 vCPU-seconds
- ✅ **Container Registry**: 100GB storage

### **Estimated Monthly Cost**
- **PostgreSQL**: ~$15-30/month (Burstable tier)
- **Container Apps**: ~$0-10/month (free tier covers most usage)
- **Total**: **~$15-40/month** for production app

---

## 🎉 **Success Checklist**

After completion, you'll have:

- [x] **Enterprise CI/CD Pipeline** with Azure DevOps
- [x] **Automated Testing** and security scanning
- [x] **Multi-environment** deployment (staging + production)
- [x] **Scalable Infrastructure** on Azure Container Apps
- [x] **Managed Database** with PostgreSQL
- [x] **Professional DevOps** practices
- [x] **Zero-downtime** deployments
- [x] **Health monitoring** and automated checks

---

## 🔗 **Quick Links**

- **Azure Portal**: https://portal.azure.com
- **Azure DevOps**: https://dev.azure.com
- **Pipeline Documentation**: `AZURE_DEVOPS_PIPELINE_SETUP.md`
- **Detailed Guide**: `AZURE_DEPLOYMENT_GUIDE.md`

---

## 🆘 **Need Help?**

**Your pipeline is already configured!** Just follow the steps above.

If you encounter issues:
1. Check the troubleshooting section
2. Review pipeline logs in Azure DevOps
3. Verify all service connections are working
4. Ensure environment variables are set correctly

**Ready to deploy to Azure with professional CI/CD? Let's go!** 🚀
