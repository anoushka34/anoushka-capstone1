import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './NavBar';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Navbar', () => {
  it('shows Login link when user is logged out', () => {
    renderWithRouter(<Navbar isLoggedIn={false} onLogout={vi.fn()} />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('does not show Dashboard or Logout when logged out', () => {
    renderWithRouter(<Navbar isLoggedIn={false} onLogout={vi.fn()} />);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('shows Dashboard and Logout when user is logged in', () => {
    renderWithRouter(<Navbar isLoggedIn={true} onLogout={vi.fn()} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('does not show Login when logged in', () => {
    renderWithRouter(<Navbar isLoggedIn={true} onLogout={vi.fn()} />);
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('always shows the Explore Recipes link regardless of login state', () => {
    renderWithRouter(<Navbar isLoggedIn={false} onLogout={vi.fn()} />);
    expect(screen.getByText('Explore Recipes')).toBeInTheDocument();
  });

  it('calls onLogout when the Logout button is clicked', () => {
    const mockLogout = vi.fn();
    renderWithRouter(<Navbar isLoggedIn={true} onLogout={mockLogout} />);
    screen.getByText('Logout').click();
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});