//like the login page project, import that AIAssistant jsx
//ex: import SignUpPage from "./pages/SignupPage/SignupPage";

import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";

import AIAssitant from "./pages/AIAssistant/AIAssistant";
import RecipePage from "./pages/RecipesPage/RecipesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
      <Routes>
  
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/ai-assistant" element={<AIAssitant/>}/>
        <Route path="/recipes" element={<RecipePage/>}/>
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={() => console.log("Logged in")}/>}/>
        <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={() => console.log("Signed up")}/>}/>
        <Route path="/recipes/:id" element={<RecipeDetails/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
  );
}

export default App;
