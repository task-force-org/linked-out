import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      require("../css/Home.css");
    }
  }, [location.pathname]);

  const handleAboutClick = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div className="home">
      <div className="banner-area">
        <header>
          <div className="menu">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#" onClick={handleAboutClick}>
                  About
                </a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </header>
        <div className="banner-text">
          {!showAbout && (
            <>
              <div className="banner-text-left">
                <h1>Connection will make the Word better</h1>
              </div>
            </>
          )}

          {showAbout && (
            <>
              <img
                src="https://o.remove.bg/downloads/281c571c-fe5a-4e45-8d79-8e3767c4123d/Screenshot_2023-05-10_113927-removebg-preview.png"
                alt=""
              />

              <p>
                Linked Out is a social networking platform designed for
                professionals to connect and network with each other. It is
                often described as the "Facebook for professionals" and allows
                users to create a profile with their education, work experience,
                and skills. The platform is primarily used for job searching and
                recruiting, with job seekers able to search for job openings and
                recruiters able to search for candidates based on specific
                criteria.{" "}
              </p>
            </>
          )}
          <a onClick={() => navigate("/company")}>Login as a Company</a>
          <a onClick={() => navigate("/indiv")}>Login as a Individual</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
