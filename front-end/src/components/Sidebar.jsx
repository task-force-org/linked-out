import React from "react";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img src="https://via.placeholder.com/150" alt="Profile" />
        <h2>Linked out</h2>
        <p>Company</p>
      </div>
      <div className="sidebar__links">
        <a href="#">Profile</a>
        <a href="#">Connections</a>
        <a href="#">Messages</a>
        <a href="#">Interests</a>
      </div>
    </div>
  );
}

export default Sidebar;
