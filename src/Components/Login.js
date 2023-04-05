import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import ClubDetail from "./ClubDetail";
import "../css/calender.css";
import "../css/club-dashboard.css";
import "../css/back.css";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [clubNames, setClubNames] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showCreateClubForm, setShowCreateClubForm] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [email, setEmail] = useState("");

  const [errorColor, setErrorColor] = useState("black");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in with ID: ", user.uid);
      setLoggedIn(true); // set loggedIn to true after successful login
      setUserId(user.uid);
    } catch (error) {
      console.error("Error logging in: ", error);
      setError(error.message);
    }
  };

  const fetchClubNames = async (userName) => {
    const clubsSnapshot = await getDocs(collection(db, "clubs"));
    const names = [];

    for (const clubDoc of clubsSnapshot.docs) {
      const clubData = clubDoc.data();

      if (
        clubData.users &&
        clubData.users.some((u) => u.userName === userName)
      ) {
        names.push(clubData.name);
      }
    }

    return names;
  };

  useEffect(() => {
    if (loggedIn && userName) {
      fetchClubNames(userName).then((names) => {
        setClubNames(names);
      });
    }
  }, [loggedIn, userName]);

  const handleCreateClub = async (e) => {
    e.preventDefault();
    const clubRef = collection(db, "clubs");
    await addDoc(clubRef, {
      name: newClubName,
      movies: [],
      users: [{ id: userId, userName: userName }],
    });
    setClubNames([...clubNames, newClubName]);
    setNewClubName("");
    setShowCreateClubForm(false);
    setSelectedClub(null); // close any open clubs
  };

  const handleClubClick = (name) => {
    setSelectedClub(name);
    setShowCreateClubForm(false);
  };

  const [moviePosters, setMoviePosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomMovies = async () => {
    const apiKey = "74915c59";
    const randomMovies = [
      "The Shawshank Redemption",
      "The Godfather",
      "The Godfather: Part II",
      "The Dark Knight",
      "12 Angry Men",
      "Schindler's List",
      "The Lord of the Rings: The Return of the King",
      "Pulp Fiction",
      "The Good, the Bad and the Ugly",
      "Fight Club",
      "Forrest Gump",
      "Inception",
      "The Lord of the Rings: The Fellowship of the Ring",
      "The Lord of the Rings: The Two Towers",
      "Star Wars: Episode V - The Empire Strikes Back",
      "The Matrix",
      "Goodfellas",
      "Saving Private Ryan",
      "The Silence of the Lambs",
      "Se7en",
      "Gladiator",
      "The Usual Suspects",
      "American Beauty",
      "The Green Mile",
      "The Prestige",
      "Interstellar",
      "The Departed",
      "Blade Runner",
      "The Terminator",
      "Alien",
      "The Truman Show",
      "The Social Network",
      "Eternal Sunshine of the Spotless Mind",
      "Her",
      "Amélie",
      "La La Land",
      "Whiplash",
      "The Grand Budapest Hotel",
      "Pan's Labyrinth",
      "Spirited Away",
      "The Lion King",
      "Finding Nemo",
      "Up",
      "Toy Story",
      "The Incredibles",
      "Monsters, Inc.",
      "Ratatouille",
      "WALL·E",
      "Inside Out",
      "The Avengers",
      "The Dark Knight Rises",
      "Iron Man",
      "Spider-Man: Into the Spider-Verse",
      "Black Panther",
      "Wonder Woman",
      "Jurassic Park",
      "Avatar",
      "2001: A Space Odyssey",
      "Back to the Future",
      "Star Wars: Episode IV - A New Hope",
      "Indiana Jones and the Raiders of the Lost Ark",
      "Jaws",
      "E.T. the Extra-Terrestrial",
      "The Shining",
      "Psycho",
      "Halloween",
      "The Exorcist",
      "Get Out",
      "The Texas Chain Saw Massacre",
      "Rosemary's Baby",
      "The Witch",
      "Hereditary",
      "Midsommar",
      "The Blair Witch Project",
      "Paranormal Activity",
      "It Follows",
      "The Babadook",
      "A Quiet Place",
      "Us",
      "The Lighthouse",
      "Moonlight",
      "Birdman",
      "Boyhood",
      "The Revenant",
      "Mad Max: Fury Road",
      "Memories of Murder",
      "The Host",
      "Grave of the Fireflies",
    ];
    const movieDataPromises = randomMovies.map(async (movieTitle) => {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
          movieTitle
        )}`
      );
      const data = await response.json();
      return data;
    });

    const movieDataArray = await Promise.all(movieDataPromises);
    const posterUrls = movieDataArray.map((data) => data.Poster);

    const startIndex = Math.floor(Math.random() * (posterUrls.length - 15 + 1));
    setMoviePosters(posterUrls.slice(startIndex, startIndex + 15));
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedClub === null) {
      fetchRandomMovies();
    }
  }, [selectedClub]);

  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <h2>Login</h2>
        {error && <p style={{ color: errorColor }}>{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
        <div>
            <label htmlFor="text">User Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {loggedIn && (
          <div className="club-detail">
            <h3>Clubs:</h3>
            <ul>
              {clubNames.map((name, index) => (
                <li key={index}>
                  <a href="#" onClick={() => handleClubClick(name)}>
                    {name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" onClick={() => setShowCreateClubForm(true)}>
                  Create Your Own Club
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="other-content-wrapper">
        <div className="other-content">
          <div className="other-content-text">
            {selectedClub !== null && !showCreateClubForm && (
              <>
                <ClubDetail clubName={selectedClub} />
              </>
            )}
            {selectedClub === null && !showCreateClubForm && (
              <>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    {moviePosters.map((poster, index) => (
                      <img
                        key={index}
                        src={poster}
                        alt="404"
                        style={{ width: "140px", padding: "20px" }}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
            {showCreateClubForm && (
              <div className="padding">
                <form onSubmit={handleCreateClub}>
                  <h3>Create Your Own Club</h3>
                  <div>
                    <label htmlFor="newClubName">Name:</label>
                    <input
                      type="text"
                      id="newClubName"
                      value={newClubName}
                      onChange={(e) => setNewClubName(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Create Club</button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewClubName("");
                      setShowCreateClubForm(false);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
