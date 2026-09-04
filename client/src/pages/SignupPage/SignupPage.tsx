// src/pages/SignupPage/SignupPage.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./SignupPage.css";

import { useNavigate } from "react-router-dom";

import axios from "axios";


type SignupPageProps = {
  handleSignUpOrLogin: () => void;
};

export default function SignUpPage({ handleSignUpOrLogin }: SignupPageProps) {
  const [error, setError] = useState("");

  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConf: "",
  });

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (state.password !== state.passwordConf) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Sending payload:", state);
      const response = await axios.post("http://localhost:3000/api/users/signup", {
        email: state.email.trim(),
        password: state.password,
      });

      const token = response.data.token || response.data;
      if (token) {
        localStorage.setItem("token", token);
      }

      handleSignUpOrLogin();
      navigate("/dashboard");
    } catch (err: any) {
      console.log("Signup error:", err);
      console.log("Server said:", err.response?.data);
      setError(err.response?.data?.message || err.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-form-container">
        <h2 className="signup-header">Sign Up</h2>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="signup-form"
        >
          <div className="signup-segment">
            <input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
              className="signup-input"
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
              className="signup-input"
            />
            <input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
              className="signup-input"
            />
          </div>
          <button type="submit" className="signup-btn">
            Signup
          </button>
          {error ? <ErrorMessage message={error} /> : null}
        </form>
      </div>
    </div>
  );
}