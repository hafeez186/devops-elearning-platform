import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Alert,
  LinearProgress,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  CheckCircle,
  ErrorOutline,
  Help,
  Code,
  Terminal,
  Psychology,
  ExpandMore,
  Lightbulb,
  Timer,
  ChatBubble,
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface RealTimeImplementationProps {
  implementation: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedTime: string;
    technologies: string[];
    steps: ImplementationStep[];
    expectedOutcomes: string[];
    prerequisites: string[];
    category: string;
  };
  userId: string;
  onComplete: () => void;
  onClose: () => void;
}

interface ImplementationStep {
  stepNumber: number;
  title: string;
  description: string;
  code?: string;
  commands?: string[];
  expectedResult: string;
  troubleshootingTips: string[];
}

interface AIHelp {
  question: string;
  answer: string;
  suggestions: string[];
  confidence: number;
  timestamp: Date;
}

const RealTimeImplementationEnvironment: React.FC<RealTimeImplementationProps> = ({
  implementation,
  userId,
  onComplete,
  onClose,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [stepProgress, setStepProgress] = useState<{ [key: number]: number }>({});
  const [userCode, setUserCode] = useState<{ [key: number]: string }>({});
  const [stepResults, setStepResults] = useState<{ [key: number]: { success: boolean; output: string } }>({});
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [aiHelpHistory, setAiHelpHistory] = useState<AIHelp[]>([]);
  const [helpQuestion, setHelpQuestion] = useState('');
  const [isLoadingHelp, setIsLoadingHelp] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<string>('');
  
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStepComplete = async (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
    setStepProgress({ ...stepProgress, [stepIndex]: 100 });

    // Track progress with AI
    try {
      await axios.post('/api/ai-knowledge/track-progress', {
        implementationId: implementation.id,
        stepCompleted: stepIndex + 1,
        timeSpent: elapsedTime,
        userId,
        challenges: currentChallenge ? [currentChallenge] : []
      });
    } catch (error) {
      console.error('Failed to track progress:', error);
    }

    // Move to next step
    if (stepIndex < implementation.steps.length - 1) {
      setActiveStep(stepIndex + 1);
    } else {
      // All steps completed
      onComplete();
    }
  };

  const handleRunCode = (stepIndex: number) => {
    const code = userCode[stepIndex] || implementation.steps[stepIndex].code || '';
    
    // Simulate code execution (in production, this would use a sandbox environment)
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      const output = success 
        ? `✅ Code executed successfully!\n\nExpected result achieved: ${implementation.steps[stepIndex].expectedResult}`
        : `❌ Error in execution:\nSyntaxError: Unexpected token\n\nSuggestion: Check your syntax and try again.`;
      
      setStepResults({
        ...stepResults,
        [stepIndex]: { success, output }
      });

      if (success) {
        setStepProgress({ ...stepProgress, [stepIndex]: 100 });
      }
    }, 2000);

    // Set progress to indicate running
    setStepProgress({ ...stepProgress, [stepIndex]: 50 });
  };

  const handleGetAIHelp = async () => {
    if (!helpQuestion.trim()) return;

    setIsLoadingHelp(true);
    try {
      const response = await axios.post('/api/ai-knowledge/real-time-help', {
        question: helpQuestion,
        context: `Implementation: ${implementation.title}, Step: ${activeStep + 1}`,
        currentStep: activeStep + 1,
        implementationId: implementation.id
      });

      if (response.data.success) {
        const newHelp: AIHelp = {
          question: helpQuestion,
          answer: response.data.help.answer,
          suggestions: response.data.help.suggestions,
          confidence: response.data.help.confidence,
          timestamp: new Date()
        };

        setAiHelpHistory([...aiHelpHistory, newHelp]);
        setHelpQuestion('');
      }
    } catch (error) {
      console.error('Failed to get AI help:', error);
    } finally {
      setIsLoadingHelp(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'primary';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success';
    if (progress > 0) return 'primary';
    return 'inherit';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                {implementation.title}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {implementation.description}
              </Typography>
              <Box mt={2}>
                <Chip 
                  label={implementation.difficulty} 
                  color={getDifficultyColor(implementation.difficulty) as any}
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={`${implementation.technologies.join(', ')}`}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white', mr: 1 }}
                />
                <Chip 
                  label={implementation.estimatedTime}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h3" component="div">
                  <Timer sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {formatTime(elapsedTime)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Time Elapsed
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(completedSteps.size / implementation.steps.length) * 100}
                  sx={{ mt: 2, height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Progress: {completedSteps.size}/{implementation.steps.length} steps
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Implementation Steps */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Implementation Steps
              </Typography>
              
              <Stepper activeStep={activeStep} orientation="vertical">
                {implementation.steps.map((step, index) => (
                  <Step key={index} completed={completedSteps.has(index)}>
                    <StepLabel>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="subtitle1">{step.title}</Typography>
                        {stepProgress[index] > 0 && stepProgress[index] < 100 && (
                          <LinearProgress 
                            variant="indeterminate" 
                            sx={{ width: 50, height: 4 }}
                          />
                        )}
                        {completedSteps.has(index) && (
                          <CheckCircle color="success" fontSize="small" />
                        )}
                      </Box>
                    </StepLabel>
                    
                    <StepContent>
                      <Typography variant="body2" paragraph>
                        {step.description}
                      </Typography>

                      {/* Code Section */}
                      {step.code && (
                        <Box mb={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Code:
                          </Typography>
                          <SyntaxHighlighter
                            language="bash"
                            style={tomorrow}
                            customStyle={{
                              borderRadius: 8,
                              padding: 16,
                              fontSize: 14
                            }}
                          >
                            {step.code}
                          </SyntaxHighlighter>
                          
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Modify or write your code here..."
                            value={userCode[index] || step.code || ''}
                            onChange={(e) => setUserCode({ ...userCode, [index]: e.target.value })}
                            sx={{ mt: 2 }}
                          />
                          
                          <Button
                            variant="contained"
                            startIcon={<PlayArrow />}
                            onClick={() => handleRunCode(index)}
                            sx={{ mt: 1, mr: 1 }}
                            disabled={stepProgress[index] === 50}
                          >
                            {stepProgress[index] === 50 ? 'Running...' : 'Run Code'}
                          </Button>
                        </Box>
                      )}

                      {/* Commands Section */}
                      {step.commands && step.commands.length > 0 && (
                        <Box mb={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Commands to run:
                          </Typography>
                          {step.commands.map((command, cmdIndex) => (
                            <Box key={cmdIndex} mb={1}>
                              <SyntaxHighlighter
                                language="bash"
                                style={tomorrow}
                                customStyle={{
                                  borderRadius: 4,
                                  padding: 8,
                                  fontSize: 12,
                                  margin: 0
                                }}
                              >
                                {command}
                              </SyntaxHighlighter>
                            </Box>
                          ))}
                        </Box>
                      )}

                      {/* Results */}
                      {stepResults[index] && (
                        <Alert 
                          severity={stepResults[index].success ? 'success' : 'error'}
                          sx={{ mb: 2 }}
                        >
                          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                            {stepResults[index].output}
                          </Typography>
                        </Alert>
                      )}

                      {/* Expected Result */}
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          <strong>Expected Result:</strong> {step.expectedResult}
                        </Typography>
                      </Alert>

                      {/* Troubleshooting Tips */}
                      {step.troubleshootingTips.length > 0 && (
                        <Accordion sx={{ mb: 2 }}>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="subtitle2">
                              <Lightbulb sx={{ mr: 1, verticalAlign: 'middle', fontSize: 18 }} />
                              Troubleshooting Tips
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List dense>
                              {step.troubleshootingTips.map((tip, tipIndex) => (
                                <ListItem key={tipIndex}>
                                  <ListItemIcon>
                                    <Lightbulb color="warning" fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary={tip} />
                                </ListItem>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      )}

                      {/* Action Buttons */}
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          onClick={() => handleStepComplete(index)}
                          disabled={completedSteps.has(index)}
                          startIcon={<CheckCircle />}
                        >
                          {completedSteps.has(index) ? 'Completed' : 'Mark as Complete'}
                        </Button>
                        
                        <Button
                          variant="outlined"
                          onClick={() => setCurrentChallenge(`Having trouble with step ${index + 1}: ${step.title}`)}
                          sx={{ ml: 1 }}
                          startIcon={<Help />}
                        >
                          Need Help?
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        {/* Side Panel */}
        <Grid item xs={12} md={4}>
          {/* Expected Outcomes */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Outcomes
              </Typography>
              <List dense>
                {implementation.expectedOutcomes.map((outcome, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={outcome}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* AI Help History */}
          {aiHelpHistory.length > 0 && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  AI Assistance History
                </Typography>
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {aiHelpHistory.map((help, index) => (
                    <Alert key={index} severity="info" sx={{ mb: 1 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Q:</strong> {help.question}
                      </Typography>
                      <Typography variant="body2">
                        <strong>A:</strong> {help.answer}
                      </Typography>
                    </Alert>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Psychology />}
                onClick={() => setShowAIHelp(true)}
                sx={{ mb: 1 }}
              >
                Get AI Help
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Terminal />}
                onClick={() => window.open('/terminal', '_blank')}
                sx={{ mb: 1 }}
              >
                Open Terminal
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={onClose}
              >
                Exit Implementation
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Help Dialog */}
      <Dialog open={showAIHelp} onClose={() => setShowAIHelp(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
          AI Assistant
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Ask any question about the current implementation step..."
            value={helpQuestion}
            onChange={(e) => setHelpQuestion(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleGetAIHelp}
            disabled={!helpQuestion.trim() || isLoadingHelp}
            startIcon={isLoadingHelp ? undefined : <ChatBubble />}
          >
            {isLoadingHelp ? 'Getting Help...' : 'Ask AI'}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Floating AI Help Button */}
      <Fab
        color="secondary"
        aria-label="ai-help"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setShowAIHelp(true)}
      >
        <Psychology />
      </Fab>
    </Box>
  );
};

export default RealTimeImplementationEnvironment;
