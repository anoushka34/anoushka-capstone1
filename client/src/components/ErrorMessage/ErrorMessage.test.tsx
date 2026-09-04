import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the provided message text', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('applies the error-message class', () => {
    render(<ErrorMessage message="Invalid input" />);
    const element = screen.getByText('Invalid input');
    expect(element).toHaveClass('error-message');
  });

  it('renders as a paragraph element', () => {
    render(<ErrorMessage message="Test error" />);
    const element = screen.getByText('Test error');
    expect(element.tagName).toBe('P');
  });
});