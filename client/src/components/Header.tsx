import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School,
  NotificationsOutlined,
  AccountCircle,
  ExitToApp,
  Security,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <School sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DevOps E-Learning Platform
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAdmin && (
            <Chip
              icon={<Security />}
              label="Admin"
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ color: 'white', borderColor: 'white' }}
            />
          )}
          
          <IconButton color="inherit" aria-label="notifications">
            <NotificationsOutlined />
          </IconButton>
          
          <Button
            color="inherit"
            startIcon={<AccountCircle />}
            sx={{ textTransform: 'none' }}
          >
            {user?.firstName || 'Profile'}
          </Button>

          {isAdmin && (
            <Button
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={handleLogout}
              sx={{ textTransform: 'none', ml: 1 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
