import { Router } from 'express';
import { AIController } from '../controllers/AIController';

const router = Router();
const aiController = new AIController();

// AI Chat Assistant
router.post('/chat', aiController.handleChat.bind(aiController));

// Course Generation
router.post('/generate-course', aiController.generateCourse.bind(aiController));

// Analytics and Insights
router.get('/analytics', aiController.getAnalytics.bind(aiController));

// Quiz Generation
router.post('/generate-quiz', aiController.generateQuiz.bind(aiController));

// Code Analysis
router.post('/analyze-code', aiController.analyzeCode.bind(aiController));

// Personalized Recommendations
router.get('/recommendations/:userId', aiController.getRecommendations.bind(aiController));

// System Insights
router.get('/system-insights', aiController.getSystemInsights.bind(aiController));

export default router;
