# 🐘 PostgreSQL Azure Deployment Guide

## 🎯 **Overview**

Your DevOps e-learning platform has been updated to use PostgreSQL instead of MongoDB. This guide shows you how to deploy it to Azure with a PostgreSQL database.

## ✅ **What's Been Updated**

- ✅ **Backend**: Updated to use Prisma ORM with PostgreSQL
- ✅ **Docker Compose**: PostgreSQL containers instead of MongoDB
- ✅ **Environment Variables**: `DATABASE_URL` instead of `MONGODB_URI`
- ✅ **Database Schema**: Modern Prisma schema with proper relations
- ✅ **Package.json**: Added PostgreSQL and Prisma dependencies

## 🚀 **Azure PostgreSQL Options**

### **Option 1: Azure Database for PostgreSQL (Recommended)** ⭐

#### **Step 1: Create Azure PostgreSQL Database**
1. Go to **[portal.azure.com](https://portal.azure.com)**
2. **Create resource** → **Azure Database for PostgreSQL**
3. **Choose**: Flexible Server
4. **Settings**:
   - **Server name**: `devops-elearning-db`
   - **Location**: East US (or your preferred region)
   - **PostgreSQL version**: 15
   - **Compute + storage**: Basic (1 vCore, 1 GB RAM) - $7/month
   - **Admin username**: `postgres`
   - **Password**: Create secure password

#### **Step 2: Configure Firewall**
1. Go to your PostgreSQL resource
2. **Networking** → **Firewall rules**
3. **Add**: `0.0.0.0` to `255.255.255.255` (allow all Azure services)
4. **Save**

#### **Step 3: Get Connection String**
1. **Overview** → **Connection strings**
2. **Copy the connection string**, it looks like:
   ```
   postgresql://postgres:<password>@devops-elearning-db.postgres.database.azure.com:5432/postgres?sslmode=require
   ```

### **Option 2: Use Render PostgreSQL (Free)** 💰

1. Go to **[render.com](https://render.com)**
2. **New** → **PostgreSQL**
3. **Free tier**: 1 GB storage
4. **Copy connection string** from dashboard

### **Option 3: Use Supabase (Free)** 🆓

1. Go to **[supabase.com](https://supabase.com)**
2. **New project**
3. **Database** → **Connection pooling**
4. **Copy PostgreSQL connection string**

## 🛠️ **Deploy to Azure Container Apps**

### **Step 1: Update Environment Variables**

In your Azure Container App:
1. **Configuration** → **Environment variables**
2. **Add/Update**:
   - `DATABASE_URL` = Your PostgreSQL connection string
   - `JWT_SECRET` = Your secure JWT secret
   - `NODE_ENV` = production

### **Step 2: Deploy Using Your Pipeline**

Your Azure DevOps pipeline is already configured! Just update the variables:

```yaml
# In your Azure DevOps variable group
DATABASE_URL: postgresql://postgres:password@yourserver.postgres.database.azure.com:5432/devops_elearning?sslmode=require
JWT_SECRET: your-super-secret-jwt-key
```

### **Step 3: Run Database Migrations**

After deployment, run the database migration:

```bash
# In your container or using Azure CLI
npx prisma migrate deploy
npx prisma generate
```

## 🏃‍♂️ **Quick Local Setup**

### **Step 1: Install Dependencies**
```bash
cd server
npm install
```

### **Step 2: Set Up Local PostgreSQL**
```bash
# Using Docker (easiest)
docker run --name postgres-dev -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=devops_elearning -p 5432:5432 -d postgres:15
```

### **Step 3: Update Environment Variables**
```bash
# In server/.env
DATABASE_URL=postgresql://postgres:password123@localhost:5432/devops_elearning?schema=public
```

### **Step 4: Run Migrations**
```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### **Step 5: Start Development**
```bash
npm run dev
```

## 📊 **Cost Comparison**

| Option | Monthly Cost | Storage | Performance |
|--------|-------------|---------|-------------|
| **Azure PostgreSQL Basic** | ~$7 | 32 GB | Good |
| **Render PostgreSQL** | $0 | 1 GB | Limited |
| **Supabase** | $0 | 500 MB | Good |
| **Azure Container + PostgreSQL** | ~$15 | 32 GB | Excellent |

## 🔄 **Migration Commands**

### **Create New Migration**
```bash
npx prisma migrate dev --name add_new_feature
```

### **Deploy to Production**
```bash
npx prisma migrate deploy
```

### **Reset Database (Development)**
```bash
npx prisma migrate reset
```

### **View Database**
```bash
npx prisma studio
```

## 🌐 **Example Connection Strings**

### **Azure PostgreSQL**
```
postgresql://postgres:yourpassword@devops-elearning-db.postgres.database.azure.com:5432/postgres?sslmode=require
```

### **Local Development**
```
postgresql://postgres:password123@localhost:5432/devops_elearning?schema=public
```

### **Render**
```
postgresql://user:pass@dpg-xxxxx-a.oregon-postgres.render.com/database_xxxxx
```

## 🎯 **Next Steps**

1. **Choose your PostgreSQL provider** (Azure recommended for production)
2. **Update your environment variables** in Azure Container Apps
3. **Deploy using your existing Azure DevOps pipeline**
4. **Run database migrations** after deployment
5. **Test your application** with the new PostgreSQL backend

## 🐛 **Troubleshooting**

### **Connection Issues**
- ✅ Check firewall rules allow your Azure app
- ✅ Verify connection string format
- ✅ Ensure SSL mode is correct

### **Migration Issues**
- ✅ Run `npx prisma generate` after changes
- ✅ Check database permissions
- ✅ Verify schema exists

### **Performance Issues**
- ✅ Add database indexes for frequently queried fields
- ✅ Use connection pooling
- ✅ Monitor query performance

## 🎉 **Success!**

Your DevOps e-learning platform now uses PostgreSQL and is ready for enterprise-scale deployment on Azure!

**Database Features You Now Have:**
- ✅ **ACID Compliance**: Reliable transactions
- ✅ **Advanced Queries**: Complex joins and aggregations
- ✅ **JSON Support**: Flexible data storage
- ✅ **Full-Text Search**: Built-in search capabilities
- ✅ **Horizontal Scaling**: Read replicas and sharding
- ✅ **Backup & Recovery**: Point-in-time recovery
