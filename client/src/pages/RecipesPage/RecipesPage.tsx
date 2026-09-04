//LandingPage.tsx is meant to hold the outline of the first landing page that the user encounters
import "./RecipesPage.css";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import axios from "axios"



//for arguments if needed, placeholder for now
// type RecipesPageProps = {

// };


export default function RecipePage() {
  //need the search feature in this, get from movies project
  const [recipes, setRecipes] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/recipes/`).then((res) => setRecipes(res.data)).catch((err) => console.log(err));
  }, []);


  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function filterRecipes() {
    if (searchTerm === "") {
      return recipes;
    }
    return recipes.filter(function (recipe) {
      const title = (recipe.title || "").toLowerCase();
      const query = searchTerm.toLowerCase();
      return title.includes(query);
    });
  }
  const filtered = filterRecipes();

  //keep somewhat similar structure to landing page
  return (
    <div className="recipes-page">
      <div className="recipes-container">
        <h1 className="recipes-home">Discover Recipes</h1>
        <div className="recipe-search">
          <input
            type="text"
            name="search"
            placeholder="Search recipes by name, tag, or ingredients!"
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
          />
        </div>
        {filtered.length === 0 ? (
          <p className="no-results-message">
            {searchTerm
              ? `No recipes found matching "${searchTerm}"`
              : "No recipes available yet"}
          </p>
        ) : (
          <div className="recipe-cards">
            {filtered.map((recipe: any, index: number) => (
              <RecipeCard key={recipe._id || recipe.id || index} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

}