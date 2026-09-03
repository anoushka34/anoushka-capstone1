//LandingPage.tsx is meant to hold the outline of the first landing page that the user encounters
import "./RecipesPage.css";
import { useState } from "react";
import type { ChangeEvent } from "react";


//for arguments if needed, placeholder for now
type RecipesPageProps = {

};


export default function RecipePage({}: RecipesPageProps) {
    //need the search feature in this, get from movies project
    const [searchTerm, setSearchTerm] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
  }

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
        
        <div className="recipe-cards">
            <p className="recipe-grid-temp">
                Recipe Cards
            </p>
        </div> 
        
    </div>
</div>
  
);

}
