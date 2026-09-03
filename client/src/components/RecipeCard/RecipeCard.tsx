// {
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

import "./RecipeCard.css"
import { Link } from 'react-router-dom';

//use interface to list out what is needed in the Recipe Card

// export interface ToastMessageData {
//   id: string;
//   title: string;
//   description: string;
//   type: ToastMessageType;
// }
export interface CardInfo {
    title: string;
    description: string;
    image:string;
    tags: string[]

}

type RecipeCardProps = {
  recipe: CardInfo;
};

function RecipeCard({recipe}: RecipeCardProps) {
  return (
    <Link to="/recipes/1" style={{textDecoration:"none", color:"inherit"}}>
      <div className="card">
        <h1 className="title">{recipe.title}</h1>
        <h2 className="description">{recipe.description}</h2>
        <img className="image" src={recipe.image} alt={recipe.title}/>
        <h3 className="tags">{recipe.tags.join(', ')}</h3>
      </div>
    </Link>
  );
}

export default RecipeCard;