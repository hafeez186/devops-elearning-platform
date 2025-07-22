# 🐳 Docker Hub Setup Guide

## Docker Hub Account & Token Setup

### 1. Create Docker Hub Account
1. Go to https://hub.docker.com/
2. Sign up or log in
3. Username will be your `DOCKERHUB_USERNAME`

### 2. Create Access Token
1. Click your profile picture → **Account Settings**
2. Go to **Security** tab
3. Click **New Access Token**
4. Token description: `GitHub Actions CI/CD`
5. Access permissions: **Read, Write, Delete**
6. Click **Generate**
7. **COPY THE TOKEN** (you won't see it again!)

### 3. Verify Setup
```bash
# Test login with your token
docker login -u YOUR_USERNAME -p YOUR_TOKEN
```

## Repository Setup

Your Docker images will be published as:
- Frontend: `hafeez186/devops-elearning-frontend:latest`
- Backend: `hafeez186/devops-elearning-backend:latest`

## Security Note
- Never commit Docker credentials to code
- Use GitHub Secrets for all credentials
- Rotate tokens regularly for security
