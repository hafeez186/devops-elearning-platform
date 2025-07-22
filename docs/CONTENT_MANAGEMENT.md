# Content Management Guide

## 📝 Adding Course Content

### 1. Content Structure

All course content is stored in the `content/` directory:

```
content/
├── courses/
│   ├── linux-fundamentals/
│   │   ├── metadata.json
│   │   ├── lessons/
│   │   │   ├── 01-introduction.md
│   │   │   ├── 02-basic-commands.md
│   │   │   └── ...
│   │   ├── videos/
│   │   │   ├── intro-video.mp4
│   │   │   ├── demo-commands.mp4
│   │   │   └── ...
│   │   ├── labs/
│   │   │   ├── lab-01-setup/
│   │   │   └── ...
│   │   └── assessments/
│   │       ├── quiz-01.json
│   │       └── ...
│   ├── devops-practices/
│   └── cicd-tools/
```

### 2. Course Metadata (metadata.json)

```json
{
  "id": "linux-fundamentals",
  "title": "Linux Command Line Fundamentals",
  "description": "Master essential Linux commands and shell scripting",
  "category": "Linux",
  "difficulty": "Beginner",
  "duration": "8 hours",
  "instructor": "DevOps Expert",
  "tags": ["linux", "command-line", "bash", "scripting"],
  "prerequisites": ["Basic computer literacy"],
  "learningObjectives": [
    "Navigate Linux file system efficiently",
    "Manage files and directories",
    "Control processes and system resources",
    "Create automated scripts"
  ],
  "modules": [
    {
      "id": "module-1",
      "title": "Getting Started",
      "lessons": ["01-introduction", "02-basic-commands"],
      "duration": "2 hours"
    }
  ]
}
```

### 3. Lesson Content (Markdown)

Create lessons in Markdown format with embedded videos:

```markdown
# Lesson 1: Introduction to Linux

## Learning Objectives
- Understand Linux history and distributions
- Learn basic terminal concepts
- Practice first commands

## Video Introduction
{{video: intro-to-linux.mp4}}

## Content
Linux is a powerful operating system...

## Interactive Demo
{{video: linux-demo.mp4}}

## Hands-on Exercise
Try these commands in the terminal below:

{{terminal}}
```pwd
ls -la
cd /home
{{/terminal}}

## Quiz
{{quiz: quiz-01.json}}
```

### 4. Video Integration

Videos can be:
- **Local files**: Stored in course `videos/` folder
- **YouTube**: Using YouTube embed codes
- **Vimeo**: Using Vimeo embed codes
- **Cloud Storage**: AWS S3, Google Cloud, etc.

## 📹 Video Management

### Adding Video Files

1. **Local Videos**: Place in `content/courses/{course-id}/videos/`
2. **Update lesson content** with video references
3. **Configure video player** in the frontend

### Video Formats Supported
- MP4 (recommended)
- WebM
- OGV
- YouTube embeds
- Vimeo embeds

## 🎯 Content Types

### 1. Text Lessons
- Markdown files with rich formatting
- Code blocks with syntax highlighting
- Images and diagrams
- Interactive elements

### 2. Video Lessons
- Introduction videos
- Demonstration videos
- Explanation videos
- Hands-on tutorials

### 3. Interactive Labs
- Terminal emulator
- Code editor
- File system simulation
- Container environments

### 4. Assessments
- Multiple choice quizzes
- Practical exercises
- Code challenges
- Scenario-based questions

## 🔧 Content Management API

The platform includes APIs for content management:

- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/lessons` - Get course lessons
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/content/upload` - Upload video files
- `PUT /api/courses/:id` - Update course content
