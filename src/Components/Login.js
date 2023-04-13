import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import ClubDetail from "./ClubDetail";
import "../css/calender.css";
import "../css/club-dashboard.css";
import "../css/back.css";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [clubNames, setClubNames] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showCreateClubForm, setShowCreateClubForm] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [email, setEmail] = useState("");
  const [storedUserName, setStoredUserName] = useState("");
  const [errorColor, setErrorColor] = useState("black");

  const [selectedEvent, setSelectedEvent] = useState(null);

const handleEventSelection = (event) => {
  setSelectedEvent(event);
};

  const getUserNameByEmail = async (email) => {
    const usersSnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );
    if (usersSnapshot.docs.length > 0) {
      return usersSnapshot.docs[0].data().userName;
    }
    return null;
  };

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
      const storedName = await getUserNameByEmail(email);

      if (storedName) {
        console.log("User logged in with ID: ", user.uid);
        setLoggedIn(true); // set loggedIn to true after successful login
        setUserId(user.uid);
        setStoredUserName(storedName); // set the stored user name
        setError(""); // Clear any previous error messages
      } else {
        setError("There is no user associated with that email.");
        setErrorColor("red");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      setError(error.message);
      setErrorColor("red");
    }
  };

  const fetchClubNames = async () => {
    const clubsSnapshot = await getDocs(collection(db, "clubs"));
    const names = [];

    for (const clubDoc of clubsSnapshot.docs) {
      const clubData = clubDoc.data();

      if (
        clubData.users &&
        clubData.users.some((u) => u.userName === storedUserName)
      ) {
        names.push(clubData.name);
      }
    }

    return names;
  };

  useEffect(() => {
    if (loggedIn) {
      fetchClubNames().then((names) => {
        setClubNames(names);
      });
    }
  }, [loggedIn]);

  const handleCreateClub = async (e) => {
    e.preventDefault();
    const clubRef = collection(db, "clubs");
    const clubQuery = query(clubRef, where("name", "==", newClubName));
    const matchingClubs = await getDocs(clubQuery);
    if (!matchingClubs.empty) {
      alert(`A club with the name "${newClubName}" already exists!`);
      return;
    }
    await addDoc(clubRef, {
      name: newClubName,
      movies: [],
      users: [{ id: userId, userName: storedUserName }],
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
      "Pulp Fiction",
      "Schindler's List",
      "Inception",
      "The Dark Knight",
      "Fight Club",
      "Forrest Gump",
      "The Matrix",
      "Goodfellas",
      "City of God",
      "The Godfather: Part II",
      "Eternal Sunshine of the Spotless Mind",
      "The Departed",
      "Taxi Driver",
      "The Prestige",
      "No Country for Old Men",
      "American Beauty",
      "Gladiator",
      "The Silence of the Lambs",
      "Apocalypse Now",
      "The Green Mile",
      "The Pianist",
      "12 Years a Slave",
      "The Revenant",
      "Parasite",
      "The Wolf of Wall Street",
      "The Sixth Sense",
      "American History X",
      "Interstellar",
      "Whiplash",
      "Django Unchained",
      "Saving Private Ryan",
      "Cinema Paradiso",
      "La La Land",
      "Good Will Hunting",
      "Trainspotting",
      "Reservoir Dogs",
      "Memento",
      "One Flew Over the Cuckoo's Nest",
      "Mulholland Drive",
      "Fargo",
      "Moonlight",
      "The Big Lebowski",
      "A Clockwork Orange",
      "The Usual Suspects",
      "There Will Be Blood",
      "Pan's Labyrinth",
      "Blade Runner",
      "The Grand Budapest Hotel",
      "Oldboy",
      "The Social Network",
      "The Shining",
      "Casablanca",
      "Raging Bull",
      "Scarface",
      "Seven",
      "Chinatown",
      "Citizen Kane",
      "Gone with the Wind",
      "Amélie",
      "Her",
      "Lawrence of Arabia",
      "Lost in Translation",
      "Vertigo",
      "Psycho",
      "Rear Window",
      "North by Northwest",
      "Birdman",
      "Boyhood",
      "Requiem for a Dream",
      "The Royal Tenenbaums",
      "Drive",
      "Nightcrawler",
      "Magnolia",
      "Heat",
      "The Great Escape",
      "Donnie Darko",
      "The Exorcist",
      "Rosemary's Baby",
      "The Seventh Seal",
      "A Beautiful Mind",
      "Life is Beautiful",
      "Three Billboards Outside Ebbing, Missouri",
      "The Truman Show",
      "Spotlight",
      "Manchester by the Sea",
      "Get Out",
      "The Shape of Water",
      "Black Swan"
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
                <ClubDetail clubName={selectedClub} onClose={() => setSelectedEvent(null)}/>
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
