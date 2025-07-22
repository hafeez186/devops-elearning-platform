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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Computer,
  Build,
  Code,
  Cloud,
  AccessTime,
  Star,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Linux Command Line Fundamentals',
      description: 'Master essential Linux commands, file system navigation, and shell scripting',
      category: 'Linux',
      difficulty: 'Beginner',
      duration: '8 hours',
      lessons: 25,
      rating: 4.8,
      enrolled: 1204,
      icon: <Computer color="primary" />,
      scenarios: ['File Management', 'Process Control', 'System Monitoring'],
    },
    {
      id: 2,
      title: 'Advanced Linux System Administration',
      description: 'Deep dive into system administration, user management, and security',
      category: 'Linux',
      difficulty: 'Advanced',
      duration: '12 hours',
      lessons: 35,
      rating: 4.9,
      enrolled: 892,
      icon: <Computer color="primary" />,
      scenarios: ['User Management', 'Network Configuration', 'Security Hardening'],
    },
    {
      id: 3,
      title: 'Git Version Control & Collaboration',
      description: 'Master Git workflows, branching strategies, and team collaboration',
      category: 'DevOps',
      difficulty: 'Beginner',
      duration: '6 hours',
      lessons: 20,
      rating: 4.7,
      enrolled: 1567,
      icon: <Build color="primary" />,
      scenarios: ['Merge Conflicts', 'Feature Branches', 'Release Management'],
    },
    {
      id: 4,
      title: 'Docker Containerization',
      description: 'Learn container concepts, Dockerfile creation, and Docker Compose',
      category: 'DevOps',
      difficulty: 'Intermediate',
      duration: '10 hours',
      lessons: 30,
      rating: 4.8,
      enrolled: 1345,
      icon: <Build color="primary" />,
      scenarios: ['Multi-stage Builds', 'Container Networking', 'Volume Management'],
    },
    {
      id: 5,
      title: 'Jenkins CI/CD Pipelines',
      description: 'Build automated pipelines with Jenkins, plugins, and integrations',
      category: 'CI/CD',
      difficulty: 'Intermediate',
      duration: '15 hours',
      lessons: 40,
      rating: 4.6,
      enrolled: 978,
      icon: <Code color="primary" />,
      scenarios: ['Pipeline as Code', 'Multi-branch Workflows', 'Deployment Automation'],
    },
    {
      id: 6,
      title: 'GitHub Actions Workflows',
      description: 'Automate your development workflow with GitHub Actions',
      category: 'CI/CD',
      difficulty: 'Intermediate',
      duration: '8 hours',
      lessons: 25,
      rating: 4.7,
      enrolled: 1123,
      icon: <Code color="primary" />,
      scenarios: ['Matrix Builds', 'Secrets Management', 'Custom Actions'],
    },
    {
      id: 7,
      title: 'Kubernetes Orchestration',
      description: 'Deploy and manage containerized applications with Kubernetes',
      category: 'DevOps',
      difficulty: 'Advanced',
      duration: '20 hours',
      lessons: 50,
      rating: 4.9,
      enrolled: 756,
      icon: <Build color="primary" />,
      scenarios: ['Pod Scaling', 'Service Discovery', 'Rolling Updates'],
    },
    {
      id: 8,
      title: 'AWS DevOps Solutions',
      description: 'Implement DevOps practices using AWS services and tools',
      category: 'Cloud',
      difficulty: 'Advanced',
      duration: '18 hours',
      lessons: 45,
      rating: 4.8,
      enrolled: 689,
      icon: <Cloud color="primary" />,
      scenarios: ['Infrastructure as Code', 'Auto Scaling', 'Disaster Recovery'],
    },
    {
      id: 9,
      title: 'Terraform Infrastructure as Code',
      description: 'Provision and manage infrastructure using Terraform',
      category: 'DevOps',
      difficulty: 'Intermediate',
      duration: '12 hours',
      lessons: 32,
      rating: 4.7,
      enrolled: 834,
      icon: <Build color="primary" />,
      scenarios: ['Multi-cloud Deployment', 'State Management', 'Module Development'],
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Courses
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Master DevOps skills through hands-on courses and real-world scenarios
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Linux">Linux</MenuItem>
                <MenuItem value="DevOps">DevOps</MenuItem>
                <MenuItem value="CI/CD">CI/CD</MenuItem>
                <MenuItem value="Cloud">Cloud</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficultyFilter}
                label="Difficulty"
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
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
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip label={course.category} size="small" />
                  <Chip 
                    label={course.difficulty} 
                    size="small" 
                    color={getDifficultyColor(course.difficulty) as any}
                    variant="outlined" 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{course.duration}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star fontSize="small" sx={{ mr: 0.5, color: 'warning.main' }} />
                    <Typography variant="body2">{course.rating}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{course.enrolled}</Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {course.lessons} lessons
                </Typography>
                
                <Typography variant="body2" fontWeight="medium" gutterBottom>
                  Real-world scenarios:
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {course.scenarios.map((scenario, index) => (
                    <Chip
                      key={index}
                      label={scenario}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </CardContent>
              
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Start Course
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCourses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No courses found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Courses;
