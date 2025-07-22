import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Add,
  VideoLibrary,
  Description,
  Code,
  Quiz,
  Delete,
  Edit,
  CloudUpload,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface ContentAdminProps {
  open: boolean;
  onClose: () => void;
}

const ContentAdmin: React.FC<ContentAdminProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState('courses');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  // Video upload with drag & drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('video', file);

      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadedFiles(prev => [...prev, {
              id: Date.now(),
              name: file.name,
              size: file.size,
              type: file.type,
              url: `/api/content/videos/${file.name}`
            }]);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // In a real app, make actual API call here
      // fetch('/api/content/upload/video', {
      //   method: 'POST',
      //   body: formData
      // })
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    maxSize: 500 * 1024 * 1024 // 500MB
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Typography variant="h5">Content Management</Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['courses', 'videos', 'lessons', 'quizzes'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'contained' : 'text'}
                onClick={() => setActiveTab(tab)}
                sx={{ textTransform: 'capitalize' }}
              >
                {tab}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Video Upload Tab */}
        {activeTab === 'videos' && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Video Content Management
            </Typography>
            
            {/* Video Upload Area */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    bgcolor: isDragActive ? 'primary.light' : 'grey.50',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUpload sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {isDragActive ? 'Drop videos here' : 'Drag & drop videos or click to browse'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supports MP4, WebM, OGG (max 500MB per file)
                  </Typography>
                </Box>
                
                {isUploading && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Uploading... {uploadProgress}%
                    </Typography>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Uploaded Videos List */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Uploaded Videos
                </Typography>
                <List>
                  {uploadedFiles.map((file) => (
                    <ListItem key={file.id}>
                      <VideoLibrary sx={{ mr: 2 }} />
                      <ListItemText
                        primary={file.name}
                        secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <Edit />
                        </IconButton>
                        <IconButton edge="end">
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Course Management Tab */}
        {activeTab === 'courses' && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Course Management
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ mb: 3 }}
            >
              Create New Course
            </Button>

            <Grid container spacing={2}>
              {/* Sample courses */}
              {[
                { title: 'Linux Fundamentals', lessons: 25, difficulty: 'Beginner' },
                { title: 'Docker Mastery', lessons: 30, difficulty: 'Intermediate' },
                { title: 'Kubernetes Advanced', lessons: 40, difficulty: 'Advanced' },
              ].map((course, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {course.lessons} lessons
                      </Typography>
                      <Chip 
                        label={course.difficulty} 
                        size="small" 
                        color={course.difficulty === 'Beginner' ? 'success' : 
                               course.difficulty === 'Intermediate' ? 'warning' : 'error'}
                      />
                    </CardContent>
                    <CardActions>
                      <Button size="small" startIcon={<Edit />}>
                        Edit
                      </Button>
                      <Button size="small" startIcon={<VideoLibrary />}>
                        Manage Videos
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Lesson Management Tab */}
        {activeTab === 'lessons' && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Lesson Content
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Lesson Title"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Lesson Type</InputLabel>
                  <Select label="Lesson Type">
                    <MenuItem value="video">
                      <VideoLibrary sx={{ mr: 1 }} /> Video
                    </MenuItem>
                    <MenuItem value="text">
                      <Description sx={{ mr: 1 }} /> Text/Reading
                    </MenuItem>
                    <MenuItem value="lab">
                      <Code sx={{ mr: 1 }} /> Interactive Lab
                    </MenuItem>
                    <MenuItem value="quiz">
                      <Quiz sx={{ mr: 1 }} /> Quiz
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  type="number"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Lesson Content"
                  multiline
                  rows={8}
                  variant="outlined"
                  placeholder="Enter lesson content in markdown format..."
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" sx={{ mr: 2 }}>
                Save Lesson
              </Button>
              <Button variant="outlined">
                Preview
              </Button>
            </Box>
          </Box>
        )}

        {/* Quiz Management Tab */}
        {activeTab === 'quizzes' && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Quiz Management
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Create interactive quizzes to test student understanding
            </Alert>

            <Button
              variant="contained"
              startIcon={<Add />}
            >
              Add Quiz Question
            </Button>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
        <Button variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContentAdmin;
