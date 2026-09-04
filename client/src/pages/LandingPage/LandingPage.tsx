//LandingPage.tsx is meant to hold the outline of the first landing page that the user encounters
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";


type LandingPageProps = {
  isLoggedIn: boolean;
};


export default function LandingPage({ isLoggedIn }: LandingPageProps) {
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

  function handleDashboard() {
    navigate("/dashboard");
  }

  return (
    <div className="landing-page">
      <div className="landing-container">
        <img src={logo} alt="Spoonful logo" className="landing-logo" />
        <p
          className="landing-description">Discover new recipes!
        </p>
        <div className="landing-routes">
          <button
            type="button"
            className="explore-recipes-btn"
            onClick={handleExploreRecipes}
          >
            Explore Recipes
          </button>

          {isLoggedIn ? (
            <button
              type="button"
              className="login-btn"
              onClick={handleDashboard}
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              type="button"
              className="login-btn"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );

}