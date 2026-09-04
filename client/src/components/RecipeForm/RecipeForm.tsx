//input handling for the recipe criteria
//what needs to be included
// title, image, ingrdients, instructions, tags, description
//          required field validation, success message when submitted, UI should
//          be updated without reload

import { useState, useEffect } from 'react';

type FormFields = {
  title:string;
  image: string;
  ingredients:string;
  instructions:string;
  tags:string;
  description:string;
};

type FormProps = {
    handleSubmit: (recipeData: FormFields) => void;
    initialData?: any;
    buttonText?: string;
}


function RecipeForm({ handleSubmit, initialData, buttonText = "Create Recipe"}: FormProps) {
  const [formData, setFormData] = useState<FormFields>({
    title: '', 
    description: '', 
    image: '',
    ingredients: '', 
    instructions: '',
    tags: '', 
    
  });

  useEffect (() => {
    if(initialData) {
      setFormData({
        title:initialData.title || '', 
        description: initialData.desctiption || '', 
        image: initialData.image || '', 
        ingredients : typeof initialData.ingredients == 'string' ? initialData.ingredients: JSON.stringify(initialData.ingredients || ''),
        instructions : typeof initialData.instructions == 'string' ? initialData.instructions: JSON.stringify(initialData.instructions || ''),
        tags : typeof initialData.tags == 'string' ? initialData.tags: JSON.stringify(initialData.tags || ''),
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
    setFormData({...formData, [event.target.name]: event.target.value, })
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
    <form onSubmit={onSubmit}>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <br/>

      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

      <br/>
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />

      <br/>

      <input type="text" name="tags" placeholder="Tags" value={formData.tags} onChange={handleChange} required />

      <br/>

      <textarea name="ingredients" placeholder="Ingredients" value={formData.ingredients} onChange={handleChange} required />

      <br/>

      <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />
      <br/>

      <button type="submit">Create Recipe</button>
    </form>
  );
}

export default RecipeForm;