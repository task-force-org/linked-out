import React from "react";
import Navbar from "./Navbar";
import "../css/App.css";
function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="home_body">{/* <Sidebar /> */}</div>
    </div>
  );
}

export default Home;
