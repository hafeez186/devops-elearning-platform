# 🗄️ MongoDB Atlas Setup Guide

## Quick MongoDB Atlas Setup (Free Tier)

### 1. Create Account
1. Go to https://cloud.mongodb.com/
2. Sign up with Google/GitHub or create new account
3. Choose "Build a database"

### 2. Create Free Cluster
1. Select **M0 Sandbox** (Free tier)
2. Choose **AWS** as provider
3. Select closest region to you
4. Click "Create Cluster"

### 3. Create Database User
1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Username: `devops-admin`
4. Password: Generate secure password (save it!)
5. Built-in Role: **Read and write to any database**
6. Click **Add User**

### 4. Configure Network Access
1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Choose **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 5. Get Connection String
1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Driver: **Node.js**
4. Copy the connection string
5. Replace `<password>` with your actual password

**Example Connection String**:
```
mongodb+srv://devops-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/devops-elearning?retryWrites=true&w=majority
```

## Alternative: Local MongoDB

If you prefer local development:

### Windows (with Chocolatey)
```powershell
choco install mongodb
```

### Connection String for Local
```
mongodb://localhost:27017/devops-elearning
```
