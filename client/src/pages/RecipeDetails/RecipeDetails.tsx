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