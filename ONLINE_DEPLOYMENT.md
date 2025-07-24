# 🚀 One-Click Deployments

Deploy your DevOps E-Learning Platform instantly to multiple cloud platforms:

## 🌐 **Instant Deployments**

### [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/hafeez186/devops-elearning-platform)

### [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/hafeez186/devops-elearning-platform)

### [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hafeez186/devops-elearning-platform)

## 🔧 **Manual Deployment Options**

### **Railway Deployment**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### **Render Deployment**
1. Fork this repository
2. Sign up at [Render](https://render.com)
3. Connect your GitHub account
4. Deploy as Docker service using:
   - Frontend: `hafeez654/devops-elearning-frontend:latest`
   - Backend: `hafeez654/devops-elearning-backend:latest`

### **Fly.io Deployment**
```bash
# Install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
fly auth login
fly launch
fly deploy
```

### **Azure Container Apps**
```bash
# Run the provided script
./scripts/deploy-azure-container-apps.ps1
```

### **DigitalOcean App Platform**
1. Sign up at [DigitalOcean](https://www.digitalocean.com)
2. Go to App Platform
3. Connect your GitHub repository
4. Select Docker deployment
5. Configure with your Docker images

## 🌍 **Domain & SSL**

All platforms provide:
- ✅ **Free subdomain** (e.g., your-app.railway.app)
- ✅ **Automatic SSL/HTTPS**
- ✅ **Global CDN**
- ✅ **Custom domain support** (optional)

## 📊 **Platform Comparison**

| Platform | Free Tier | Deployment Time | Best For |
|----------|-----------|----------------|----------|
| Railway | ✅ | 2-5 minutes | Fastest setup |
| Render | ✅ | 5-10 minutes | Reliability |
| Fly.io | ✅ | 3-7 minutes | Global edge |
| Heroku | ✅ (limited) | 10-15 minutes | Enterprise |
| Azure | Pay-as-you-go | 5-10 minutes | Microsoft ecosystem |

## 🚀 **Recommended Steps**

1. **Try Railway first** - quickest way to get online
2. **Use Render** for production applications
3. **Consider Azure** for enterprise deployments
4. **Add custom domain** once deployed

Your website will be live and accessible worldwide in minutes! 🌐
