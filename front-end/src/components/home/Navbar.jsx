import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname) require("../css/nav.css");
  }, [location.pathname]);
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <div className="logo-container">
          <img
            className="logo"
            src="https://www.reallysimplesystems.com/assets/blog_images/linkedout/linkedout-2.jpeg"
            alt="Logo"
          />
        </div>
        <label htmlFor="menuToggle" className="menu-btn">
          <input className="hidden" type="checkbox" id="menuToggle" />
          <div className="menu"></div>
          <div className="menu"></div>
          <div className="menu"></div>
        </label>
        <div className="nav-container">
          <ul className="nav-tabs">
            <li className="nav-tab">Home</li>
            <li className="nav-tab" onClick={() => navigate("/indiv")}>
              Login as individual
            </li>
            <li className="nav-tab" onClick={() => navigate("/company")}>
              Login as a Company
            </li>
            <li className="nav-tab">FAQ</li>
            <li className="nav-tab">Contact</li>
            <li className="nav-tab">Careers</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
