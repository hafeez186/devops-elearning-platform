# 🔧 Environment Variables Guide

## 📋 **Overview**

Your DevOps E-Learning Platform uses environment variables for configuration across different environments (development, testing, production).

## 🖥️ **Backend Environment Variables**

### 📍 **Location**: `server/.env`

### 🔑 **Required Variables**

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `NODE_ENV` | Application environment | `development` | `production` |
| `PORT` | Server port | `5000` | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/devops-elearning` | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret for JWT tokens | ⚠️ **REQUIRED** | `your-super-secret-jwt-key-256-bits-long` |

### 🔧 **Optional Variables**

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` | `24h`, `30d` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` | `https://yourdomain.com` |
| `RATE_LIMIT_WINDOW_MS` | Rate limiting window | `900000` (15 min) | `600000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` | `200` |
| `MAX_FILE_SIZE` | Max upload file size | `10485760` (10MB) | `20971520` |

## 🎨 **Frontend Environment Variables**

### 📍 **Location**: `client/.env` (build-time only)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |
| `REACT_APP_ENV` | Frontend environment | `development` |

## 📁 **Where Variables Are Used**

### **Backend Code Usage:**

#### `server/src/index.ts`
```typescript
// Server configuration
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devops-elearning';

console.log(`📊 Environment: ${process.env.NODE_ENV}`);
```

#### `server/src/app.ts`
```typescript
// Rate limiting
windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),

// CORS configuration
origin: process.env.CORS_ORIGIN || 'http://localhost:3000',

// Health check
environment: process.env.NODE_ENV,
```

## ⚙️ **Setup Instructions**

### 🛠️ **Development Setup**

1. **Copy the example file:**
   ```bash
   cp server/.env.example server/.env
   ```

2. **Edit the `.env` file:**
   ```bash
   # Basic configuration
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/devops-elearning
   JWT_SECRET=my-super-secret-development-key-change-in-production
   
   # Optional settings
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:3000
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

3. **For frontend (optional):**
   ```bash
   # Create client/.env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_ENV=development
   ```

### 🚀 **Production Setup**

#### **Docker Deployment:**
Environment variables are set in `docker-compose.prod.yml`:

```yaml
backend:
  image: hafeez654/devops-elearning-backend:latest
  environment:
    - NODE_ENV=production
    - MONGODB_URI=mongodb://mongo:27017/devops-elearning
    - JWT_SECRET=your-super-secret-jwt-key-change-in-production
    - PORT=5000
```

#### **Cloud Platform Deployment:**

**Railway:**
```bash
npx @railway/cli env set NODE_ENV=production
npx @railway/cli env set MONGODB_URI="your-mongodb-uri"
npx @railway/cli env set JWT_SECRET="your-jwt-secret"
npx @railway/cli env set PORT=5000
```

**Render:**
```bash
# Set in Render dashboard under Environment Variables
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devops-elearning
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

**Heroku:**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set PORT=5000
```

## 🔐 **Security Best Practices**

### ⚠️ **Critical Security Rules:**

1. **Never commit `.env` files** to Git
   ```gitignore
   # Already in .gitignore
   .env
   .env.local
   .env.production
   ```

2. **Use strong JWT secrets** (256+ bits)
   ```bash
   # Generate a secure JWT secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Use different secrets** for different environments

4. **Use environment-specific MongoDB databases**

### 🛡️ **Production Security Checklist:**

- ✅ Strong JWT secret (256+ bits)
- ✅ Production MongoDB URI with authentication
- ✅ CORS origin set to your domain
- ✅ Rate limiting enabled
- ✅ HTTPS in production
- ✅ No hardcoded secrets in code

## 🔍 **Troubleshooting**

### **Common Issues:**

#### **1. JWT Secret Missing**
```bash
Error: JWT secret is required
```
**Solution:** Set `JWT_SECRET` environment variable

#### **2. Database Connection Failed**
```bash
Error: MongoDB connection failed
```
**Solution:** Check `MONGODB_URI` format and network access

#### **3. CORS Errors**
```bash
Error: CORS policy blocked
```
**Solution:** Set correct `CORS_ORIGIN` for your frontend URL

#### **4. Rate Limiting Too Strict**
```bash
Error: Too many requests
```
**Solution:** Adjust `RATE_LIMIT_MAX_REQUESTS` and `RATE_LIMIT_WINDOW_MS`

### **Debug Commands:**

```bash
# Check current environment variables (be careful with secrets!)
cd server && node -e "console.log('NODE_ENV:', process.env.NODE_ENV)"
cd server && node -e "console.log('PORT:', process.env.PORT)"

# Test MongoDB connection
cd server && node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devops-elearning').then(() => console.log('✅ MongoDB connected')).catch(err => console.log('❌ MongoDB error:', err.message))"
```

## 📚 **Example Configurations**

### **Development (.env)**
```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devops-elearning
JWT_SECRET=dev-secret-key-not-for-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **Production (Cloud Platform)**
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devops-elearning?retryWrites=true&w=majority
JWT_SECRET=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50
```

### **Testing (.env.test)**
```bash
NODE_ENV=test
PORT=5001
MONGODB_URI=mongodb://localhost:27017/test-db
JWT_SECRET=test-secret-key
JWT_EXPIRES_IN=1h
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=1000
```

## 🚀 **Quick Setup Script**

Create a setup script for easy environment configuration:

```bash
#!/bin/bash
# setup-env.sh

echo "🔧 Setting up environment variables..."

# Copy example file
cp server/.env.example server/.env

# Generate JWT secret
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")

# Update JWT secret in .env file
sed -i "s/your-super-secret-jwt-key-change-this-in-production/$JWT_SECRET/" server/.env

echo "✅ Environment variables configured!"
echo "📝 Edit server/.env to customize your settings"
```

Your environment variables are now properly documented and ready for any deployment platform! 🎉
