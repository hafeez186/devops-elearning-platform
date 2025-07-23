# 🚂 Railway.app Deployment Guide

## Why Railway?
- ✅ **$5/month free credit** (covers small apps completely)
- ✅ **Auto-detects Dockerfiles** from your repo
- ✅ **Built-in databases** (MongoDB, PostgreSQL, Redis)
- ✅ **Custom domains** and SSL certificates
- ✅ **GitHub integration** for auto-deployment

## 🚀 Deploy Your App to Railway (5 Minutes)

### Method 1: One-Click Deployment (Easiest)

1. **Go to Railway:** https://railway.app
2. **Sign in** with your GitHub account
3. **New Project** → **Deploy from GitHub repo**
4. **Select** your `devops-elearning-platform` repository
5. **Railway automatically:**
   - Detects your Dockerfiles
   - Creates frontend and backend services
   - Builds and deploys both containers
   - Provides live URLs

### Method 2: CLI Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy everything
railway up
```

## 🗄️ Add Database

### Option 1: MongoDB (Recommended)
1. In Railway dashboard → **Add Service**
2. **Database** → **MongoDB**
3. Railway creates free MongoDB instance
4. Copy connection string from database settings

### Option 2: PostgreSQL
1. **Add Service** → **Database** → **PostgreSQL**
2. Free PostgreSQL database with Railway

## ⚙️ Configure Environment Variables

### Backend Service Settings:
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongo.railway.internal:27017/devops-elearning
JWT_SECRET=railway-production-secret-key-change-me
```

### Frontend Service (if needed):
```bash
REACT_APP_API_URL=https://your-backend-service.railway.app
```

## 🌍 Custom Domain (Optional)

1. **Service Settings** → **Domains**
2. **Add Custom Domain**
3. Point your domain to Railway
4. SSL automatically configured

## 📊 Monitoring

Railway provides:
- ✅ **Real-time logs**
- ✅ **CPU and memory usage**
- ✅ **Deployment history**
- ✅ **Auto-restart on crashes**

## 💸 Pricing

### Free Tier:
- **$5 credit per month**
- **Covers most small applications**
- **No time limits**

### Pay-as-you-go:
- Only pay for what you use
- Typical small app: $3-8/month

## 🎯 Your Live URLs

After deployment, you'll get:
- **Frontend:** `https://devops-frontend-production.railway.app`
- **Backend:** `https://devops-backend-production.railway.app`
- **Database:** Internal Railway network

## ✅ Success Checklist

- [ ] Railway account created
- [ ] Repository connected
- [ ] Services auto-deployed
- [ ] Database added and connected
- [ ] Environment variables configured
- [ ] Application accessible via URLs
- [ ] Database connection working

## 🛠️ Troubleshooting

### Common Issues:

1. **Build fails:**
   - Check Dockerfile paths
   - Ensure all dependencies in package.json

2. **App won't start:**
   - Check environment variables
   - Verify PORT configuration

3. **Database connection fails:**
   - Use Railway internal URLs
   - Check connection string format

## 🚀 Ready to Deploy?

**Your Docker images are perfect for Railway deployment!**

Just go to https://railway.app and connect your GitHub repository. Railway will handle the rest automatically! 🎉
