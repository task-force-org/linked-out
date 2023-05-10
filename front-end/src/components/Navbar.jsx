import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img
          className="logo"
          src="https://o.remove.bg/downloads/611fc39d-cfa1-4fb9-910a-63fe4c96c63d/image-removebg-preview.png"
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
