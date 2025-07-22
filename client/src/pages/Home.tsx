import React from 'react';
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
} from '@mui/material';
import {
  PlayArrow,
  Computer,
  Build,
  Code,
  Cloud,
  TrendingUp,
  Assignment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const featuredCourses = [
    {
      id: 1,
      title: 'Linux Command Line Mastery',
      description: 'Master essential Linux commands and shell scripting for DevOps automation',
      category: 'Linux',
      difficulty: 'Beginner',
      duration: '8 hours',
      progress: 65,
      icon: <Computer color="primary" />,
    },
    {
      id: 2,
      title: 'Jenkins CI/CD Pipeline',
      description: 'Build robust CI/CD pipelines with Jenkins, Docker, and Kubernetes',
      category: 'CI/CD',
      difficulty: 'Intermediate',
      duration: '12 hours',
      progress: 30,
      icon: <Code color="primary" />,
    },
    {
      id: 3,
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
          Welcome to DevOps Learning Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Master Linux, DevOps, and CI/CD with hands-on labs and real-world scenarios
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

      {/* Featured Courses */}
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
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {course.icon}
                  <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                    {course.title}
                  </Typography>
                </Box>
                
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
    </Container>
  );
};

export default Home;
