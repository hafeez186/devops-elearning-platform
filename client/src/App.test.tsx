import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock components to avoid routing issues in tests
jest.mock('./pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('./pages/Courses', () => {
  return function MockCourses() {
    return <div data-testid="courses-page">Courses Page</div>;
  };
});

jest.mock('./pages/CourseDetail', () => {
  return function MockCourseDetail() {
    return <div data-testid="course-detail-page">Course Detail Page</div>;
  };
});

jest.mock('./pages/Lab', () => {
  return function MockLab() {
    return <div data-testid="lab-page">Lab Page</div>;
  };
});

jest.mock('./pages/Progress', () => {
  return function MockProgress() {
    return <div data-testid="progress-page">Progress Page</div>;
  };
});

jest.mock('./pages/Profile', () => {
  return function MockProfile() {
    return <div data-testid="profile-page">Profile Page</div>;
  };
});

jest.mock('./pages/Admin', () => {
  return function MockAdmin() {
    return <div data-testid="admin-page">Admin Page</div>;
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
  });

  test('renders header component', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('has proper layout structure', () => {
    renderWithRouter(<App />);
    
    // Check for main content area
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveStyle({
      'flex-grow': '1',
      'padding-top': '64px' // 8 * 8px from theme
    });
  });

  test('applies correct background color', () => {
    renderWithRouter(<App />);
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveStyle({
      'background-color': '#f5f5f5'
    });
  });
});
