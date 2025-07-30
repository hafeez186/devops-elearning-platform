import { Request, Response } from 'express';

// Use require for AIService to avoid module resolution issues
const aiService = require('../services/AIService').default;

export interface CourseGenerationRequest {
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: 'short' | 'medium' | 'long';
  focus: string[];
  includeHandsOn: boolean;
  includeQuizzes: boolean;
}

export class AIController {
  /**
   * Handle chat messages and return AI responses
   */
  async handleChat(req: Request, res: Response): Promise<void> {
    try {
      const { message, context = 'general' } = req.body;

      if (!message) {
        res.status(400).json({
          success: false,
          error: 'Message is required'
        });
        return;
      }

      const aiResponse = await aiService.getChatResponse(message, context);

      res.json({
        success: true,
        response: aiResponse,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('AI Chat Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process chat message'
      });
    }
  }

  /**
   * Generate complete courses using AI
   */
  async generateCourse(req: Request, res: Response): Promise<void> {
    try {
      const request: CourseGenerationRequest = req.body;

      if (!request.topic) {
        res.status(400).json({
          success: false,
          error: 'Course topic is required'
        });
        return;
      }

      const course = await aiService.generateCourse(request);

      res.json({
        success: true,
        course,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Course Generation Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate course'
      });
    }
  }

  /**
   * Get AI-powered analytics and insights
   */
  async getAnalytics(_req: Request, res: Response): Promise<void> {
    try {
      // Mock analytics data - in production, this would aggregate real user data
      const analytics = {
        userEngagement: {
          totalUsers: 1234,
          activeUsers: 856,
          completionRate: 78,
          averageSessionTime: 45
        },
        coursePerformance: {
          topCourses: [
            { name: 'Docker Fundamentals', completionRate: 92, rating: 4.8 },
            { name: 'Kubernetes Orchestration', completionRate: 85, rating: 4.6 },
            { name: 'CI/CD with Jenkins', completionRate: 79, rating: 4.4 }
          ],
          strugglingAreas: [
            { topic: 'Kubernetes Networking', failureRate: 34 },
            { topic: 'Docker Compose', failureRate: 28 },
            { topic: 'GitLab CI', failureRate: 25 }
          ]
        },
        learningTrends: {
          popularTopics: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
          peakLearningHours: ['9:00-11:00', '14:00-16:00', '19:00-21:00'],
          preferredLearningMethods: [
            { method: 'Interactive Labs', percentage: 45 },
            { method: 'Video Tutorials', percentage: 32 },
            { method: 'Reading Materials', percentage: 23 }
          ]
        },
        predictions: {
          nextWeekSignups: 67,
          courseCompletionForecast: 82,
          churnRisk: [
            { userId: 'u123', risk: 78 },
            { userId: 'u456', risk: 65 },
            { userId: 'u789', risk: 52 }
          ]
        }
      };

      res.json({
        success: true,
        analytics,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Analytics Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate analytics'
      });
    }
  }

  /**
   * Generate quiz questions for a topic
   */
  async generateQuiz(req: Request, res: Response): Promise<void> {
    try {
      const { topic, difficulty = 'medium', questionCount = 5 } = req.body;

      if (!topic) {
        res.status(400).json({
          success: false,
          error: 'Topic is required'
        });
        return;
      }

      const quiz = await aiService.generateQuiz(topic, difficulty, questionCount);

      res.json({
        success: true,
        quiz,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Quiz Generation Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate quiz'
      });
    }
  }

  /**
   * Analyze code and provide feedback
   */
  async analyzeCode(req: Request, res: Response): Promise<void> {
    try {
      const { code, language, context } = req.body;

      if (!code) {
        res.status(400).json({
          success: false,
          error: 'Code is required'
        });
        return;
      }

      const analysis = await aiService.analyzeCode(code, language || 'text', context);

      res.json({
        success: true,
        analysis,
        analyzedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Code Analysis Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to analyze code'
      });
    }
  }

  /**
   * Get personalized learning recommendations
   */
  async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      // Mock data for demonstration - in production, fetch from database
      const currentCourse = 'kubernetes-intro';
      const completedCourses = ['docker-basics', 'linux-fundamentals'];
      const preferences = { difficulty: 'intermediate', topics: ['DevOps', 'Cloud'] };
      
      console.log('Generating recommendations for user:', userId, { currentCourse, completedCourses, preferences });

      const mockProgress = [
        { courseId: 'docker-basics', completed: true, score: 85 },
        { courseId: 'kubernetes-intro', completed: false, score: 70 }
      ];

      const mockQuizResults = [
        { topic: 'Docker', score: 85, attempts: 2 },
        { topic: 'CI/CD', score: 92, attempts: 1 }
      ];

      const recommendations = await aiService.generatePersonalizedRecommendations(
        userId,
        mockProgress,
        mockQuizResults
      );

      res.json({
        success: true,
        recommendations,
        userId,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Recommendations Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate recommendations'
      });
    }
  }

  /**
   * Get system insights for monitoring
   */
  async getSystemInsights(_req: Request, res: Response): Promise<void> {
    try {
      // Mock system insights - in production, this would analyze real system metrics
      const insights = {
        systemHealth: {
          status: 'healthy',
          uptime: '15 days, 7 hours',
          responseTime: '120ms',
          errorRate: '0.02%'
        },
        userActivity: {
          activeUsers: 856,
          peakHours: ['14:00-16:00', '19:00-21:00'],
          popularFeatures: ['Interactive Labs', 'AI Chat', 'Progress Tracking']
        },
        performanceMetrics: {
          averageLoadTime: '1.2s',
          cacheHitRate: '94%',
          databaseQueries: '2,450/hour',
          apiCalls: '15,750/hour'
        },
        recommendations: [
          'Consider scaling up during peak hours (14:00-16:00)',
          'Optimize database queries for better performance',
          'Implement CDN for static assets to reduce load times'
        ]
      };

      res.json({
        success: true,
        insights,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('System Insights Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate system insights'
      });
    }
  }
}
