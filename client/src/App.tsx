//like the login page project, import that AIAssistant jsx
//ex: import SignUpPage from "./pages/SignupPage/SignupPage";

import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";

import AIAssitant from "./pages/AIAssistant/AIAssistant";

function App() {
  return (
      <Routes>
  
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/ai-assistant" element={<AIAssitant/>}/>
      </Routes>
  );
}

export default App;
