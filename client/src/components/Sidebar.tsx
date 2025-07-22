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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Courses', icon: <School />, path: '/courses' },
  { text: 'Progress', icon: <Timeline />, path: '/progress' },
  { text: 'Profile', icon: <Person />, path: '/profile' },
  { text: 'Admin Panel', icon: <AdminPanelSettings />, path: '/admin' },
];

const courseCategories = [
  { text: 'Linux Fundamentals', icon: <Computer />, path: '/courses/linux' },
  { text: 'DevOps Practices', icon: <Build />, path: '/courses/devops' },
  { text: 'CI/CD Tools', icon: <Code />, path: '/courses/cicd' },
  { text: 'Cloud Platforms', icon: <Cloud />, path: '/courses/cloud' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
