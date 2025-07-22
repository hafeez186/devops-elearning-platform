# 🚀 Complete Production Deployment Guide

## Step-by-Step Server Deployment

### **Step 1: Set Up GitHub Secrets**

Go to: https://github.com/hafeez186/devops-elearning-platform/settings/secrets/actions

Add these **4 required secrets**:

#### 1. DOCKERHUB_USERNAME
```
Value: hafeez186
```

#### 2. DOCKERHUB_TOKEN
1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Name: "GitHub Actions"
4. Permissions: "Read, Write, Delete"
5. Copy the token and paste as secret value

#### 3. MONGODB_URI
**Option A: MongoDB Atlas (Free - Recommended)**
1. Go to https://cloud.mongodb.com/
2. Create free M0 cluster
3. Get connection string like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/devops-elearning?retryWrites=true&w=majority
```

**Option B: Quick test with local MongoDB**
```
mongodb://localhost:27017/devops-elearning
```

#### 4. JWT_SECRET
Use this secure generated secret:
```
b5ffdefc6cf63aa9c178ec0b19f25efbe4c8872138f926c9383a450710882f09
```

### **Step 2: Update Docker Configuration**

Update the backend Dockerfile to use environment variables:

```dockerfile
# In server/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["npm", "start"]
```

### **Step 3: Create Production Docker Compose**

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    image: hafeez186/devops-elearning-frontend:latest
    ports:
      - "80:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5000

  backend:
    image: hafeez186/devops-elearning-backend:latest
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=devops-elearning

volumes:
  mongodb_data:
```

### **Step 4: Deployment Options**

#### **Option A: Railway (Recommended - Free)**

1. Go to https://railway.app/
2. Sign in with GitHub
3. Click "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect and deploy!

#### **Option B: Render (Free Tier)**

1. Go to https://render.com/
2. Connect GitHub account
3. Create new "Web Service"
4. Select your repository
5. Configure environment variables

#### **Option C: Digital Ocean App Platform**

1. Go to https://cloud.digitalocean.com/apps
2. Create app from GitHub
3. Configure your repository
4. Set environment variables
5. Deploy!

#### **Option D: AWS ECS (Advanced)**

Use the Docker images with ECS service definition.

### **Step 5: Trigger the Pipeline**

```bash
# Make a small change to trigger deployment
echo "# Ready for production!" >> README.md
git add .
git commit -m "feat: trigger production deployment"
git push origin main
```

### **Step 6: Monitor Deployment**

1. **GitHub Actions**: https://github.com/hafeez186/devops-elearning-platform/actions
2. **Docker Hub**: https://hub.docker.com/u/hafeez186
3. **Your chosen platform's dashboard**

## **Quick Start Commands**

### Set up all secrets at once:
```bash
# 1. Copy these values to GitHub Secrets:
DOCKERHUB_USERNAME=hafeez186
DOCKERHUB_TOKEN=<your-docker-hub-token>
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=b5ffdefc6cf63aa9c178ec0b19f25efbe4c8872138f926c9383a450710882f09
```

### Deploy locally for testing:
```bash
# Run with production environment
docker-compose -f docker-compose.prod.yml up --build
```

## **Expected Results**

After successful deployment:

✅ **Docker Images Published**:
- `hafeez186/devops-elearning-frontend:latest`
- `hafeez186/devops-elearning-backend:latest`

✅ **Live Application**:
- Frontend accessible via your chosen platform
- Backend API responding with real database
- Admin panel fully functional with content management

✅ **Production Features**:
- Real MongoDB database
- Secure JWT authentication
- File upload functionality
- Full course management

## **Troubleshooting**

### Common Issues:

1. **Docker Hub login fails**: Check token permissions
2. **MongoDB connection fails**: Verify connection string format
3. **JWT errors**: Ensure secret is properly set
4. **Build fails**: Check all dependencies are installed

### Debug Commands:
```bash
# Test Docker images locally
docker run -p 3000:80 hafeez186/devops-elearning-frontend:latest
docker run -p 5000:5000 -e MONGODB_URI="your-uri" hafeez186/devops-elearning-backend:latest

# Check logs
docker logs container-name
```

Ready to deploy to production! 🚀
