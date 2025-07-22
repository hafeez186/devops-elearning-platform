import React, { useState, useEffect } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  CheckCircle,
  RadioButtonUnchecked,
  Assignment,
  Code,
  Quiz,
  VideoLibrary,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'lab' | 'quiz';
  duration: string;
  completed: boolean;
  videoUrl?: string;
  content?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  instructor: string;
  modules: Module[];
  progress: number;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | false>('module-1');

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockCourse: Course = {
      id: id || '1',
      title: 'Linux Command Line Fundamentals',
      description: 'Master essential Linux commands, file system navigation, and shell scripting for DevOps automation.',
      category: 'Linux',
      difficulty: 'Beginner',
      duration: '8 hours',
      instructor: 'John DevOps',
      progress: 35,
      modules: [
        {
          id: 'module-1',
          title: 'Getting Started with Linux',
          duration: '2 hours',
          lessons: [
            {
              id: 'lesson-1',
              title: 'Introduction to Linux',
              type: 'video',
              duration: '15 min',
              completed: true,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            },
            {
              id: 'lesson-2',
              title: 'Terminal Basics',
              type: 'video',
              duration: '20 min',
              completed: true,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            },
            {
              id: 'lesson-3',
              title: 'First Commands Lab',
              type: 'lab',
              duration: '30 min',
              completed: false,
            },
            {
              id: 'lesson-4',
              title: 'Module 1 Quiz',
              type: 'quiz',
              duration: '10 min',
              completed: false,
            },
          ],
        },
        {
          id: 'module-2',
          title: 'File System Navigation',
          duration: '2.5 hours',
          lessons: [
            {
              id: 'lesson-5',
              title: 'Directory Structure',
              type: 'video',
              duration: '18 min',
              completed: false,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            },
            {
              id: 'lesson-6',
              title: 'Navigation Commands',
              type: 'video',
              duration: '25 min',
              completed: false,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            },
            {
              id: 'lesson-7',
              title: 'File Operations Lab',
              type: 'lab',
              duration: '45 min',
              completed: false,
            },
          ],
        },
        {
          id: 'module-3',
          title: 'File Management and Permissions',
          duration: '2 hours',
          lessons: [
            {
              id: 'lesson-8',
              title: 'File Permissions Overview',
              type: 'video',
              duration: '20 min',
              completed: false,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            },
            {
              id: 'lesson-9',
              title: 'chmod and chown Commands',
              type: 'video',
              duration: '15 min',
              completed: false,
            },
            {
              id: 'lesson-10',
              title: 'Permissions Lab',
              type: 'lab',
              duration: '40 min',
              completed: false,
            },
          ],
        },
      ],
    };

    setCourse(mockCourse);
    setCurrentLesson(mockCourse.modules[0].lessons[0]);
  }, [id]);

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const handleLessonComplete = () => {
    if (currentLesson && course) {
      // Mark lesson as completed
      const updatedCourse = { ...course };
      updatedCourse.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.id === currentLesson.id) {
            lesson.completed = true;
          }
        });
      });
      setCourse(updatedCourse);

      // Find next lesson
      let nextLesson: Lesson | null = null;
      for (const module of updatedCourse.modules) {
        for (const lesson of module.lessons) {
          if (!lesson.completed) {
            nextLesson = lesson;
            break;
          }
        }
        if (nextLesson) break;
      }

      if (nextLesson) {
        setCurrentLesson(nextLesson);
      }
    }
  };

  const getIconForLessonType = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoLibrary />;
      case 'lab':
        return <Code />;
      case 'quiz':
        return <Quiz />;
      default:
        return <Assignment />;
    }
  };

  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading course...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Course Content */}
        <Grid item xs={12} md={8}>
          {/* Course Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {course.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={course.category} />
              <Chip label={course.difficulty} variant="outlined" />
              <Chip label={`${course.duration}`} variant="outlined" />
            </Box>
            <Typography variant="body2" gutterBottom>
              Progress: {course.progress}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={course.progress}
              sx={{ height: 8, borderRadius: 4, mb: 2 }}
            />
          </Box>

          {/* Current Lesson Content */}
          {currentLesson && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {currentLesson.title}
                </Typography>
                
                {currentLesson.type === 'video' && currentLesson.videoUrl && (
                  <VideoPlayer
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    onComplete={handleLessonComplete}
                  />
                )}
                
                {currentLesson.type === 'lab' && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Interactive Lab Exercise
                    </Typography>
                    <Typography variant="body1" paragraph>
                      In this lab, you'll practice the commands you've learned. 
                      Use the terminal below to complete the exercises.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/lab/${currentLesson.id}`)}
                      startIcon={<Code />}
                    >
                      Open Lab Environment
                    </Button>
                  </Box>
                )}
                
                {currentLesson.type === 'quiz' && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Knowledge Check
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Test your understanding of the concepts covered in this module.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Quiz />}
                    >
                      Start Quiz
                    </Button>
                  </Box>
                )}
                
                {currentLesson.type === 'text' && (
                  <Box>
                    <Typography variant="body1">
                      Text lesson content would be rendered here from markdown.
                    </Typography>
                  </Box>
                )}
              </CardContent>
              
              <CardActions>
                <Button
                  variant="contained"
                  onClick={handleLessonComplete}
                  disabled={currentLesson.completed}
                  startIcon={currentLesson.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                >
                  {currentLesson.completed ? 'Completed' : 'Mark Complete'}
                </Button>
              </CardActions>
            </Card>
          )}
        </Grid>

        {/* Course Navigation Sidebar */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Contents
              </Typography>
              
              {course.modules.map((module) => (
                <Accordion
                  key={module.id}
                  expanded={expandedModule === module.id}
                  onChange={(_, isExpanded) =>
                    setExpandedModule(isExpanded ? module.id : false)
                  }
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle1">{module.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {module.duration}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {module.lessons.map((lesson) => (
                        <ListItem
                          key={lesson.id}
                          button
                          selected={currentLesson?.id === lesson.id}
                          onClick={() => handleLessonSelect(lesson)}
                        >
                          <ListItemIcon>
                            {lesson.completed ? (
                              <CheckCircle color="success" />
                            ) : (
                              getIconForLessonType(lesson.type)
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={lesson.title}
                            secondary={lesson.duration}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary">
                Instructor: {course.instructor}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail;
