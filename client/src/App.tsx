import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import AdminLogin from './components/AdminLogin';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Lab from './pages/Lab';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import MonitoringDashboard from './pages/MonitoringDashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Header onMenuClick={handleSidebarToggle} />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8, // Account for header height
            px: 3,
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/lab/:id" element={<Lab />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/monitoring" element={<MonitoringDashboard />} />
            <Route 
              path="/admin" 
              element={
                <AdminLogin>
                  <Admin />
                </AdminLogin>
              } 
            />
          </Routes>
        </Box>
      </Box>
    </AuthProvider>
  );
}

export default App;
