import React from "react";





function Navbar() {


  
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img
          className="logo"
          src="https://www.dallasdigitalmarketers.org/wp-content/uploads/2017/06/linkedoutlogo060717.jpg"
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
        <input type="text" placeholder="Search..." />
      </div>
    </nav>
  );
}

export default Navbar;
