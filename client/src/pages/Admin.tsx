import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Alert,
  Chip,
} from '@mui/material';
import { AdminPanelSettings, Security, Person } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import ContentAdmin from '../components/ContentAdmin';

const AdminPage: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <AdminPanelSettings sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Admin Panel
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                icon={<Security />}
                label="Authenticated Admin"
                color="success"
                size="small"
              />
              <Chip
                icon={<Person />}
                label={`Welcome, ${user?.firstName || user?.username}`}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          🎉 <strong>Access Granted!</strong> You are now logged in as an administrator. 
          Use the content management interface below to manage your e-learning platform.
        </Alert>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Content Management
          </Typography>
          <Typography variant="body1" paragraph>
            Use the content admin interface to:
          </Typography>
          <Box component="ul" sx={{ mb: 3 }}>
            <li>Upload video files (MP4, WebM, OGV - up to 500MB)</li>
            <li>Create and manage courses</li>
            <li>Add lessons and organize content</li>
            <li>Create quizzes and assessments</li>
            <li>Manage course metadata and structure</li>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => setAdminOpen(true)}
            startIcon={<AdminPanelSettings />}
            sx={{ mt: 2 }}
          >
            Open Content Admin
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button variant="outlined" onClick={() => setAdminOpen(true)}>
              Upload Videos
            </Button>
            <Button variant="outlined" onClick={() => setAdminOpen(true)}>
              Create Course
            </Button>
            <Button variant="outlined" onClick={() => setAdminOpen(true)}>
              Manage Content
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Documentation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            For detailed instructions on content creation, refer to the Content Creator's Guide and API documentation.
          </Typography>
        </Box>
      </Paper>

      <ContentAdmin 
        open={adminOpen} 
        onClose={() => setAdminOpen(false)} 
      />
    </Container>
  );
};

export default AdminPage;
