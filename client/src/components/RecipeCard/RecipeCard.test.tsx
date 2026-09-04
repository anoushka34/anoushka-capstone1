import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import RecipeCard from './RecipeCard';

const mockRecipe = {
  _id: '123',
  title: 'Pasta Primavera',
  description: 'A light and fresh pasta dish',
  image: 'https://example.com/pasta.jpg',
  tags: ['vegetarian', 'quick'],
};

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('RecipeCard', () => {
  it('renders the recipe title', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Pasta Primavera')).toBeInTheDocument();
  });

  it('renders the recipe description', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('A light and fresh pasta dish')).toBeInTheDocument();
  });

  it('renders the image with correct src and alt attributes', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);
    const image = screen.getByAltText('Pasta Primavera') as HTMLImageElement;
    expect(image.src).toBe('https://example.com/pasta.jpg');
  });

  it('renders tags joined as a comma-separated string', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('vegetarian, quick')).toBeInTheDocument();
  });

  it('links to the correct recipe detail page', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/recipes/123');
  });
});