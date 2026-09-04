import { useState, useEffect } from 'react';
import "./RecipeForm.css";

type FormFields = {
  title: string;
  image: string;
  ingredients: string;
  instructions: string;
  tags: string;
  description: string;
};

type FormProps = {
  handleSubmit: (recipeData: FormFields) => void;
  initialData?: any;
  buttonText?: string;
}

function formatIngredients(ingredients: any): string {
  if (!ingredients) return '';
  if (typeof ingredients === 'string') return ingredients;
  if (Array.isArray(ingredients)) {
    return ingredients
      .map((ing) => {
        if (typeof ing === 'string') return ing;
        return ing.quantity ? `${ing.name}, ${ing.quantity}` : ing.name;
      })
      .join('\n');
  }
  return '';
}

function formatInstructions(instructions: any): string {
  if (!instructions) return '';
  if (typeof instructions === 'string') return instructions;
  if (Array.isArray(instructions)) {
    return instructions
      .slice()
      .sort((a, b) => (a.step || 0) - (b.step || 0))
      .map((instr) => (typeof instr === 'string' ? instr : instr.description))
      .join('\n');
  }
  return '';
}

function formatTags(tags: any): string {
  if (!tags) return '';
  if (typeof tags === 'string') return tags;
  if (Array.isArray(tags)) return tags.join(', ');
  return '';
}

function RecipeForm({ handleSubmit, initialData, buttonText = "Create Recipe" }: FormProps) {
  const [formData, setFormData] = useState<FormFields>({
    title: '',
    description: '',
    image: '',
    ingredients: '',
    instructions: '',
    tags: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        image: initialData.image || '',
        ingredients: formatIngredients(initialData.ingredients),
        instructions: formatInstructions(initialData.instructions),
        tags: formatTags(initialData.tags),
      });
    }
    else {
      setFormData({
        title: '',
        description: '',
        image: '',
        ingredients: '',
        instructions: '',
        tags: '',
      });
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value, })
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(formData);
    setFormData({
      title: '',
      description: '',
      image: '',
      ingredients: '',
      instructions: '',
      tags: '',
    });
  };

  return (
    <form className="recipe-form" onSubmit={onSubmit}>
      <label className="form-label">Title</label>
      <input className="form-input" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

      <label className="form-label">Description</label>
      <textarea className="form-input" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

      <label className="form-label">Image URL</label>
      <input className="form-input" type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />

      <label className="form-label">Tags</label>
      <input className="form-input" type="text" name="tags" placeholder="Tags" value={formData.tags} onChange={handleChange} required />

      <label className="form-label">Ingredients</label>
      <textarea className="form-input" name="ingredients" placeholder="Ingredients" value={formData.ingredients} onChange={handleChange} required />

      <label className="form-label">Instructions</label>
      <textarea className="form-input" name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />

      <button type="submit" className="btn-primary">{buttonText}</button>
    </form>
  );
}

export default RecipeForm;