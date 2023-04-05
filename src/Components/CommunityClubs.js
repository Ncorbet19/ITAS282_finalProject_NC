import React from "react";
import "../css/Home.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-box">
      <div className="home-wrapper">
      <h1>Community Clubs </h1>
      <h2>Coming Soon!</h2>
        <p>
          We are excited to announce that we will soon be launching our new
          Community Clubs feature. This will allow you to create and join public
          movie clubs with people from all around the world!
        </p>
        <p>
          With Community Clubs, you'll be able to discover new movies, discuss
          your favorites, and plan movie nights with like-minded people. Whether
          you're a die-hard film buff or just love watching movies with friends,
          there's a club for everyone!
        </p>
        <p>
          So stay tuned for more information on our upcoming launch. In the
          meantime, you can still create private clubs and invite your friends
          to join. Sign up today and start exploring the world of movies with
          your friends!
        </p>

        <NavLink className="nav-action signUp" activeClassName="active" to="/signup">
          Sign Up!!!
        </NavLink>

      </div>
    </div>
  );
}
