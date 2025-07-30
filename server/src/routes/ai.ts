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

// AI Learning Companion Routes
router.post('/companion', aiController.getCompanionResponse.bind(aiController));
router.post('/learning-session', aiController.updateLearningSession.bind(aiController));
router.get('/learning-progress/:userId', aiController.getLearningProgress.bind(aiController));
router.put('/learning-preferences/:userId', aiController.updateLearningPreferences.bind(aiController));

export default router;
