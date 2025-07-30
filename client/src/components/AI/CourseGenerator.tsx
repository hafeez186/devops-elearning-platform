import React, { useState } from 'react';
import './CourseGenerator.css';

interface CourseModule {
  title: string;
  description: string;
  lessons: Array<{
    title: string;
    content: string;
    type: 'video' | 'text' | 'interactive' | 'quiz';
    duration: number;
  }>;
}

interface GeneratedCourse {
  title: string;
  description: string;
  difficulty: string;
  estimatedDuration: number;
  modules: CourseModule[];
  prerequisites: string[];
  learningObjectives: string[];
}

interface CourseGenerationRequest {
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: 'short' | 'medium' | 'long';
  focus: string[];
  includeHandsOn: boolean;
  includeQuizzes: boolean;
}

const CourseGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CourseGenerationRequest>({
    topic: '',
    difficulty: 'intermediate',
    duration: 'medium',
    focus: [],
    includeHandsOn: true,
    includeQuizzes: true,
  });

  const focusOptions = [
    'Theory and Concepts',
    'Hands-on Practice',
    'Real-world Projects',
    'Best Practices',
    'Troubleshooting',
    'Industry Standards',
    'Security Considerations',
    'Performance Optimization'
  ];

  const handleInputChange = (field: keyof CourseGenerationRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFocusChange = (focus: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      focus: checked 
        ? [...prev.focus, focus]
        : prev.focus.filter(f => f !== focus)
    }));
  };

  const generateCourse = async () => {
    if (!formData.topic.trim()) {
      setError('Please enter a course topic');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedCourse(data.course);
      } else {
        throw new Error(data.error || 'Failed to generate course');
      }
    } catch (err) {
      console.error('Course generation error:', err);
      setError('Failed to generate course. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGenerator = () => {
    setGeneratedCourse(null);
    setError(null);
    setFormData({
      topic: '',
      difficulty: 'intermediate',
      duration: 'medium',
      focus: [],
      includeHandsOn: true,
      includeQuizzes: true,
    });
  };

  return (
    <div className="course-generator-container">
      <div className="generator-header">
        <h2>🤖 AI Course Generator</h2>
        <p>Create comprehensive DevOps courses automatically using AI</p>
      </div>

      {!generatedCourse ? (
        <div className="course-form">
          <div className="form-section">
            <label className="form-label">
              Course Topic *
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                placeholder="e.g., Docker Containerization, Kubernetes Orchestration, CI/CD Pipelines"
                className="form-input"
              />
            </label>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">
                Difficulty Level
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="form-select"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </label>
            </div>

            <div className="form-section">
              <label className="form-label">
                Course Duration
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="form-select"
                >
                  <option value="short">Short (2-4 hours)</option>
                  <option value="medium">Medium (6-12 hours)</option>
                  <option value="long">Long (15+ hours)</option>
                </select>
              </label>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Focus Areas</label>
            <div className="checkbox-grid">
              {focusOptions.map(option => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.focus.includes(option)}
                    onChange={(e) => handleFocusChange(option, e.target.checked)}
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.includeHandsOn}
                onChange={(e) => handleInputChange('includeHandsOn', e.target.checked)}
              />
              <span className="checkbox-text">Include hands-on labs</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.includeQuizzes}
                onChange={(e) => handleInputChange('includeQuizzes', e.target.checked)}
              />
              <span className="checkbox-text">Include quizzes and assessments</span>
            </label>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            onClick={generateCourse}
            disabled={isGenerating || !formData.topic.trim()}
            className="generate-button"
          >
            {isGenerating ? (
              <>
                <div className="button-spinner"></div>
                Generating Course...
              </>
            ) : (
              <>
                ✨ Generate Course
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="generated-course">
          <div className="course-header">
            <h3>{generatedCourse.title}</h3>
            <div className="course-meta">
              <span className="difficulty-badge difficulty-{generatedCourse.difficulty}">
                {generatedCourse.difficulty}
              </span>
              <span className="duration-badge">
                ~{generatedCourse.estimatedDuration} hours
              </span>
            </div>
          </div>

          <div className="course-description">
            <p>{generatedCourse.description}</p>
          </div>

          <div className="course-details">
            <div className="course-section">
              <h4>Learning Objectives</h4>
              <ul className="objectives-list">
                {generatedCourse.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>

            <div className="course-section">
              <h4>Prerequisites</h4>
              <ul className="prerequisites-list">
                {generatedCourse.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="course-modules">
            <h4>Course Modules</h4>
            {generatedCourse.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="module-card">
                <div className="module-header">
                  <h5>Module {moduleIndex + 1}: {module.title}</h5>
                  <span className="lesson-count">{module.lessons.length} lessons</span>
                </div>
                <p className="module-description">{module.description}</p>
                
                <div className="lessons-list">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="lesson-item">
                      <div className="lesson-info">
                        <span className="lesson-title">{lesson.title}</span>
                        <div className="lesson-meta">
                          <span className={`lesson-type ${lesson.type}`}>
                            {lesson.type}
                          </span>
                          <span className="lesson-duration">{lesson.duration}min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="course-actions">
            <button onClick={resetGenerator} className="secondary-button">
              Generate Another Course
            </button>
            <button className="primary-button">
              Save Course
            </button>
            <button className="primary-button">
              Export Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseGenerator;
