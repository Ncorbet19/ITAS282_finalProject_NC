import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import "../css/signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import "../css/calender.css";
// import "../css/back.css";

const auth = getAuth();

const CreateUserForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [existingUserName, setExistingUserName] = useState("");
  const [existingEmail, setExistingEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setExistingUserName("");
    setError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setExistingEmail("");
    setError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // Check if userName already exists
    const usersRef = collection(db, "users");
    const userNameQuery = query(
      usersRef,
      where("userName", "==", userName.toLowerCase())
    );
    const userNameSnapshot = await getDocs(userNameQuery);
    if (!userNameSnapshot.empty) {
      setExistingUserName(userName);
      setUserName("");
      setEmail("");
      setPassword("");
      setError("");
      return;
    }
  
    // Check if email already exists
    const emailQuery = query(usersRef, where("email", "==", email));
    const emailSnapshot = await getDocs(emailQuery);
    if (!emailSnapshot.empty) {
      setExistingEmail(email);
      setUserName("");
      setEmail("");
      setPassword("");
      setError("");
      return;
    }
  
    // Check if password is valid
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created with ID: ", user.uid);
  
      const docRef = await addDoc(usersRef, {
        userName: userName.toLowerCase(),
        email: email,
        uid: user.uid, // Add the UID to the user document
      });
      console.log("Document written with ID: ", docRef.id);
  
      setUserName("");
      setEmail("");
      setPassword("");
      setExistingUserName("");
      setExistingEmail("");
      setError("");
      setMessage("User created go to your Club Dashboard");
    } catch (error) {
      console.error("Error creating user: ", error);
    }
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
    fetchRandomMovies();
  }, []);




  return (
    <div>
      <form onSubmit={handleFormSubmit} className="create-user-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="userName" className="form-label">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            className="form-input"
            value={userName}
            onChange={handleUserNameChange}
          />
          {existingUserName && (
            <p className="error-text">{existingUserName} already exists</p>
          )}
        </div>
        <div class="form-group">
          <label htmlFor="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            class="form-input email-input"
            value={email}
            onChange={handleEmailChange}
          />
          {existingEmail && (
            <p class="error-text">{existingEmail} is already registered</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Create User</button>
        <div>{message}</div>
        <div>{error}</div>
      </form>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="other-content-wrapper-signup">
            <div className="other-content">
              <div className="other-content-text">
                {moviePosters.map((poster, index) => (
                  <img
                    key={index}
                    src={poster}
                    alt="404"
                    style={{ width: "140px", padding: "20px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUserForm;
