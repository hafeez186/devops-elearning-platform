# 🎯 Render Quick Deploy - Reference Card

## 🚀 One-Page Deployment Guide

### 1️⃣ Create PostgreSQL Database
```
Render Dashboard → New + → PostgreSQL
Name: devops-elearning-db
Plan: Free
Copy: External Database URL
```

### 2️⃣ Deploy Backend API
```
New + → Web Service → Connect GitHub
Name: devops-elearning-backend
Environment: Node
Build: cd server && npm ci && npm run build
Start: cd server && npm start
```

**Environment Variables:**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=[Your PostgreSQL URL]
JWT_SECRET=[Generate with: openssl rand -hex 32]
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://[frontend-name].onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
```

### 3️⃣ Deploy Frontend
```
New + → Static Site → Same GitHub Repo
Name: devops-elearning-frontend
Build: cd client && npm ci && REACT_APP_API_URL=https://[backend-name].onrender.com npm run build
Publish: client/build
```

### 4️⃣ Update CORS
Update backend's `CORS_ORIGIN` with actual frontend URL

### 5️⃣ Test Deployment
- Backend: `https://[backend-name].onrender.com/health`
- Frontend: `https://[frontend-name].onrender.com`

## 🔧 Quick Commands

**Generate JWT Secret:**
```bash
openssl rand -hex 32
```

**Test Health Check:**
```bash
curl https://[backend-name].onrender.com/health
```

## 📋 Service Names Template
- Database: `devops-elearning-db`
- Backend: `devops-elearning-backend`  
- Frontend: `devops-elearning-frontend`

## 🆘 Common Issues
1. **Build fails**: Check Node.js version in package.json
2. **CORS errors**: Ensure exact URL match in CORS_ORIGIN
3. **DB connection**: Verify DATABASE_URL format
4. **Frontend blank**: Check REACT_APP_API_URL in build command

## ✅ Success Indicators
- [ ] PostgreSQL database created
- [ ] Backend `/health` returns 200 OK
- [ ] Frontend loads without errors
- [ ] API endpoints respond correctly
- [ ] No CORS errors in browser console

---
🎉 **That's it!** Your platform is live on Render!
