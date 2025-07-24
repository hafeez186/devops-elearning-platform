#!/bin/bash
# 🚀 VM Deployment Script for DevOps E-Learning Platform

# Configuration
VM_USER="your-username"
VM_HOST="your-vm-ip-address"
DOCKER_USERNAME="yourusername"

echo "🚀 Deploying DevOps E-Learning Platform to VM..."
echo "================================================"

# Step 1: Build images locally
echo "🔨 Building Docker images..."
docker build -t $DOCKER_USERNAME/devops-frontend:latest ./client
docker build -t $DOCKER_USERNAME/devops-backend:latest ./server

# Step 2: Push to registry (optional - comment out if using direct transfer)
echo "📤 Pushing to Docker Hub..."
docker push $DOCKER_USERNAME/devops-frontend:latest
docker push $DOCKER_USERNAME/devops-backend:latest

# Step 3: Update docker-compose.prod.yml with your images
echo "📝 Updating docker-compose.prod.yml..."
sed -i "s/hafeez654\/devops-elearning-frontend:latest/$DOCKER_USERNAME\/devops-frontend:latest/g" docker-compose.prod.yml
sed -i "s/hafeez654\/devops-elearning-backend:latest/$DOCKER_USERNAME\/devops-backend:latest/g" docker-compose.prod.yml

# Step 4: Copy files to VM
echo "📁 Copying files to VM..."
scp docker-compose.prod.yml $VM_USER@$VM_HOST:/home/$VM_USER/

# Step 5: Deploy on VM
echo "🚀 Deploying on VM..."
ssh $VM_USER@$VM_HOST << 'ENDSSH'
    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down
    
    # Pull latest images
    docker-compose -f docker-compose.prod.yml pull
    
    # Start services
    docker-compose -f docker-compose.prod.yml up -d
    
    # Show status
    docker-compose -f docker-compose.prod.yml ps
    
    echo "✅ Deployment complete!"
    echo "🌐 Frontend: http://$(curl -s ifconfig.me):3000"
    echo "🔧 Backend: http://$(curl -s ifconfig.me):5000"
ENDSSH

echo "🎉 Deployment finished!"
echo "🔍 Check VM status with: ssh $VM_USER@$VM_HOST 'docker-compose -f docker-compose.prod.yml ps'"
