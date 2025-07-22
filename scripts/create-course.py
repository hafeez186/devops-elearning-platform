#!/usr/bin/env python3
"""
Quick Content Creator for DevOps E-Learning Platform
Run this script to quickly create a new course with sample content.
"""

import os
import json
import argparse
from pathlib import Path

def create_course_structure(course_id, course_title, base_path):
    """Create the directory structure for a new course."""
    course_path = Path(base_path) / "content" / "courses" / course_id
    
    # Create directories
    directories = [
        course_path,
        course_path / "lessons",
        course_path / "videos", 
        course_path / "labs",
        course_path / "assessments"
    ]
    
    for directory in directories:
        directory.mkdir(parents=True, exist_ok=True)
        print(f"✅ Created directory: {directory}")
    
    return course_path

def create_metadata(course_path, course_data):
    """Create the course metadata.json file."""
    metadata_file = course_path / "metadata.json"
    with open(metadata_file, 'w', encoding='utf-8') as f:
        json.dump(course_data, f, indent=2)
    print(f"✅ Created metadata: {metadata_file}")

def create_sample_lesson(course_path, lesson_id, lesson_title):
    """Create a sample lesson markdown file."""
    lesson_content = f"""# {lesson_title}

## 🎯 Learning Objectives
- Understand key concepts
- Apply practical skills
- Complete hands-on exercises

## 📹 Introduction Video
{{{{video: {lesson_id}-intro.mp4}}}}

## 📖 Content
Write your lesson content here using Markdown.

### Key Points
- Important concept 1
- Important concept 2
- Important concept 3

## 🚀 Demonstration
{{{{video: {lesson_id}-demo.mp4}}}}

## 💻 Hands-on Exercise
```bash
# Example commands
echo "Hello, DevOps!"
```

## ✅ Knowledge Check
{{{{quiz: {lesson_id}-quiz.json}}}}

---
**Next**: Continue to the next lesson
"""
    
    lesson_file = course_path / "lessons" / f"{lesson_id}.md"
    with open(lesson_file, 'w', encoding='utf-8') as f:
        f.write(lesson_content)
    print(f"✅ Created lesson: {lesson_file}")

def create_sample_quiz(course_path, lesson_id):
    """Create a sample quiz JSON file."""
    quiz_data = {
        "id": f"{lesson_id}-quiz",
        "title": f"Quiz: {lesson_id.replace('-', ' ').title()}",
        "questions": [
            {
                "id": 1,
                "type": "multiple-choice",
                "question": "What is the main benefit of containerization?",
                "options": [
                    "Faster execution",
                    "Environment consistency",
                    "Smaller file sizes",
                    "Better graphics"
                ],
                "correct": 1,
                "explanation": "Containerization provides environment consistency across different systems."
            },
            {
                "id": 2,
                "type": "true-false",
                "question": "Docker containers share the host OS kernel.",
                "correct": True,
                "explanation": "Unlike VMs, containers share the host OS kernel, making them more efficient."
            }
        ]
    }
    
    quiz_file = course_path / "assessments" / f"{lesson_id}-quiz.json"
    with open(quiz_file, 'w', encoding='utf-8') as f:
        json.dump(quiz_data, f, indent=2)
    print(f"✅ Created quiz: {quiz_file}")

def main():
    parser = argparse.ArgumentParser(description='Create a new course structure')
    parser.add_argument('--id', required=True, help='Course ID (e.g., kubernetes-basics)')
    parser.add_argument('--title', required=True, help='Course Title')
    parser.add_argument('--category', default='DevOps', help='Course Category')
    parser.add_argument('--difficulty', default='Intermediate', help='Difficulty Level')
    parser.add_argument('--path', default='.', help='Base path (default: current directory)')
    
    args = parser.parse_args()
    
    # Course metadata
    course_data = {
        "id": args.id,
        "title": args.title,
        "description": f"Comprehensive course on {args.title}",
        "category": args.category,
        "difficulty": args.difficulty,
        "duration": "8 hours",
        "instructor": "DevOps Expert",
        "tags": args.id.split('-'),
        "prerequisites": ["Basic technical knowledge"],
        "learningObjectives": [
            f"Master {args.title} fundamentals",
            "Apply best practices",
            "Build real-world projects"
        ],
        "modules": [
            {
                "id": "module-1",
                "title": "Getting Started",
                "lessons": ["01-introduction", "02-setup", "03-basics"],
                "duration": "3 hours"
            },
            {
                "id": "module-2", 
                "title": "Advanced Topics",
                "lessons": ["04-advanced", "05-best-practices", "06-project"],
                "duration": "5 hours"
            }
        ]
    }
    
    print(f"🚀 Creating course: {args.title}")
    print(f"📁 Course ID: {args.id}")
    print("-" * 50)
    
    # Create course structure
    course_path = create_course_structure(args.id, args.title, args.path)
    
    # Create metadata
    create_metadata(course_path, course_data)
    
    # Create sample lessons
    lessons = ["01-introduction", "02-setup", "03-basics"]
    for lesson_id in lessons:
        lesson_title = lesson_id.replace('-', ' ').title()
        create_sample_lesson(course_path, lesson_id, lesson_title)
        create_sample_quiz(course_path, lesson_id)
    
    print("-" * 50)
    print("🎉 Course structure created successfully!")
    print(f"📂 Course location: {course_path}")
    print("\n📋 Next steps:")
    print("1. Add your video files to the videos/ directory")
    print("2. Edit the lesson content in the lessons/ directory")
    print("3. Customize the metadata.json file")
    print("4. Create interactive labs in the labs/ directory")
    print("5. Upload content using the admin interface")

if __name__ == "__main__":
    main()
