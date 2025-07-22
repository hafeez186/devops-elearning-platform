#!/bin/bash

# Example script to upload content via API

API_BASE="http://localhost:5000/api"
COURSE_ID="docker-fundamentals"

# 1. Upload a video file
echo "Uploading video..."
curl -X POST \
  -F "video=@./videos/intro-to-docker.mp4" \
  -F "title=Introduction to Docker" \
  -F "description=Overview of containerization and Docker basics" \
  "$API_BASE/content/upload/video"

# 2. Create a new course
echo "Creating course..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "docker-fundamentals",
    "title": "Docker Container Fundamentals",
    "description": "Learn containerization with Docker",
    "category": "DevOps",
    "difficulty": "Intermediate"
  }' \
  "$API_BASE/courses"

# 3. Add a lesson to the course
echo "Adding lesson..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "01-introduction",
    "title": "Introduction to Docker",
    "content": "# Lesson content here...",
    "videoUrl": "intro-to-docker.mp4",
    "duration": "15 minutes"
  }' \
  "$API_BASE/courses/$COURSE_ID/lessons"

echo "Content upload complete!"
