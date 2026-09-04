//like the login page project, import that AIAssistant jsx
//ex: import SignUpPage from "./pages/SignupPage/SignupPage";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";

import AIAssitant from "./pages/AIAssistant/AIAssistant";
import RecipePage from "./pages/RecipesPage/RecipesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/NavBar/NavBar";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleSignUpOrLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ai-assistant" element={<AIAssitant />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;