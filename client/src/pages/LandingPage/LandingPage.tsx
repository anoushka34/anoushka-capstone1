//LandingPage.tsx is meant to hold the outline of the first landing page that the user encounters
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";


//for arguments if needed, placeholder for now
type LandingPageProps = {

};


export default function LandingPage({}: LandingPageProps) {
    //this will do the path following parth
    const navigate = useNavigate();


    function handleExploreRecipes() {
        //if the explore recipes is clicked, go to recipes page
        navigate("/recipes");
    }   

    function handleLogin() {
        //if the login buttin is clicked, go to the login page
        navigate("/login");
    }

    return (
    <div className="landing-page">
      <div className="landing-container">
        //NOT COMPLETE: find a way to insert the icon/logo later
        <h1 className="landing-home">Spoonful</h1>
            <p 
                className="landing-description">Discover new recipes!
            </p>
        
        <div className="landing-routes">
            <button 
                type="button"
                className="exlpore-recipes-btn"
                onClick={handleExploreRecipes}
            >
                Explore Recipes
            </button>

            <button 
                type="button"
                className="login-btn"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    </div>
</div>
  
);

}
