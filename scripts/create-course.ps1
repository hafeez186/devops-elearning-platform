# Quick Course Creator for DevOps E-Learning Platform
# PowerShell version for Windows users

param(
    [Parameter(Mandatory=$true)]
    [string]$CourseId,
    
    [Parameter(Mandatory=$true)]
    [string]$CourseTitle,
    
    [string]$Category = "DevOps",
    [string]$Difficulty = "Intermediate",
    [string]$BasePath = "."
)

function Create-CourseStructure {
    param($CourseId, $BasePath)
    
    $coursePath = Join-Path $BasePath "content\courses\$CourseId"
    
    # Create directories
    $directories = @(
        $coursePath,
        "$coursePath\lessons",
        "$coursePath\videos",
        "$coursePath\labs", 
        "$coursePath\assessments"
    )
    
    foreach ($dir in $directories) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "✅ Created directory: $dir" -ForegroundColor Green
    }
    
    return $coursePath
}

function Create-Metadata {
    param($CoursePath, $CourseData)
    
    $metadataFile = Join-Path $CoursePath "metadata.json"
    $CourseData | ConvertTo-Json -Depth 10 | Out-File -FilePath $metadataFile -Encoding UTF8
    Write-Host "✅ Created metadata: $metadataFile" -ForegroundColor Green
}

function Create-SampleLesson {
    param($CoursePath, $LessonId, $LessonTitle)
    
    $lessonContent = @"
# $LessonTitle

## 🎯 Learning Objectives
- Understand key concepts
- Apply practical skills  
- Complete hands-on exercises

## 📹 Introduction Video
{{video: $LessonId-intro.mp4}}

## 📖 Content
Write your lesson content here using Markdown.

### Key Points
- Important concept 1
- Important concept 2
- Important concept 3

## 🚀 Demonstration
{{video: $LessonId-demo.mp4}}

## 💻 Hands-on Exercise
``````powershell
# Example PowerShell commands
Write-Host "Hello, DevOps!"
Get-Process | Where-Object {$_.Name -like "*docker*"}
``````

## ✅ Knowledge Check
{{quiz: $LessonId-quiz.json}}

---
**Next**: Continue to the next lesson
"@
    
    $lessonFile = Join-Path $CoursePath "lessons\$LessonId.md"
    $lessonContent | Out-File -FilePath $lessonFile -Encoding UTF8
    Write-Host "✅ Created lesson: $lessonFile" -ForegroundColor Green
}

function Create-SampleQuiz {
    param($CoursePath, $LessonId)
    
    $quizData = @{
        id = "$LessonId-quiz"
        title = "Quiz: $($LessonId.Replace('-', ' '))"
        questions = @(
            @{
                id = 1
                type = "multiple-choice"
                question = "What is the main benefit of containerization?"
                options = @(
                    "Faster execution",
                    "Environment consistency", 
                    "Smaller file sizes",
                    "Better graphics"
                )
                correct = 1
                explanation = "Containerization provides environment consistency across different systems."
            },
            @{
                id = 2
                type = "true-false"
                question = "Docker containers share the host OS kernel."
                correct = $true
                explanation = "Unlike VMs, containers share the host OS kernel, making them more efficient."
            }
        )
    }
    
    $quizFile = Join-Path $CoursePath "assessments\$LessonId-quiz.json"
    $quizData | ConvertTo-Json -Depth 10 | Out-File -FilePath $quizFile -Encoding UTF8
    Write-Host "✅ Created quiz: $quizFile" -ForegroundColor Green
}

# Main execution
Write-Host "🚀 Creating course: $CourseTitle" -ForegroundColor Cyan
Write-Host "📁 Course ID: $CourseId" -ForegroundColor Cyan
Write-Host ("-" * 50) -ForegroundColor Gray

# Course metadata
$courseData = @{
    id = $CourseId
    title = $CourseTitle
    description = "Comprehensive course on $CourseTitle"
    category = $Category
    difficulty = $Difficulty
    duration = "8 hours"
    instructor = "DevOps Expert"
    tags = $CourseId.Split('-')
    prerequisites = @("Basic technical knowledge")
    learningObjectives = @(
        "Master $CourseTitle fundamentals",
        "Apply best practices",
        "Build real-world projects"
    )
    modules = @(
        @{
            id = "module-1"
            title = "Getting Started"
            lessons = @("01-introduction", "02-setup", "03-basics")
            duration = "3 hours"
        },
        @{
            id = "module-2"
            title = "Advanced Topics" 
            lessons = @("04-advanced", "05-best-practices", "06-project")
            duration = "5 hours"
        }
    )
}

# Create course structure
$coursePath = Create-CourseStructure -CourseId $CourseId -BasePath $BasePath

# Create metadata
Create-Metadata -CoursePath $coursePath -CourseData $courseData

# Create sample lessons
$lessons = @("01-introduction", "02-setup", "03-basics")
foreach ($lessonId in $lessons) {
    $lessonTitle = ($lessonId -replace '-', ' ').ToTitleCase()
    Create-SampleLesson -CoursePath $coursePath -LessonId $lessonId -LessonTitle $lessonTitle
    Create-SampleQuiz -CoursePath $coursePath -LessonId $lessonId
}

Write-Host ("-" * 50) -ForegroundColor Gray
Write-Host "🎉 Course structure created successfully!" -ForegroundColor Green
Write-Host "📂 Course location: $coursePath" -ForegroundColor Yellow

Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Add your video files to the videos\ directory"
Write-Host "2. Edit the lesson content in the lessons\ directory" 
Write-Host "3. Customize the metadata.json file"
Write-Host "4. Create interactive labs in the labs\ directory"
Write-Host "5. Upload content using the admin interface"

# Example usage:
Write-Host "`n💡 Example usage:" -ForegroundColor Magenta
Write-Host ".\create-course.ps1 -CourseId 'kubernetes-basics' -CourseTitle 'Kubernetes Fundamentals' -Category 'Container Orchestration'"
