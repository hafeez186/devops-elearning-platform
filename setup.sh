#!/bin/bash

echo "==============================================="
echo "  DevOps E-Learning Platform Setup Script"
echo "==============================================="
echo

echo "[1/4] Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install root dependencies"
    exit 1
fi

echo
echo "[2/4] Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install client dependencies"
    exit 1
fi

echo
echo "[3/4] Installing server dependencies..."
cd ../server
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install server dependencies"
    exit 1
fi

echo
echo "[4/4] Setting up environment files..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Environment file created at server/.env"
    echo "Please update the environment variables as needed"
fi

cd ..
echo
echo "==============================================="
echo "  Setup Complete!"
echo "==============================================="
echo
echo "To start the development environment:"
echo "  npm run dev"
echo
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:5000"
echo
echo "For Docker deployment:"
echo "  docker-compose up -d"
echo
