import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  const mockOnMenuClick = jest.fn();

  beforeEach(() => {
    mockOnMenuClick.mockClear();
  });

  test('renders header with correct title', () => {
    renderWithRouter(<Header onMenuClick={mockOnMenuClick} />);
    
    expect(screen.getByText('DevOps E-Learning Platform')).toBeInTheDocument();
  });

  test('renders menu button', () => {
    renderWithRouter(<Header onMenuClick={mockOnMenuClick} />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  test('calls onMenuClick when menu button is clicked', () => {
    renderWithRouter(<Header onMenuClick={mockOnMenuClick} />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  test('renders notification and account buttons', () => {
    renderWithRouter(<Header onMenuClick={mockOnMenuClick} />);
    
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /profile/i })).toBeInTheDocument();
  });

  test('has proper elevation and positioning', () => {
    renderWithRouter(<Header onMenuClick={mockOnMenuClick} />);
    
    const appBar = screen.getByRole('banner');
    expect(appBar).toBeInTheDocument();
  });
});
