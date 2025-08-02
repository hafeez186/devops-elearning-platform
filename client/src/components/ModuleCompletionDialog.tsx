import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle,
  Assignment,
  Psychology,
  RocketLaunch,
  PlayArrow,
  Code,
  Timeline,
  Lightbulb,
  TrendingUp,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import AIKnowledgeAnalyzer from './AI/AIKnowledgeAnalyzer';
import axios from 'axios';

interface ModuleCompletionDialogProps {
  open: boolean;
  onClose: () => void;
  moduleData: {
    id: string;
    name: string;
    score: number;
    answers: any[];
    timeSpent: number;
    completionPercentage: number;
  };
  userId: string;
}

interface RealTimeImplementation {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  technologies: string[];
  realTimeGuidance: boolean;
  aiAssistance: boolean;
}

const ModuleCompletionDialog: React.FC<ModuleCompletionDialogProps> = ({
  open,
  onClose,
  moduleData,
  userId,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAIAnalyzer, setShowAIAnalyzer] = useState(false);
  const [implementations, setImplementations] = useState<RealTimeImplementation[]>([]);
  const [isLoadingImplementations, setIsLoadingImplementations] = useState(false);
  const [selectedImplementation, setSelectedImplementation] = useState<RealTimeImplementation | null>(null);

  const steps = [
    {
      label: 'Module Completion',
      description: 'Congratulations on completing the module!',
    },
    {
      label: 'AI Knowledge Analysis',
      description: 'Let AI analyze your learning and provide insights',
    },
    {
      label: 'Real-time Implementation',
      description: 'Apply your knowledge with hands-on projects',
    },
    {
      label: 'Next Steps',
      description: 'Plan your continued learning journey',
    },
  ];

  useEffect(() => {
    if (open && currentStep === 2) {
      loadRealTimeImplementations();
    }
  }, [open, currentStep]);

  const loadRealTimeImplementations = async () => {
    setIsLoadingImplementations(true);
    try {
      const response = await axios.post('/api/ai-knowledge/generate-implementation', {
        moduleId: moduleData.id,
        userLevel: getExpectedLevel(),
        preferences: {
          includeAI: true,
          realTimeGuidance: true,
          difficulty: 'adaptive'
        }
      });
      
      if (response.data.success) {
        setImplementations(response.data.implementations);
      }
    } catch (error) {
      console.error('Failed to load implementations:', error);
    } finally {
      setIsLoadingImplementations(false);
    }
  };

  const getExpectedLevel = (): string => {
    if (moduleData.score >= 85) return 'advanced';
    if (moduleData.score >= 70) return 'intermediate';
    return 'beginner';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return '🎉 Outstanding performance! You\'ve mastered this module.';
    if (score >= 80) return '👏 Excellent work! You have a strong understanding.';
    if (score >= 70) return '👍 Good job! You\'re ready to move forward.';
    if (score >= 60) return '💪 Not bad! Consider reviewing some concepts.';
    return '📚 Keep practicing! Learning takes time and effort.';
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartAIAnalysis = () => {
    setShowAIAnalyzer(true);
  };

  const handleStartImplementation = (implementation: RealTimeImplementation) => {
    setSelectedImplementation(implementation);
    // In production, this would navigate to the implementation environment
    alert(`Starting real-time implementation: ${implementation.title}\n\nFeatures:\n- Step-by-step guidance\n- AI assistance\n- Real-time feedback\n- Error detection and suggestions`);
  };

  const handleTrackProgress = async (implementationId: string, stepCompleted: number) => {
    try {
      await axios.post('/api/ai-knowledge/track-progress', {
        implementationId,
        stepCompleted,
        timeSpent: Date.now(),
        userId,
        challenges: []
      });
    } catch (error) {
      console.error('Failed to track progress:', error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box textAlign="center" py={3}>
              <CheckCircle 
                sx={{ 
                  fontSize: 80, 
                  color: getScoreColor(moduleData.score),
                  mb: 2 
                }} 
              />
              <Typography variant="h4" gutterBottom>
                Module Completed!
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {moduleData.name}
              </Typography>
              
              <Card sx={{ mt: 3, mb: 3 }}>
                <CardContent>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h2" color={getScoreColor(moduleData.score)} fontWeight="bold">
                          {moduleData.score}%
                        </Typography>
                        <Typography variant="subtitle1">Your Score</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary">
                          {Math.round(moduleData.timeSpent / 60)}
                        </Typography>
                        <Typography variant="subtitle1">Minutes Spent</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="secondary">
                          {moduleData.completionPercentage}%
                        </Typography>
                        <Typography variant="subtitle1">Completion Rate</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              <Alert severity={getScoreColor(moduleData.score) as any} sx={{ mb: 2 }}>
                {getScoreMessage(moduleData.score)}
              </Alert>
            </Box>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box py={3}>
              <Typography variant="h5" gutterBottom align="center">
                <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
                AI Knowledge Analysis
              </Typography>
              
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    Our AI will analyze your performance to:
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUp color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Identify your strengths and areas for improvement"
                        secondary="Understand what you've mastered and what needs more practice"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Lightbulb color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Generate personalized learning recommendations"
                        secondary="Get tailored suggestions based on your learning patterns"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <RocketLaunch color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Provide real-time implementation opportunities"
                        secondary="Apply your knowledge with hands-on projects and scenarios"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Timeline color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Create your personalized learning path"
                        secondary="Plan your next steps and skill development journey"
                      />
                    </ListItem>
                  </List>
                  
                  <Box textAlign="center" mt={3}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Psychology />}
                      onClick={handleStartAIAnalysis}
                      sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976D2 30%, #1BA0D2 90%)',
                        }
                      }}
                    >
                      Start AI Analysis
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box py={3}>
              <Typography variant="h5" gutterBottom align="center">
                <Code sx={{ mr: 1, verticalAlign: 'middle' }} />
                Real-time Implementation
              </Typography>
              
              <Typography variant="body1" paragraph align="center">
                Apply your knowledge with hands-on projects that adapt to your learning progress.
              </Typography>

              {isLoadingImplementations ? (
                <Box sx={{ width: '100%', mt: 3 }}>
                  <LinearProgress />
                  <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    AI is generating personalized implementation scenarios...
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {implementations.map((implementation) => (
                    <Grid item xs={12} key={implementation.id}>
                      <Card 
                        sx={{ 
                          border: selectedImplementation?.id === implementation.id ? '2px solid #2196F3' : '1px solid #e0e0e0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: 3,
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        <CardContent>
                          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                            <Typography variant="h6" gutterBottom>
                              {implementation.title}
                            </Typography>
                            <Box>
                              <Chip 
                                label={implementation.difficulty} 
                                color={implementation.difficulty === 'advanced' ? 'error' : 
                                       implementation.difficulty === 'intermediate' ? 'warning' : 'success'}
                                size="small"
                                sx={{ mr: 1 }}
                              />
                              <Chip 
                                label={implementation.estimatedTime} 
                                variant="outlined"
                                size="small"
                              />
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" color="textSecondary" paragraph>
                            {implementation.description}
                          </Typography>
                          
                          <Box mb={2}>
                            <Typography variant="subtitle2" gutterBottom>
                              Technologies:
                            </Typography>
                            {implementation.technologies.map((tech, index) => (
                              <Chip 
                                key={index}
                                label={tech}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 1, mb: 1 }}
                              />
                            ))}
                          </Box>
                          
                          <Box display="flex" gap={1} mb={2}>
                            {implementation.realTimeGuidance && (
                              <Chip 
                                label="Real-time Guidance" 
                                color="primary" 
                                size="small"
                                icon={<RocketLaunch />}
                              />
                            )}
                            {implementation.aiAssistance && (
                              <Chip 
                                label="AI Assistant" 
                                color="secondary" 
                                size="small"
                                icon={<Psychology />}
                              />
                            )}
                          </Box>
                          
                          <Button
                            variant="contained"
                            startIcon={<PlayArrow />}
                            onClick={() => handleStartImplementation(implementation)}
                            fullWidth
                            sx={{ mt: 2 }}
                          >
                            Start Implementation
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box py={3} textAlign="center">
              <Assignment sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Your Learning Journey Continues
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        📊 Track Progress
                      </Typography>
                      <Typography variant="body2">
                        Monitor your implementation progress and get real-time feedback from our AI system.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        🤝 Get Support
                      </Typography>
                      <Typography variant="body2">
                        Access AI assistance, community help, and expert guidance whenever you need it.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        🚀 Level Up
                      </Typography>
                      <Typography variant="body2">
                        Take on more challenging projects and advance your DevOps expertise.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Alert severity="info" sx={{ mt: 3 }}>
                <strong>Remember:</strong> Learning DevOps is a journey, not a destination. 
                Keep practicing, stay curious, and don't hesitate to ask for help!
              </Alert>
            </Box>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: '70vh',
          }
        }}
      >
        <DialogTitle>
          Learning Progress & AI Analysis
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={currentStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="h6">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {step.description}
                  </Typography>
                  
                  <AnimatePresence mode="wait">
                    {currentStep === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderStepContent(index)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
          {currentStep < steps.length - 1 && (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <AIKnowledgeAnalyzer
        open={showAIAnalyzer}
        onClose={() => setShowAIAnalyzer(false)}
        moduleData={{
          id: moduleData.id,
          name: moduleData.name,
          userAnswers: moduleData.answers.map((answer, index) => ({
            questionId: `q-${index}`,
            questionType: 'multiple-choice',
            userAnswer: answer.userAnswer,
            correctAnswer: answer.correctAnswer,
            isCorrect: answer.isCorrect,
            timeToAnswer: answer.timeToAnswer || 30,
            hintsUsed: answer.hintsUsed || 0
          })),
          timeSpent: moduleData.timeSpent,
          completionPercentage: moduleData.completionPercentage
        }}
      />
    </>
  );
};

export default ModuleCompletionDialog;
