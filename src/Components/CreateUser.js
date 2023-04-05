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
      "Avengers: Endgame",
      "Avatar",
      "Titanic",
      "Star Wars: The Force Awakens",
      "Avengers: Infinity War",
      "Jurassic World",
      "The Lion King",
      "The Avengers",
      "Furious 7",
      "Frozen II",
      "Frozen",
      "Harry Potter and the Deathly Hallows Part 2",
      "The Fate of the Furious",
      "Iron Man 3",
      "Minions",
      "Captain America: Civil War",
      "Aquaman",
      "The Lord of the Rings: The Return of the King",
      "Spider-Man: Far From Home",
      "Transformers: Age of Extinction",
      "Black Panther",
      "Beauty and the Beast",
      "Incredibles 2",
      "The Hobbit: An Unexpected Journey",
      "Despicable Me 3",
      "Jumanji: Welcome to the Jungle",
      "Pirates of the Caribbean: Dead Man's Chest",
      "The Dark Knight Rises",
      "Zootopia",
      "The Hunger Games: Catching Fire",
      "Finding Dory",
      "Pirates of the Caribbean: At World's End",
      "Spider-Man 3",
      "Harry Potter and the Sorcerer's Stone",
      "Alice in Wonderland",
      "The Hobbit: The Desolation of Smaug",
      "The Dark Knight",
      "The Hunger Games",
      "The Lord of the Rings: The Two Towers",
      "Finding Nemo",
      "Jurassic Park",
      "The Phantom Menace",
      "The Lion King (1994)",
      "Transformers: Dark of the Moon",
      "Pirates of the Caribbean: On Stranger Tides",
      "The Twilight Saga: Eclipse",
      "Harry Potter and the Half-Blood Prince",
      "Inside Out",
      "Furious 6",
      "Shrek 2",
      "The Twilight Saga: Breaking Dawn Part 1",
      "Spider-Man: Homecoming",
      "Maleficent",
      "Harry Potter and the Deathly Hallows Part 1",
      "The Hunger Games: Mockingjay - Part 1",
      "Toy Story 4",
      "Jurassic World: Fallen Kingdom",
      "The Secret Life of Pets",
      "Transformers: Revenge of the Fallen",
      "Ice Age: Dawn of the Dinosaurs",
      "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
      "Spider-Man",
      "The Incredibles",
      "Deadpool 2",
      "Guardians of the Galaxy Vol. 2",
      "The Matrix Reloaded",
      "The Matrix Revolutions",
      "Harry Potter and the Goblet of Fire",
      "Thor: Ragnarok",
      "Mission: Impossible - Fallout",
      "The Twilight Saga: New Moon",
      "The Da Vinci Code",
      "Harry Potter and the Order of Phoenix",
      "The Amazing Spider-Man",
      "Deadpool",
      "The Lion King",
      "Pirates of the Caribbean: Dead Men Tell No Tales",
      "Indiana Jones and the Kingdom of the Crystal Skull",
      "The Hobbit: The Battle of the Five Armies",
      "War for the Planet of the Apes",
      "Monsters University",
      "Brave",
      "Captain America: The Winter Soldier",
      "Doctor Strange",
      "Thor: The Dark World",
      "Kung Fu Panda 2",
      "Madagascar 3: Europe's Most Wanted",
      "How to Train Your Dragon",
      "Ratatouille",
      "Cars",
      "Up",
      "Monsters, Inc.",
      "Tangled",
      "Pirates of the Caribbean: The Curse of the Black Pearl",
      "The Hunger Games: Mockingjay - Part 2",
      "Wonder Woman",
      "The Jungle Book",
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
            UserName
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
