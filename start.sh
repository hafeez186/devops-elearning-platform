#!/bin/bash
# Render Start Script for Backend

echo "🚀 Starting DevOps E-Learning Backend..."

# Navigate to server directory
cd server

# Check if build exists
if [ ! -f "dist/index.js" ]; then
    echo "❌ Built files not found! Running build..."
    npm run build
fi

# Start the application
echo "🌐 Starting server on port ${PORT:-5000}..."
npm start
