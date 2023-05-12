import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      require("../css/App.css");
    }
  }, [location.pathname]);

  return (
    <div className="home">
      <Navbar />
      <div className="home_body">{/* <Sidebar /> */}</div>
    </div>
  );
}

export default Home;

