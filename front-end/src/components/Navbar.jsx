import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img
          className="logo"
          src="https://o.remove.bg/downloads/60596ab5-9352-4222-94a6-4050c1c5c62d/Screenshot_2023-05-12_015504-removebg-preview.png"
          alt="Logo"
        />
      </div>
      <div className="navbar__links">
        <a href="#">Home</a>
        <a href="#">My Network</a>
        <a href="#">Jobs</a>
        <a href="#">Messaging</a>
        <a href="#">Notifications</a>
      </div>
      <div className="navbar__search">
        <input type="text" placeholder="Search" />
      </div>
    </nav>
  );
}

export default Navbar;
