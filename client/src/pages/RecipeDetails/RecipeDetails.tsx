
//   "title": "Steak baby!",
//   "description": "Crunchy romaine with creamy cashew Caesar dressing.",
//   "image": "https://example.com/images/vegan-caesar.jpg",
//   "ingredients": [
//     { "name": "Romaine lettuce", "quantity": "1 head" },
//     { "name": "Cashews", "quantity": "1/2 cup" },
//     { "name": "Lemon juice", "quantity": "2 tbsp" },
//     { "name": "Dijon mustard", "quantity": "1 tsp" },
//     { "name": "Garlic clove", "quantity": "1" }
//   ],
//   "instructions": [
//     { "step": 1, "description": "Blend the cashews, lemon juice, mustard, and garlic until smooth." },
//     { "step": 2, "description": "Chop romaine lettuce and place in a bowl." },
//     { "step": 3, "description": "Toss with the blended dressing and serve chilled." }
//   ],
//   "tags": ["vegan", "salad", "healthy"]

// }



import { useParams, Link } from 'react-router-dom'

import {useState, useEffect} from 'react';

import axios from "axios";

export default function RecipeDetails() {
    const {id} = useParams();
    const[recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/recipes/${id}`).then((res)=>setRecipe(res.data)).catch((err)=>console.log(err));
    }, [id]);
    
    if(!recipe) return <p>loading</p>
    return (
        <div>
            <h1> {recipe.title}</h1>

            <p>{recipe.description}</p>

            <img src= {recipe.image} alt={recipe.title} />
            <p>Tags: {recipe.tags} </p>

            <h2>Ingridents</h2>
            <p>{recipe.ingredients}</p>

            <h2>Instructions</h2>
            <p>{recipe.instructions}</p>
    
        </div>
    );
}