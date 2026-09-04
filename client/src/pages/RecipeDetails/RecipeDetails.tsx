import { useParams, Link } from 'react-router-dom'

import { useState, useEffect } from 'react';

import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/recipes/${id}`).then((res) => setRecipe(res.data)).catch((err) => console.log(err));
  }, [id]);
  if (!recipe) return <p>loading</p>
  return (
    <div>
      <h1> {recipe.title}</h1>

      <p><strong>Description:</strong> {recipe.description}</p>

      <img src={recipe.image} alt={recipe.title} />
      <p>Tags: {Array.isArray(recipe.tags) ? recipe.tags.join(", ") : recipe.tags}</p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients?.map((ing: any, index: number) => (
          <li key={index}>
            {ing.name}{ing.quantity ? ` - ${ing.quantity}` : ""}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipe.instructions?.map((instr: any) => (
          <li key={instr.step}>{instr.description}</li>
        ))}
      </ol>
    </div>
  );
}