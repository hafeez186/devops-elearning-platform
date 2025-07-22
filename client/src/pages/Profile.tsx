import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        User Profile
      </Typography>
      <Box>
        <Typography variant="body1">
          User profile and settings will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
