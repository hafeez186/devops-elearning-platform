import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Alert,
  Fab,
} from '@mui/material';
import {
  PlayArrow,
  Computer,
  Build,
  Code,
  Cloud,
  TrendingUp,
  Assignment,
  Psychology,
  RocketLaunch,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ModuleCompletionDialog from '../components/ModuleCompletionDialog';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showModuleCompletion, setShowModuleCompletion] = useState(false);

  // Mock module completion data for demo
  const mockModuleData = {
    id: 'docker-basics',
    name: 'Docker Fundamentals',
    score: 85,
    answers: [
      { userAnswer: 'A', correctAnswer: 'A', isCorrect: true, timeToAnswer: 25 },
      { userAnswer: 'B', correctAnswer: 'C', isCorrect: false, timeToAnswer: 45 },
      { userAnswer: 'C', correctAnswer: 'C', isCorrect: true, timeToAnswer: 20 },
      { userAnswer: 'A', correctAnswer: 'A', isCorrect: true, timeToAnswer: 30 },
      { userAnswer: 'D', correctAnswer: 'B', isCorrect: false, timeToAnswer: 60 },
    ],
    timeSpent: 3600, // 1 hour in seconds
    completionPercentage: 100,
  };

  const featuredCourses = [
    {
      id: 'linux-mastery',
      title: 'Linux Command Line Mastery',
      description: 'Master essential Linux commands and shell scripting for DevOps automation',
      category: 'Linux',
      difficulty: 'Beginner',
      duration: '8 hours',
      progress: 65,
      icon: <Computer color="primary" />,
    },
    {
      id: 'jenkins-pipeline',
      title: 'Jenkins CI/CD Pipeline',
      description: 'Build robust CI/CD pipelines with Jenkins, Docker, and Kubernetes',
      category: 'CI/CD',
      difficulty: 'Intermediate',
      duration: '12 hours',
      progress: 30,
      icon: <Code color="primary" />,
    },
    {
      id: 'docker-fundamentals',
      title: 'Docker & Kubernetes',
      description: 'Containerization and orchestration for modern DevOps workflows',
      category: 'DevOps',
      difficulty: 'Intermediate',
      duration: '15 hours',
      progress: 0,
      icon: <Build color="primary" />,
    },
  ];

  const stats = [
    { label: 'Courses Completed', value: '12', icon: <Assignment /> },
    { label: 'Hours Learned', value: '84', icon: <TrendingUp /> },
    { label: 'Labs Completed', value: '28', icon: <Code /> },
    { label: 'Certificates Earned', value: '3', icon: <Cloud /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to AI Learning Based Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Master Linux, DevOps, and CI/CD with AI-powered personalized learning and real-world scenarios
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
          onClick={() => navigate('/courses')}
          sx={{ mt: 2 }}
        >
          Start Learning
        </Button>
      </Box>

      {/* Learning Content Images Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Explore Our Learning Content
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card 
              elevation={3}
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <Box
                sx={{
                  height: 200,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.3
                  }}
                />
                <Typography variant="h3" component="div" sx={{ zIndex: 1, fontSize: '3rem' }}>
                  🤖✨
                </Typography>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom color="primary" fontWeight="bold">
                  AI-Powered Learning
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Experience personalized learning with AI analysis, real-time feedback, 
                  and adaptive content that adjusts to your learning pace and style.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip size="small" label="Smart Analysis" color="primary" variant="outlined" />
                  <Chip size="small" label="Real-time Feedback" color="secondary" variant="outlined" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              elevation={3}
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <Box
                sx={{
                  height: 200,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20l20-20H20v20z'/%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.3
                  }}
                />
                <Typography variant="h3" component="div" sx={{ zIndex: 1, fontSize: '3rem' }}>
                  🛠️💻
                </Typography>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom color="primary" fontWeight="bold">
                  Hands-On DevOps Labs
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Practice with real-world DevOps scenarios, Docker containers, 
                  Kubernetes clusters, and CI/CD pipelines in our interactive lab environment.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip size="small" label="Docker" color="info" variant="outlined" />
                  <Chip size="small" label="Kubernetes" color="success" variant="outlined" />
                  <Chip size="small" label="CI/CD" color="warning" variant="outlined" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              elevation={3}
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <Box
                sx={{
                  height: 200,
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='10,0 20,10 10,20 0,10'/%3E%3C/g%3E%3C/svg%3E")`,
                  opacity: 0.3
                }}
                />
                <Typography variant="h3" component="div" sx={{ zIndex: 1, fontSize: '3rem' }}>
                  📊🚀
                </Typography>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom color="primary" fontWeight="bold">
                  Real-Time Implementation
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Apply your knowledge immediately with AI-guided implementation, 
                  step-by-step tutorials, and instant feedback on your progress.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip size="small" label="Step-by-Step" color="primary" variant="outlined" />
                  <Chip size="small" label="AI Guidance" color="secondary" variant="outlined" />
                  <Chip size="small" label="Instant Feedback" color="success" variant="outlined" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 1 }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* AI Learning Journey Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Your AI-Powered Learning Journey
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 4,
                p: 4,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 300
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: -30,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" gutterBottom>
                  🧠 Smart Learning Path
                </Typography>
                <Typography variant="body1" paragraph>
                  Our AI analyzes your learning style, pace, and knowledge gaps to create 
                  a personalized curriculum that adapts as you progress.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: '#4CAF50', 
                    mr: 2 
                  }} />
                  <Typography variant="body2">Adaptive content delivery</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: '#2196F3', 
                    mr: 2 
                  }} />
                  <Typography variant="body2">Real-time progress tracking</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: '#FF9800', 
                    mr: 2 
                  }} />
                  <Typography variant="body2">Intelligent recommendations</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom color="primary">
                Learning Pathway Visualization
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  p: 3,
                  border: '2px dashed',
                  borderColor: 'primary.light',
                  borderRadius: 2,
                  minHeight: 300,
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Paper elevation={3} sx={{ p: 2, borderRadius: '50%', bgcolor: 'primary.main', color: 'white' }}>
                    <Typography variant="h6">📚</Typography>
                  </Paper>
                  <Typography variant="body1" fontWeight="medium">Learn Concepts</Typography>
                </Box>
                
                <Box sx={{ height: 30, borderLeft: '2px solid', borderColor: 'primary.light' }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Paper elevation={3} sx={{ p: 2, borderRadius: '50%', bgcolor: 'secondary.main', color: 'white' }}>
                    <Typography variant="h6">🤖</Typography>
                  </Paper>
                  <Typography variant="body1" fontWeight="medium">AI Analysis</Typography>
                </Box>
                
                <Box sx={{ height: 30, borderLeft: '2px solid', borderColor: 'primary.light' }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Paper elevation={3} sx={{ p: 2, borderRadius: '50%', bgcolor: 'success.main', color: 'white' }}>
                    <Typography variant="h6">💻</Typography>
                  </Paper>
                  <Typography variant="body1" fontWeight="medium">Implement & Practice</Typography>
                </Box>
                
                <Box sx={{ height: 30, borderLeft: '2px solid', borderColor: 'primary.light' }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Paper elevation={3} sx={{ p: 2, borderRadius: '50%', bgcolor: 'warning.main', color: 'white' }}>
                    <Typography variant="h6">🎯</Typography>
                  </Paper>
                  <Typography variant="body1" fontWeight="medium">Master Skills</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Featured Courses Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Continue Learning
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Pick up where you left off or start a new learning path
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {featuredCourses.map((course) => (
          <Grid item xs={12} md={4} key={course.id}>
            <Card
              className="course-card"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              {/* Course Visual Header */}
              <Box
                sx={{
                  height: 120,
                  background: course.id === 'docker-fundamentals' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : course.id === 'kubernetes-basics'
                    ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.3
                  }}
                />
                <Box sx={{ zIndex: 1, textAlign: 'center' }}>
                  <Typography variant="h3" component="div" sx={{ fontSize: '3rem' }}>
                    {course.icon}
                  </Typography>
                  <Chip 
                    label="AI Enhanced" 
                    size="small" 
                    sx={{ 
                      mt: 1, 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }} 
                  />
                </Box>
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                  {course.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={course.category} size="small" />
                  <Chip label={course.difficulty} size="small" variant="outlined" />
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Duration: {course.duration}
                </Typography>
                
                {course.progress > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2">{course.progress}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                )}
              </CardContent>
              
              <CardActions>
                <Button
                  variant={course.progress > 0 ? 'contained' : 'outlined'}
                  fullWidth
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  {course.progress > 0 ? 'Continue' : 'Start Course'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Computer />}
              onClick={() => navigate('/lab/terminal')}
              sx={{ py: 2 }}
            >
              Open Terminal Lab
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Code />}
              onClick={() => navigate('/lab/editor')}
              sx={{ py: 2 }}
            >
              Code Editor
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Build />}
              onClick={() => navigate('/courses/devops')}
              sx={{ py: 2 }}
            >
              DevOps Tools
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<TrendingUp />}
              onClick={() => navigate('/progress')}
              sx={{ py: 2 }}
            >
              View Progress
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Module Completion Demo - AI Analysis */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          AI Knowledge Analysis Demo
        </Typography>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="body1" paragraph>
            This is a demo of the AI-powered knowledge analysis module. The system has analyzed your performance and generated insights.
          </Typography>
          
          <Button
            variant="contained"
            onClick={() => setShowModuleCompletion(true)}
            startIcon={<Psychology />}
            sx={{ mt: 2 }}
          >
            View Analysis Report
          </Button>
        </Paper>
      </Box>

      {/* AI Learning Demo Section */}
      <Box sx={{ mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <Psychology sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h2">
              AI-Powered Learning Analysis
            </Typography>
          </Box>
          
          <Typography variant="h6" paragraph>
            Experience the future of personalized learning with our AI system that:
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <TrendingUp sx={{ mr: 1 }} />
                <Typography>Analyzes your knowledge after each module</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <RocketLaunch sx={{ mr: 1 }} />
                <Typography>Provides real-time implementation guidance</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <Assignment sx={{ mr: 1 }} />
                <Typography>Creates personalized learning paths</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Code sx={{ mr: 1 }} />
                <Typography>Offers hands-on project recommendations</Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Alert severity="info" sx={{ mb: 3, backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <Typography color="white">
              <strong>Try the Demo:</strong> See how our AI analyzes learning progress and provides 
              real-time implementation opportunities based on your performance.
            </Typography>
          </Alert>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<Psychology />}
            onClick={() => setShowModuleCompletion(true)}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
              },
              mr: 2
            }}
          >
            Try AI Analysis Demo
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={<RocketLaunch />}
            onClick={() => navigate('/courses')}
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            Start Learning Now
          </Button>
        </Paper>
      </Box>

      {/* Module Completion Dialog - Demo Purpose */}
      <ModuleCompletionDialog
        open={showModuleCompletion}
        onClose={() => setShowModuleCompletion(false)}
        moduleData={mockModuleData}
        userId="demo-user-123"
      />
    </Container>
  );
};

export default Home;
