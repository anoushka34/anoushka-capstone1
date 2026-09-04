// src/pages/LoginPage/LoginPage.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


type LoginPageProps = {
  handleSignUpOrLogin: () => void;
};

export default function LoginPage({ handleSignUpOrLogin }: LoginPageProps) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/users/login", state);
      const token = response.data.token || response.data;
      localStorage.setItem("token", token);

      handleSignUpOrLogin();
      navigate("/dashboard");
    } catch (err: any) {
      console.log("Login fail", err);
      setError(err.response?.data?.message || err.response?.data?.error || "invalid email or password");
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2 className="login-header">Login</h2>
        <form autoComplete="off" onSubmit={handleSubmit} className="login-form">
          <div className="login-segment">
            <input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
              className="login-input"
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
              className="login-input"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
          <div className="login-message">
            New to Us? <Link to="/signup">Sign up</Link>
          </div>
          {error ? <ErrorMessage message={error} /> : null}
        </form>
      </div>
    </div>
  );
}