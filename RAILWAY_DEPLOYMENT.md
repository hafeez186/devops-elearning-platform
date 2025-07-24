# 🚂 Railway Deployment Guide

## 🚀 Deploy Your DevOps E-Learning Platform to Railway

Railway is perfect for your Docker setup! Let's get your website online in under 5 minutes.

## 📋 **Prerequisites**

- ✅ Node.js installed on your computer
- ✅ Your GitHub repository (which you have)
- ✅ Railway account (free)

## 🛠️ **Step 1: Install Railway CLI**

```bash
# Install Railway CLI globally
npm install -g @railway/cli

# Verify installation
railway --version
```

## 🔐 **Step 2: Login to Railway**

```bash
# This will open your browser to login
railway login
```

## 🚀 **Step 3: Deploy Your Project**

### Option A: Deploy from GitHub (Recommended)

```bash
# Navigate to your project directory
cd "c:\codevibe\Modified cicd website for elearning"

# Initialize Railway project
railway init

# Link to your GitHub repository
railway link

# Deploy your application
railway up
```

### Option B: Deploy using Docker Images

```bash
# Deploy backend service
railway init
railway service create backend
railway service use backend
railway env set NODE_ENV=production
railway env set JWT_SECRET=your-super-secret-jwt-key
railway env set MONGODB_URI=mongodb://mongo:27017/devops-elearning
railway deploy --image hafeez654/devops-elearning-backend:latest

# Deploy frontend service
railway service create frontend
railway service use frontend
railway deploy --image hafeez654/devops-elearning-frontend:latest

# Add MongoDB database
railway service create mongodb
railway service use mongodb
railway deploy --image mongo:latest
```

## 🔧 **Step 4: Configure Environment Variables**

Railway will automatically detect your `docker-compose.prod.yml`, but you can also set variables manually:

```bash
# Set environment variables
railway env set NODE_ENV=production
railway env set JWT_SECRET=your-super-secret-jwt-key-change-this
railway env set MONGODB_URI=mongodb://mongo:27017/devops-elearning
railway env set PORT=5000
```

## 🌐 **Step 5: Access Your Live Website**

```bash
# Get your live URL
railway open
```

Your website will be live at something like: `https://your-app-name.railway.app`

## 📊 **Expected Timeline**

- ⏱️ **Setup**: 2 minutes
- 🏗️ **Deployment**: 3-5 minutes
- 🌐 **Live Website**: 5-7 minutes total

## 🔍 **Monitor Your Deployment**

```bash
# Check deployment status
railway status

# View logs
railway logs

# View services
railway service list
```

## 🎯 **Alternative: One-Click Railway Deployment**

If you want even easier deployment:

1. **Go to**: [railway.app/new](https://railway.app/new)
2. **Connect your GitHub account**
3. **Select your repository**: `devops-elearning-platform`
4. **Railway auto-detects** your Docker setup
5. **Click Deploy** - that's it!

## 🔧 **Troubleshooting**

### If Railway CLI installation fails:
```bash
# Alternative installation methods
curl -fsSL https://railway.app/install.sh | sh
# or
brew install railway  # if you have Homebrew
```

### If deployment fails:
```bash
# Check logs for errors
railway logs --tail

# Redeploy
railway up --detach
```

### If environment variables are missing:
```bash
# List current variables
railway env list

# Add missing variables
railway env set VARIABLE_NAME=value
```

## 🌟 **Railway Features You'll Get**

✅ **Automatic HTTPS/SSL**  
✅ **Custom domains** (free subdomain included)  
✅ **Auto-scaling**  
✅ **99.9% uptime**  
✅ **Global CDN**  
✅ **Automatic deployments** from GitHub  
✅ **Built-in monitoring**  
✅ **Database hosting**  

## 💰 **Pricing**

- **Free Tier**: $0/month - Perfect for learning and small projects
- **Pro Tier**: $20/month - Production applications
- **Team Tier**: $50/month - Multiple developers

Your e-learning platform will likely fit in the free tier initially!

## 🎉 **What You'll Have After Deployment**

- 🌐 **Live Website**: `https://your-app.railway.app`
- 📱 **Mobile Responsive**: Works on all devices
- 🔒 **HTTPS Secure**: SSL certificate included
- 🚀 **Fast Loading**: Global CDN
- 📊 **Monitoring**: Built-in analytics
- 🔄 **Auto Updates**: Connected to your GitHub

## 🆘 **Need Help?**

If you run into any issues during deployment:

1. **Check the Railway logs**: `railway logs`
2. **Verify your Docker images work locally**: `docker-compose -f docker-compose.prod.yml up`
3. **Ensure environment variables are set**: `railway env list`
4. **Contact Railway support**: They're very responsive!

Ready to deploy? Let's start with the Railway CLI installation! 🚀

---

**Next Steps After Deployment:**
1. ✅ Test your live website
2. ✅ Set up custom domain (optional)
3. ✅ Configure monitoring
4. ✅ Share your live DevOps learning platform with the world! 🌍
