# 🚀 Production Deployment Quick Setup

Write-Host "🚀 Setting up Production Deployment for DevOps E-Learning Platform" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Gray

Write-Host "`n📋 GitHub Secrets Required:" -ForegroundColor Yellow
Write-Host "Go to: https://github.com/hafeez186/devops-elearning-platform/settings/secrets/actions" -ForegroundColor Green

Write-Host "`n🔐 Add these 4 secrets:" -ForegroundColor Cyan

Write-Host "`n1. DOCKERHUB_USERNAME" -ForegroundColor White
Write-Host "   Value: hafeez186" -ForegroundColor Gray

Write-Host "`n2. DOCKERHUB_TOKEN" -ForegroundColor White
Write-Host "   Get from: https://hub.docker.com/settings/security" -ForegroundColor Gray
Write-Host "   Create 'New Access Token' with Read/Write/Delete permissions" -ForegroundColor Gray

Write-Host "`n3. MONGODB_URI" -ForegroundColor White
Write-Host "   Option A - MongoDB Atlas (Free): https://cloud.mongodb.com/" -ForegroundColor Gray
Write-Host "   Option B - Local: mongodb://localhost:27017/devops-elearning" -ForegroundColor Gray

Write-Host "`n4. JWT_SECRET" -ForegroundColor White
Write-Host "   Use this secure key:" -ForegroundColor Gray
Write-Host "   b5ffdefc6cf63aa9c178ec0b19f25efbe4c8872138f926c9383a450710882f09" -ForegroundColor Green

Write-Host "`n🚀 Quick Deployment Options:" -ForegroundColor Cyan

Write-Host "`n1. Railway (Recommended - Free)" -ForegroundColor White
Write-Host "   • Go to: https://railway.app/" -ForegroundColor Gray
Write-Host "   • Connect GitHub" -ForegroundColor Gray
Write-Host "   • Deploy from your repo" -ForegroundColor Gray

Write-Host "`n2. Render (Free Tier)" -ForegroundColor White
Write-Host "   • Go to: https://render.com/" -ForegroundColor Gray
Write-Host "   • Create Web Service from GitHub" -ForegroundColor Gray

Write-Host "`n3. Digital Ocean App Platform" -ForegroundColor White
Write-Host "   • Go to: https://cloud.digitalocean.com/apps" -ForegroundColor Gray

Write-Host "`n📦 After Setting Secrets:" -ForegroundColor Cyan
Write-Host "1. Push any change to trigger deployment:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'feat: trigger production deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray

Write-Host "`n2. Monitor deployment:" -ForegroundColor White
Write-Host "   https://github.com/hafeez186/devops-elearning-platform/actions" -ForegroundColor Gray

Write-Host "`n3. Check Docker images:" -ForegroundColor White
Write-Host "   https://hub.docker.com/u/hafeez186" -ForegroundColor Gray

Write-Host "`n🎯 Expected Results:" -ForegroundColor Cyan
Write-Host "✅ Docker images published to Docker Hub" -ForegroundColor Green
Write-Host "✅ Backend with real MongoDB database" -ForegroundColor Green
Write-Host "✅ Frontend with full functionality" -ForegroundColor Green
Write-Host "✅ Admin panel with content management" -ForegroundColor Green
Write-Host "✅ Production-ready deployment" -ForegroundColor Green

Write-Host "`n🎉 Your platform will be production-ready!" -ForegroundColor Magenta
