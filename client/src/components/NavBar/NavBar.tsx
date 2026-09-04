import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/Logo.png";

type NavbarProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Spoonful logo" className="navbar-logo" />
      </Link>
      <div className="navbar-links">
        <Link to="/recipes">Explore Recipes</Link>
        <Link to="/ai-assistant">AI Assistant</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button type="button" className="navbar-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="navbar-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}