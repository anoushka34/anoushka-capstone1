import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import RecipeForm from './RecipeForm';

describe('RecipeForm', () => {
  it('renders all expected input fields', () => {
    render(<RecipeForm handleSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Image URL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tags')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingredients')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Instructions')).toBeInTheDocument();
  });

  it('uses the default button text when none is provided', () => {
    render(<RecipeForm handleSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Create Recipe' })).toBeInTheDocument();
  });

  it('uses a custom button text when provided', () => {
    render(<RecipeForm handleSubmit={vi.fn()} buttonText="Update Recipe" />);
    expect(screen.getByRole('button', { name: 'Update Recipe' })).toBeInTheDocument();
  });

  it('updates input values as the user types', async () => {
    const user = userEvent.setup();
    render(<RecipeForm handleSubmit={vi.fn()} />);

    const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
    await user.type(titleInput, 'Chocolate Cake');

    expect(titleInput.value).toBe('Chocolate Cake');
  });

  it('calls handleSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<RecipeForm handleSubmit={mockSubmit} />);

    await user.type(screen.getByPlaceholderText('Title'), 'Soup');
    await user.type(screen.getByPlaceholderText('Description'), 'Warm and cozy');
    await user.type(screen.getByPlaceholderText('Image URL'), 'http://example.com/soup.jpg');
    await user.type(screen.getByPlaceholderText('Tags'), 'comfort food');
    await user.type(screen.getByPlaceholderText('Ingredients'), 'broth, 2 cups');
    await user.type(screen.getByPlaceholderText('Instructions'), 'Simmer for 20 minutes');

    await user.click(screen.getByRole('button', { name: 'Create Recipe' }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Soup',
      description: 'Warm and cozy',
      image: 'http://example.com/soup.jpg',
      tags: 'comfort food',
      ingredients: 'broth, 2 cups',
      instructions: 'Simmer for 20 minutes',
    });
  });

  it('pre-fills fields when initialData is provided', () => {
    const initialData = {
      title: 'Existing Recipe',
      description: 'An existing description',
      image: 'http://example.com/existing.jpg',
      tags: ['tag1', 'tag2'],
      ingredients: [{ name: 'flour', quantity: '2 cups' }],
      instructions: [{ step: 1, description: 'Mix everything' }],
    };
    render(<RecipeForm handleSubmit={vi.fn()} initialData={initialData} />);

    expect(screen.getByDisplayValue('Existing Recipe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('An existing description')).toBeInTheDocument();
  });
});