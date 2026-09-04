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
    _id?:string;
    id?:string;
    title: string;
    description: string;
    image:string;
    tags?: string[] | string
}

type RecipeCardProps = {
  recipe: CardInfo;
};

function RecipeCard({recipe}: RecipeCardProps) {
  const recipeId = recipe._id || recipe.id
  const tagsShown = Array.isArray(recipe.tags) ? recipe.tags.join(", "): recipe.tags|| "";
  return (
    <Link to={`/recipes/${recipeId}`} style={{textDecoration:"none", color:"inherit"}}>
      <div className="card">
        <h1 className="title">{recipe.title}</h1>
        <h2 className="description">{recipe.description}</h2>
        <img className="image" src={recipe.image} alt={recipe.title}/>
        {tagsShown && <h3 className="tags">{tagsShown}</h3>}
      </div>
    </Link>
  );
}

export default RecipeCard;