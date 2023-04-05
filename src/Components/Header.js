import React from "react";
import { NavLink } from "react-router-dom";
import "../css/App.css";

export default function Header() {
  return (
    <div>
      <header className="container">
        <nav>
          <NavLink className="nav-action" activeClassName="active" to="/Home">
            Home
          </NavLink>
          <NavLink className="nav-action" activeClassName="active" to="/signup">
            Sign Up
          </NavLink>
          <NavLink
            className="nav-action"
            activeClassName="active"
            to="/CommunityClubs"
          >
            Community Clubs
          </NavLink>
          <NavLink
            className="nav-action"
            activeClassName="active"
            to="/club-dashboard"
          >
            Club Dashboard
          </NavLink>
        </nav>
      </header>
    </div>
  );
}
