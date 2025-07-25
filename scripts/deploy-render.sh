#!/bin/bash

# Render Deployment Setup Script
# This script helps configure the DevOps E-Learning Platform for Render deployment

echo "🚀 Render Deployment Setup for DevOps E-Learning Platform"
echo "========================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo ""
echo "📋 Pre-deployment Checklist:"
echo "1. ✅ Ensure your code is pushed to GitHub"
echo "2. ✅ Have a Render account ready"
echo "3. ✅ PostgreSQL database will be created on Render"
echo ""

# Generate JWT Secret
echo "🔐 Generating secure JWT secret..."
JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
echo "Generated JWT_SECRET: $JWT_SECRET"
echo ""

# Display environment variables template
echo "📝 Environment Variables for Render Backend Service:"
echo "=================================================="
cat << EOF
NODE_ENV=production
PORT=5000
DATABASE_URL=[Copy from your PostgreSQL service in Render]
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://[your-frontend-service-name].onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
EOF

echo ""
echo "🔧 Build Commands for Render Services:"
echo "======================================"
echo ""
echo "Backend Service Configuration:"
echo "  Name: devops-elearning-backend"
echo "  Environment: Node"
echo "  Build Command: cd server && npm ci && npm run build"
echo "  Start Command: cd server && npm start"
echo "  Health Check Path: /health"
echo ""
echo "Frontend Service Configuration:"
echo "  Name: devops-elearning-frontend"
echo "  Environment: Static Site"
echo "  Build Command: cd client && npm ci && REACT_APP_API_URL=https://devops-elearning-backend.onrender.com npm run build"
echo "  Publish Directory: client/build"
echo ""

# Check for required files
echo "🔍 Checking required files..."
echo ""

FILES_TO_CHECK=(
    "server/package.json"
    "client/package.json" 
    "server/Dockerfile"
    "client/Dockerfile"
    "render.yaml"
    "server/prisma/schema.prisma"
)

ALL_GOOD=true
for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        ALL_GOOD=false
    fi
done

echo ""
if [ "$ALL_GOOD" = true ]; then
    echo "🎉 All required files are present!"
else
    echo "⚠️  Some files are missing. Please ensure all files are committed."
fi

echo ""
echo "📚 Next Steps:"
echo "============="
echo "1. 🔗 Go to https://render.com and sign in"
echo "2. 🗄️  Create PostgreSQL database (free tier available)"
echo "3. 🖥️  Deploy backend service with above configuration"
echo "4. 🎨 Deploy frontend service with above configuration"
echo "5. 🔄 Update CORS_ORIGIN after frontend deployment"
echo "6. ✅ Test deployment with health check"
echo ""
echo "📖 For detailed instructions, see: RENDER_DEPLOYMENT_GUIDE.md"
echo ""
echo "🆘 Need help? Check the troubleshooting section in the deployment guide"
echo ""
echo "🚀 Happy deploying!"
