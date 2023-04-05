import React from "react";
import "../css/Home.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-box">
      <div className="home-wrapper">
        <h1>Movie Club App</h1>
        <p>
          Welcome to my Information Technology and Applied Systems Web and
          Mobile Development final project! This project was born out of my
          desire to streamline movie nights with my friends. Initially, I
          created a basic website using HTML, CSS, and some JavaScript, but it
          required frequent manual updates, and only I could create movie clubs.
          For my final project, I decided to revamp the app and enable users to
          create and invite their friends to movie clubs. Now, you can easily
          organize movie nights with your friends, hassle-free!
        </p>
        <p>
          So why wait? Sign up today and start exploring the world of movies
          with your friends!
        </p>

        <NavLink className="nav-action signUp" activeClassName="active" to="/signup">
          Sign Up!!!
        </NavLink>
        <br></br>
        <br></br>
        <strong>Please note:</strong>

        <ul>
          <li>
            This app is currently under development, so please keep in mind that
            some features may not be fully functional yet.
          </li>

          <li>The website has not been optimized for mobile use yet.</li>
        </ul>
      </div>
    </div>
  );
}
