# 🚀 Render Deployment Guide - DevOps E-Learning Platform

Complete guide to deploy the DevOps E-Learning Platform to Render.com with PostgreSQL backend.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code must be pushed to GitHub
3. **PostgreSQL Database**: We'll create this on Render

## 🗄️ Step 1: Create PostgreSQL Database

1. **Log in to Render Dashboard**
2. **Click "New +"** → **"PostgreSQL"**
3. **Configure Database:**
   ```
   Name: devops-elearning-db
   Plan: Free (for testing/development)
   Region: Choose closest to your users
   ```
4. **Click "Create Database"**
5. **Copy the Database URL** (External Database URL):
   ```
   postgresql://username:password@hostname:port/database_name
   ```

## 🖥️ Step 2: Deploy Backend API

1. **Click "New +"** → **"Web Service"**
2. **Connect GitHub Repository**
3. **Configure Backend Service:**
   ```
   Name: devops-elearning-backend
   Environment: Node
   Region: Same as database
   Branch: main (or your default branch)
   Root Directory: (leave empty)
   Build Command: cd server && npm ci && npm run build
   Start Command: cd server && npm start
   ```

4. **Environment Variables** (Add these in the Environment tab):
   ```env
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=[Your PostgreSQL URL from Step 1]
   JWT_SECRET=[Generate a secure random string - use: openssl rand -hex 32]
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://[your-frontend-service-name].onrender.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   MAX_FILE_SIZE=10485760
   ```

5. **Click "Create Web Service"**

## 🎨 Step 3: Deploy Frontend

1. **Click "New +"** → **"Static Site"**
2. **Connect Same GitHub Repository**
3. **Configure Frontend Service:**
   ```
   Name: devops-elearning-frontend
   Branch: main
   Root Directory: (leave empty)
   Build Command: cd client && npm ci && REACT_APP_API_URL=https://[backend-service-name].onrender.com npm run build
   Publish Directory: client/build
   ```

4. **Replace `[backend-service-name]` with your actual backend service name**

5. **Click "Create Static Site"**

## 🔧 Step 4: Update CORS Configuration

After both services are deployed, update the backend's `CORS_ORIGIN` environment variable:

1. **Go to Backend Service** → **Environment**
2. **Update `CORS_ORIGIN`** to your frontend URL:
   ```
   CORS_ORIGIN=https://[your-frontend-service-name].onrender.com
   ```
3. **Save and Redeploy**

## 📝 Step 5: Initialize Database

After backend deployment, initialize the database with Prisma:

1. **Go to Backend Service** → **Shell** (if available)
2. **Or use Render's web shell** to run:
   ```bash
   cd server && npx prisma db push
   ```

Alternatively, the database will be automatically initialized on first API request.

## ✅ Step 6: Verify Deployment

### Backend Health Check
Visit: `https://[backend-service-name].onrender.com/health`

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### Frontend Access
Visit: `https://[frontend-service-name].onrender.com`

### API Endpoints
- Auth: `https://[backend-service-name].onrender.com/api/auth`
- Courses: `https://[backend-service-name].onrender.com/api/courses`
- API Info: `https://[backend-service-name].onrender.com/api`

## 🔧 Configuration Files

### render.yaml (Already configured)
```yaml
services:
  # Backend API Server
  - type: web
    name: devops-elearning-backend
    runtime: node
    buildCommand: cd server && npm ci && npm run build
    startCommand: cd server && npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: DATABASE_URL
        sync: false # Set manually in dashboard
      - key: JWT_SECRET
        sync: false # Set manually in dashboard
      # ... other env vars

  # Frontend Static Site
  - type: web
    name: devops-elearning-frontend
    runtime: static
    buildCommand: cd client && npm ci && REACT_APP_API_URL=https://devops-elearning-backend.onrender.com npm run build
    staticPublishPath: client/build
```

## 🔐 Security Best Practices

### Environment Variables Security
1. **JWT_SECRET**: Generate using `openssl rand -hex 32`
2. **DATABASE_URL**: Use the provided PostgreSQL URL
3. **Never commit secrets** to your repository

### Generate Secure JWT Secret
```bash
# Generate a secure 256-bit key
openssl rand -hex 32

# Alternative (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
- **Check Node.js version** in package.json engines
- **Verify all dependencies** are in package.json
- **Check build logs** for specific errors

#### 2. Database Connection Issues
```bash
# Verify DATABASE_URL format:
postgresql://username:password@hostname:port/database_name?sslmode=require
```

#### 3. CORS Errors
- **Ensure CORS_ORIGIN** matches frontend URL exactly
- **Include protocol** (https://)
- **Check for trailing slashes**

#### 4. Environment Variables Not Set
- **Verify all required env vars** are set in Render dashboard
- **Restart services** after changing environment variables

### Debug Commands
```bash
# Check database connection
npx prisma db pull

# View database schema
npx prisma studio

# Generate Prisma client
npx prisma generate
```

## 📊 Monitoring

### Health Checks
- **Backend**: `/health` endpoint
- **Database**: Prisma connection status
- **Frontend**: Static file serving

### Logs Access
1. **Go to Service Dashboard**
2. **Click "Logs"** tab
3. **Monitor real-time logs**

## 🎯 Performance Optimization

### Backend Optimizations
- **Enable compression** (already configured)
- **Rate limiting** (already configured)
- **Connection pooling** (Prisma default)

### Frontend Optimizations
- **Static file caching** (Render default)
- **Gzip compression** (Render default)
- **CDN distribution** (Render Pro)

## 🔄 Auto-Deploy Setup

Render automatically deploys when you push to your connected branch:

1. **Push to GitHub**
2. **Render detects changes**
3. **Automatically builds and deploys**
4. **Zero-downtime deployment**

## 📧 Custom Domains (Optional)

### Frontend Custom Domain
1. **Go to Frontend Service** → **Settings**
2. **Add Custom Domain**
3. **Configure DNS** as instructed
4. **SSL automatically enabled**

### Backend Custom Domain
1. **Go to Backend Service** → **Settings**
2. **Add Custom Domain**
3. **Update CORS_ORIGIN** in environment variables

## 💡 Next Steps

After successful deployment:

1. **Test all features** end-to-end
2. **Set up monitoring** and alerts
3. **Configure backups** for database
4. **Consider upgrading** to paid plans for production
5. **Add custom domains** if needed

## 🆘 Support

If you encounter issues:

1. **Check Render Status**: [status.render.com](https://status.render.com)
2. **Render Documentation**: [render.com/docs](https://render.com/docs)
3. **GitHub Issues**: Report platform-specific issues
4. **Render Community**: [community.render.com](https://community.render.com)

---

## ✅ Deployment Checklist

- [ ] PostgreSQL database created
- [ ] Backend service deployed with all environment variables
- [ ] Frontend service deployed with correct API URL
- [ ] CORS configuration updated
- [ ] Database initialized
- [ ] Health checks passing
- [ ] All API endpoints working
- [ ] Frontend-backend communication verified
- [ ] Custom domains configured (if needed)
- [ ] Monitoring set up

🎉 **Congratulations!** Your DevOps E-Learning Platform is now live on Render!
