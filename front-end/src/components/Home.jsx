import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  const handleSignupAsIndividual = () => {
    navigate("/indiv");
  };

  const handleSignupAsCompany = () => {
    navigate("/company");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      require("../css/App.css");
    }
  }, [location.pathname]);

  return (
    <div className="home">
      <Navbar />
      <div className="home_body">
        <div className="signup_buttons">
          <button onClick={handleSignupAsIndividual}>
            Sign up as an individual
          </button>
          <button onClick={handleSignupAsCompany}>Sign up as a company</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
