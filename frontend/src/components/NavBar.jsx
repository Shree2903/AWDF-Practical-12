import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    closeMenu();

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Portfolio</h2>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/projects" onClick={closeMenu}>
            Projects
          </Link>
        </li>

        <li>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/profile" onClick={closeMenu}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        </li>

        <li>
          <Link to="/register" onClick={closeMenu}>
            Register
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
