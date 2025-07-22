# Docker Hub Setup and Authentication Fix

## 🔐 Docker Hub Authentication Issue Resolution

### Problem
The CI/CD pipeline is failing with:
```
Error: Error response from daemon: Get "https://registry-1.docker.io/v2/": unauthorized: incorrect username or password
```

### Solution Steps

## Step 1: Create/Verify Docker Hub Account
1. Go to [Docker Hub](https://hub.docker.com/)
2. Create an account or sign in to existing account
3. Note your Docker Hub username (case-sensitive)

## Step 2: Generate Docker Hub Access Token
1. Go to Docker Hub → Account Settings → Security
2. Click "New Access Token"
3. Name: `GitHub-Actions-DevOps-Platform`
4. Permissions: **Read, Write, Delete**
5. Copy the generated token (you'll only see it once!)

## Step 3: Configure GitHub Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

### Required Secrets:
```
DOCKERHUB_USERNAME = your-dockerhub-username
DOCKERHUB_TOKEN = your-generated-access-token
```

### Additional Production Secrets:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/devops-elearning
JWT_SECRET = your-super-secure-jwt-secret-key-here
REACT_APP_API_URL = https://your-backend-api-url.com
```

## Step 4: Verify Docker Hub Repository Names
The workflow will create these repositories automatically:
- `your-username/devops-elearning-frontend`
- `your-username/devops-elearning-backend`

## Step 5: Test Docker Hub Connection

### Local Testing (Optional):
```bash
# Test Docker Hub login locally
docker login

# Build and test push (from project root)
docker build -t your-username/test-image ./client
docker push your-username/test-image
```

## Step 6: Common Issues & Solutions

### Issue: Username Case Sensitivity
- Docker Hub usernames are case-sensitive
- Use exact username as shown in Docker Hub

### Issue: Token Permissions
- Ensure token has **Write** permissions
- Recreate token if unsure about permissions

### Issue: Repository Access
- Make sure repositories exist or workflow has permission to create them
- Check Docker Hub account limits

### Issue: Network/Firewall
- GitHub Actions may have network restrictions
- This is rare but can happen with organizational accounts

## Step 7: Alternative Docker Registries

If Docker Hub continues to have issues, consider:

### GitHub Container Registry (ghcr.io):
```yaml
- name: Login to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

### AWS ECR, Google Container Registry, etc.

## Step 8: Debugging Commands

Add to workflow for debugging:
```yaml
- name: Debug Docker Info
  run: |
    docker --version
    docker info
    echo "Docker Hub Username: ${{ secrets.DOCKERHUB_USERNAME }}"
    echo "Token length: ${#DOCKERHUB_TOKEN}"
  env:
    DOCKERHUB_TOKEN: ${{ secrets.DOCKERHUB_TOKEN }}
```

## Step 9: Manual Verification
1. Trigger the workflow again after setting up secrets
2. Check GitHub Actions logs for detailed error messages
3. Verify images appear in Docker Hub after successful push

---

## 🚨 Security Notes
- Never commit Docker Hub credentials to code
- Use GitHub Secrets for all sensitive data
- Rotate access tokens periodically
- Use minimal required permissions for tokens

## 📞 Need Help?
If issues persist:
1. Check GitHub Actions logs for detailed error messages
2. Verify all secrets are correctly named and set
3. Test Docker Hub credentials manually
4. Consider using GitHub Container Registry as alternative
