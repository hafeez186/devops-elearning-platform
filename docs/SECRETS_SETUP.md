# 🔐 GitHub Secrets Configuration Guide

## Required Secrets for Production Deployment

### 1. DOCKERHUB_USERNAME
**Value**: Your Docker Hub username
**Example**: `hafeez186`

### 2. DOCKERHUB_TOKEN
**How to get it**:
1. Go to https://hub.docker.com/
2. Sign in or create account
3. Click your profile → Account Settings
4. Go to Security → New Access Token
5. Name: "GitHub Actions"
6. Permissions: "Read, Write, Delete"
7. Copy the generated token

**Value**: The access token from Docker Hub

### 3. MONGODB_URI
**Options**:

#### Option A: MongoDB Atlas (Recommended - Free)
1. Go to https://cloud.mongodb.com/
2. Create free account
3. Create new cluster (M0 Sandbox - Free)
4. Get connection string

**Value**: `mongodb+srv://username:password@cluster.mongodb.net/devops-elearning?retryWrites=true&w=majority`

#### Option B: Local MongoDB
**Value**: `mongodb://localhost:27017/devops-elearning`

### 4. JWT_SECRET
**Generate a secure random string**:

**Option A: Online Generator**
- Visit: https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" (256-bit)

**Option B: Command Line**
```bash
# PowerShell
[System.Web.Security.Membership]::GeneratePassword(32, 0)

# Or use this pre-generated secure key:
```
**Value**: `a8f5f167f44f4964e6c998dee827110c`

## Quick Setup Commands

```bash
# Generate JWT Secret using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use this pre-generated one for testing:
# a8f5f167f44f4964e6c998dee827110c
```
