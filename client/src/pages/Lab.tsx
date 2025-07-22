import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Lab: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Interactive Lab
      </Typography>
      <Box>
        <Typography variant="body1">
          Interactive lab environment with terminal and code editor will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Lab;
