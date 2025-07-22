import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Progress: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Learning Progress
      </Typography>
      <Box>
        <Typography variant="body1">
          Progress tracking dashboard will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Progress;
