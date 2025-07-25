# 🔷 Azure DevOps Pipeline Configuration Checklist

## ✅ **Pre-Requirements**
- [ ] Azure account (free tier is fine)
- [ ] Docker Hub account (free)
- [ ] GitHub repository with your code
- [ ] PostgreSQL database (Azure/Supabase/Render)

---

## 🎯 **Step-by-Step Configuration**

### **Step 1: Create Azure DevOps Project**
1. **Go to**: [https://dev.azure.com](https://dev.azure.com)
2. **Sign in** with your Microsoft account
3. **Create new organization** (if first time)
4. **Click**: "+ New project"
5. **Settings**:
   - **Project name**: `DevOps-ELearning-Platform`
   - **Visibility**: Private
   - **Version control**: Git
   - **Work item process**: Basic
6. **Click**: "Create"

### **Step 2: Import Repository**
1. **Go to**: "Repos" in your new project
2. **Click**: "Import repository"
3. **Repository type**: Git
4. **Clone URL**: `https://github.com/hafeez186/devops-elearning-platform.git`
5. **Click**: "Import"
6. **Wait** for import to complete (~2 minutes)

### **Step 3: Create Service Connections**

#### **A. Docker Hub Connection**
1. **Navigate**: Project Settings (bottom left) → Service connections
2. **Click**: "New service connection"
3. **Choose**: "Docker Registry"
4. **Settings**:
   - **Registry type**: Docker Hub
   - **Connection name**: `DockerHubConnection` (exact name)
   - **Docker ID**: Your Docker Hub username
   - **Password**: Your Docker Hub password
5. **✅ Check**: "Grant access permission to all pipelines"
6. **Click**: "Verify and save"

#### **B. Azure Service Connection**
1. **Click**: "New service connection"
2. **Choose**: "Azure Resource Manager"
3. **Settings**:
   - **Authentication method**: Service principal (automatic)
   - **Scope level**: Subscription
   - **Subscription**: Select your Azure subscription
   - **Service connection name**: `AzureServiceConnection` (exact name)
5. **✅ Check**: "Grant access permission to all pipelines"
6. **Click**: "Save"

### **Step 4: Create Variable Group**
1. **Navigate**: Pipelines → Library
2. **Click**: "+ Variable group"
3. **Variable group name**: `devops-elearning-variables` (exact name)
4. **Add variables**:

| Variable Name | Value | Make Secret |
|---------------|-------|-------------|
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db?sslmode=require` | ✅ Yes |
| `JWT_SECRET` | `your-super-secret-jwt-key-256-bit` | ✅ Yes |
| `subscriptionId` | Your Azure subscription ID | ❌ No |

5. **Click**: "Save"

### **Step 5: Create Environments (Optional but Recommended)**
1. **Navigate**: Pipelines → Environments
2. **Click**: "New environment"
3. **Create two environments**:
   - **Name**: `staging` (for develop branch)
   - **Name**: `production` (for main branch)
4. **For production environment**:
   - **Click**: "..." → "Approvals and checks"
   - **Add**: "Approvals" (require manual approval for production deployments)

### **Step 6: Create the Pipeline**
1. **Navigate**: Pipelines → Pipelines
2. **Click**: "Create Pipeline"
3. **Where is your code?**: Azure Repos Git
4. **Select repository**: Your imported repository
5. **Configure your pipeline**: Existing Azure Pipelines YAML file
6. **Path**: `/azure-pipelines.yml`
7. **Click**: "Continue"
8. **Review** the pipeline YAML
9. **Click**: "Run"

---

## 🔧 **PostgreSQL Database Setup**

Choose one option for your database:

### **Option A: Azure Database for PostgreSQL (Recommended)**
```bash
# Cost: ~$7/month for Basic tier
1. Go to portal.azure.com
2. Create resource → Azure Database for PostgreSQL
3. Choose: Flexible Server
4. Settings:
   - Server name: devops-elearning-db
   - Version: PostgreSQL 15
   - Compute + storage: Basic (1 vCore, 1 GB)
   - Admin username: postgres
   - Password: [secure password]
5. Networking → Add firewall rule: 0.0.0.0 to 255.255.255.255
6. Copy connection string for DATABASE_URL
```

### **Option B: Supabase (Free)**
```bash
# Cost: Free tier (500MB storage)
1. Go to supabase.com
2. Create new project
3. Wait for setup (~2 minutes)
4. Settings → Database → Connection string
5. Copy PostgreSQL connection string
```

### **Option C: Render PostgreSQL (Free)**
```bash
# Cost: Free tier (1GB storage)
1. Go to render.com
2. New → PostgreSQL
3. Name: devops-elearning-db
4. Plan: Free
5. Create database
6. Copy connection string
```

---

## 🎯 **Environment Variables Examples**

### **DATABASE_URL Examples:**

**Azure PostgreSQL:**
```
postgresql://postgres:yourpassword@devops-elearning-db.postgres.database.azure.com:5432/postgres?sslmode=require
```

**Supabase:**
```
postgresql://postgres:yourpassword@db.supabase.co:5432/postgres
```

**Render:**
```
postgresql://user:pass@dpg-xxxxx-a.oregon-postgres.render.com/database_xxxxx
```

### **JWT_SECRET:**
```bash
# Generate a secure 256-bit key:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 **Testing Your Pipeline**

### **1. Trigger Build (develop branch)**
```bash
git checkout -b develop
git push origin develop
# This will trigger staging deployment
```

### **2. Trigger Production (main branch)**
```bash
git checkout main
git merge develop
git push origin main
# This will trigger production deployment
```

---

## 📊 **Pipeline Monitoring**

### **Pipeline Status:**
- **URL**: `https://dev.azure.com/yourorg/DevOps-ELearning-Platform/_build`
- **Check**: Build logs, test results, deployment status

### **Deployment Status:**
- **URL**: `https://dev.azure.com/yourorg/DevOps-ELearning-Platform/_environments`
- **Check**: Environment deployments, approvals

---

## 🐛 **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| **Service connection failed** | Check Docker Hub credentials |
| **Variable group not found** | Ensure exact name: `devops-elearning-variables` |
| **Build fails** | Check DATABASE_URL format |
| **Docker push fails** | Verify Docker Hub username/password |
| **Azure deployment fails** | Check Azure subscription permissions |

---

## 🎉 **Success Checklist**

- [ ] Azure DevOps project created
- [ ] Repository imported successfully
- [ ] Docker Hub service connection working
- [ ] Azure service connection working
- [ ] Variable group created with DATABASE_URL and JWT_SECRET
- [ ] Pipeline created and running
- [ ] PostgreSQL database accessible
- [ ] First successful deployment completed

---

## 🔗 **Useful Links**

- **Azure DevOps**: [https://dev.azure.com](https://dev.azure.com)
- **Azure Portal**: [https://portal.azure.com](https://portal.azure.com)
- **Docker Hub**: [https://hub.docker.com](https://hub.docker.com)
- **Supabase**: [https://supabase.com](https://supabase.com)
- **Render**: [https://render.com](https://render.com)

**🎯 Once configured, your pipeline will automatically build, test, and deploy on every push!**
