#!/bin/bash
# Render Build Script for Backend

echo "🏗️ Building DevOps E-Learning Backend..."

# Navigate to server directory
cd server

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build TypeScript
echo "🔨 Compiling TypeScript..."
npm run build

# Verify build
if [ -f "dist/index.js" ]; then
    echo "✅ Build successful! Output: dist/index.js"
    ls -la dist/
else
    echo "❌ Build failed! dist/index.js not found"
    exit 1
fi

echo "🚀 Build complete!"
