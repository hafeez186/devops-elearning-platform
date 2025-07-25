import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Security,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface AdminLoginProps {
  children: React.ReactNode;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ children }) => {
  const { isAdmin, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  // If user is already admin, show the protected content
  if (isAdmin) {
    return <>{children}</>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLogging(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid admin credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLogging(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" alignItems="center" mb={3}>
            <Security sx={{ fontSize: 40, mr: 2, color: 'error.main' }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Admin Access
            </Typography>
          </Box>

          <Alert severity="warning" sx={{ mb: 3, width: '100%' }}>
            <Typography variant="body2">
              <strong>Restricted Area:</strong> This admin panel is protected and requires administrative privileges to access.
            </Typography>
          </Alert>

          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Admin Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
              placeholder="admin@devops-elearning.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdminPanelSettings color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Admin Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLogging || loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {isLogging ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1, width: '100%' }}>
            <Typography variant="caption" color="text.secondary" align="center" display="block">
              <strong>Demo Credentials:</strong><br />
              Email: admin@devops-elearning.com<br />
              Password: admin123
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Only authorized administrators can access this area.
            If you're not an admin, please return to the{' '}
            <Button
              variant="text"
              size="small"
              onClick={() => window.location.href = '/'}
              sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
            >
              home page
            </Button>
            .
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
