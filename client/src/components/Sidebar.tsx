import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Home,
  School,
  Code,
  Timeline,
  Person,
  Computer,
  Build,
  Cloud,
  AdminPanelSettings,
  Dashboard,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();

  // Base menu items (available to all users)
  const baseMenuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Courses', icon: <School />, path: '/courses' },
    { text: 'Progress', icon: <Timeline />, path: '/progress' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    { text: 'Monitoring', icon: <Dashboard />, path: '/monitoring' },
    { text: 'Admin Panel', icon: <AdminPanelSettings />, path: '/admin' },
  ];

  // Combine menu items based on user role
  const menuItems = isAdmin ? [...baseMenuItems, ...adminMenuItems] : baseMenuItems;

  const courseCategories = [
    { text: 'Linux Fundamentals', icon: <Computer />, path: '/courses/linux' },
    { text: 'DevOps Practices', icon: <Build />, path: '/courses/devops' },
    { text: 'CI/CD Tools', icon: <Code />, path: '/courses/cicd' },
    { text: 'Cloud Platforms', icon: <Cloud />, path: '/courses/cloud' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const drawerWidth = 280;

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ p: 2, mt: 8 }}>
        <Typography variant="h6" color="primary">
          Navigation
        </Typography>
      </Box>
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ px: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Course Categories
        </Typography>
      </Box>
      
      <List>
        {courseCategories.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{ fontSize: '0.875rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
