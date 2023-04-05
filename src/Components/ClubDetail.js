import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import "../css/ViewClubButton.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar";
import axios from "axios";
import "../css/club-dashboard.css";

import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import bannerImage from "../bannerImage.png";
import MovieDetails from "./MovieDetails";
import { v4 as uuidv4 } from "uuid";

// import MovieDetails from "./MovieDetails"; // just added
import Modal from "./Modal"; //this too

const ClubDetail = ({ clubName, movieId }) => {
  const [movies, setMovies] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [clubUsers, setClubUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isEditingUsers, setIsEditingUsers] = useState(false);
  const [isClubOpened, setIsClubOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieInput, setMovieInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchStarted, setSearchStarted] = useState(false);


  const onSuggestionsFetchRequested = async ({ value }) => {
    const newSuggestions = await getSuggestions(value);
    setSuggestions(newSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const clubsRef = collection(db, "clubs");
      const q = query(clubsRef, where("name", "==", clubName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const clubData = querySnapshot.docs[0].data();
        setMovies(clubData.movies);
        setClubUsers(clubData.users);
      }
    };

    fetchMovies();
  }, [clubName]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!searchStarted) return; // Do not fetch users until search has started

      const usersRef = collection(db, "users");
      const allUsersSnapshot = await getDocs(usersRef);
      const users = allUsersSnapshot.docs.map((doc) => doc.data());
      setAllUsers(users);
    };

    fetchAllUsers();
  }, [searchStarted]); // Fetch users when search has started

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (!searchStarted) setSearchStarted(true); // Set searchStarted to true when user starts searching
  };

  useEffect(() => {
    const eventsArray = movies.map((movie) => {
      return {
        title: `${movie.movie} (${movie.time})`, // Add time to the movie title
        start: moment(`${movie.date} ${movie.time}`),
        end: moment(`${movie.date} ${movie.time}`).add(2, "hours"),
      };
    });
    setEvents(eventsArray);
  }, [movies]);

  useEffect(() => {
    // clear the movies state array when a different club is selected
    setMovies([]);
  }, [clubName]);

  const handleToggleUsers = () => {
    setShowUsers(!showUsers);
  };


  const handleRemoveUser = async (userNameToRemove, clubName) => {
    const clubsRef = collection(db, "clubs");
    const clubsQuery = query(clubsRef, where("name", "==", clubName));
    const clubsSnapshot = await getDocs(clubsQuery);
  
    if (clubsSnapshot.empty) return;
  
    clubsSnapshot.forEach(async (doc) => {
      const clubRef = doc.ref;
      const data = doc.data();
      const updatedUsers = data.users.filter(user => user.userName !== userNameToRemove);
      await updateDoc(clubRef, { users: updatedUsers });
      setClubUsers(updatedUsers);
    });
  };
  

  const nonClubUsers = allUsers.filter(
    (user) => !clubUsers.some((clubUser) => clubUser.userName === user.userName)
  );

  const handleAddUser = async (userToAdd, clubName) => {
    const clubsRef = collection(db, "clubs");
    const clubsQuery = query(clubsRef, where("name", "==", clubName));
    const clubsSnapshot = await getDocs(clubsQuery);

    if (clubsSnapshot.empty) return;

    clubsSnapshot.forEach(async (doc) => {
      const clubRef = doc.ref;
      const data = doc.data();
      const updatedUsers = [...data.users, userToAdd];
      await updateDoc(clubRef, { users: updatedUsers });
      setClubUsers(updatedUsers);
    });
  };


  const generateMovieId = () => {
    return `movie_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleMovieSubmit = async (event) => {
    event.preventDefault();
    const clubsRef = collection(db, "clubs");
    const clubsQuery = query(clubsRef, where("name", "==", clubName));
    const clubsSnapshot = await getDocs(clubsQuery);

    if (clubsSnapshot.empty) return;

    clubsSnapshot.forEach(async (doc) => {
      const clubRef = doc.ref;
      const data = doc.data();
      const movieId = generateMovieId();
      const updatedMovies = [
        ...data.movies,
        {
          movieId: movieId,
          movie: movieInput,
          date: dateInput,
          time: timeInput,
        },
      ];
      await updateDoc(clubRef, { movies: updatedMovies });
      setMovies(updatedMovies);
    });
    setMovieInput("");
    setDateInput("");
    setTimeInput("");
  };

  const filteredNonClubUsers = nonClubUsers.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [moviesWithPosters, setMoviesWithPosters] = useState([]);
  const apiKey = "74915c59";//remove g for the right key

  useEffect(() => {
    const fetchMoviePosters = async () => {
      const fetchedMovies = await Promise.all(
        movies.map(async (movie) => {
          try {
            const response = await axios.get(
              `http://www.omdbapi.com/?t=${encodeURIComponent(
                movie.movie
              )}&apikey=${apiKey}`
            );

            if (response.data.Poster && response.data.Poster !== "N/A") {
              return { ...movie, poster: response.data.Poster };
            } else {
              return movie;
            }
          } catch (error) {
            console.error("Error fetching movie poster:", error);
            return movie;
          }
        })
      );
      setMoviesWithPosters(fetchedMovies);
    };

    fetchMoviePosters();
  }, [movies]);

  const today = new Date();
  const filteredMovies = moviesWithPosters.filter(
    (movie) => new Date(movie.date) >= today
  );
  const sortedMovies = filteredMovies
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const getSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${encodeURIComponent(
          value
        )}&type=movie&apikey=${apiKey}`
      );
      const results = response.data.Search || [];
      return results.map((result) => result.Title);
    } catch (error) {
      console.error("Error fetching movie suggestions:", error);
      return [];
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleRemoveMovie = async (movieTitle, clubName) => {
    const clubsRef = collection(db, "clubs");
    const clubsQuery = query(clubsRef, where("name", "==", clubName));
    const clubsSnapshot = await getDocs(clubsQuery);

    if (clubsSnapshot.empty) return;

    clubsSnapshot.forEach(async (doc) => {
      const clubRef = doc.ref;
      const data = doc.data();
      const updatedMovies = data.movies.filter(
        (movie) => movie.movie !== movieTitle
      );
      await updateDoc(clubRef, { movies: updatedMovies });
      setMovies(updatedMovies);
      setSelectedEvent(null);
    });
  };

  return (
    <div className="club-detail">
      <div
        className="banner-image"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          height: "350px",
          width: "900px",
        }}
      ></div>
      <div
        className="club-name"
        style={{
          position: "absolute",
          top: "0",
          height: "350px",
          width: "900px",
        }}
      >
        <h1
          className="club-name"
          style={{
            color: "#007bff",
            fontSize: "90px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "20px",
            textShadow: "8px 8px 8px black",
          }}
        >
          <strong>{clubName}</strong>
        </h1>
      </div>
      <div className="padding">
        <br></br>
        <div className="color">
          <h3>Up Coming Movies:</h3>
        </div>

        <div className="movie-poster-container">
          <div className="upcoming-movies2">
            {sortedMovies.length > 0 ? (
              <div className="upcoming-movies">
                {sortedMovies.map((movie) => (
                  <div key={movie.date} className="upcoming-movie">
                    {movie.poster ? (
                      <div className="parent-container">
                        <div className="movie-posters-container">
                          <img src={movie.poster} alt={movie.movie} />
                        </div>
                      </div>
                    ) : (
                      <p>{movie.movie} poster</p>
                    )}
                    <div className="movie-card">
                      <h4>{movie.movie}</h4>
                      <p>Date: {movie.date}</p>
                      <p>Time: {movie.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No upcoming movies</p>
            )}
          </div>
        </div>

        <div>
          <h1>Calendar</h1>
          <div className="calendar-wrapper">
            <Calendar
              localizer={localizer}
              events={events}
              components={{
                toolbar: CustomToolbar,
              }}
              onSelectEvent={handleSelectEvent}
              drilldownView={null}
            />
          </div>
          {selectedEvent && (
            <Modal onClose={() => setSelectedEvent(null)}>
              <MovieDetails
                event={selectedEvent}
                onRemoveMovie={handleRemoveMovie}
                clubName={clubName}
              />
            </Modal>
          )}
        </div>

        <div>
          <br></br>
          {!showMovieForm && (
            <button
              class="add-movie-btn"
              onClick={() => setShowMovieForm(true)}
            >
              Add Movie
            </button>
          )}
          {showMovieForm && (
            <form onSubmit={handleMovieSubmit}>
              <label>
                Movie:
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={(suggestion) => suggestion}
                  renderSuggestion={(suggestion, { query, isHighlighted }) => {
                    const matches = match(suggestion, query);
                    const parts = parse(suggestion, matches);
                    return (
                      <div>
                        {parts.map((part, index) => {
                          return part.highlight ? (
                            <span key={index} style={{ fontWeight: "bold" }}>
                              {part.text}
                            </span>
                          ) : (
                            <span key={index}>{part.text}</span>
                          );
                        })}
                      </div>
                    );
                  }}
                  inputProps={{
                    required: true,
                    value: movieInput,
                    onChange: (e, { newValue }) => setMovieInput(newValue),
                    placeholder: "Enter a movie title",
                  }}
                />
              </label>

              <label>
                Date:
                <input
                  type="date"
                  required
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                />
              </label>
              <label>
                Time:
                <input
                  type="time"
                  required
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                />
              </label>
              <button type="submit">Submit Movie</button>
              <button type="button" onClick={() => setShowMovieForm(false)}>
                Cancel
              </button>
            </form>
          )}
        </div>

        <>
          {clubUsers.length > 0 && (
            <div class="club-members">
              <h2>Club Members:</h2>
              <ul>
                {clubUsers.map((user) => (
                  <li key={user.id} class="user-list-item">
                    {user.userName}{" "}
                    {isEditingUsers && (
                      <button
                        className="small-btn remove-btn"
                        type="button"
                        onClick={() =>
                          handleRemoveUser(user.userName, clubName)
                        }
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isEditingUsers && (
            <div class="add-members">
              <h2>Add Members:</h2>
              <input
                class="search-input"
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <ul>
                {filteredNonClubUsers.slice(0, 5).map((user) => (
                  <li key={user.id} class="user-list-item">
                    {user.userName}{" "}
                    <button
                      class="small-btn add-btn"
                      type="button"
                      onClick={() => handleAddUser(user, clubName)}
                    >
                      Add User
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            class="edit-users-btn"
            type="button"
            onClick={() => setIsEditingUsers(!isEditingUsers)}
          >
            {isEditingUsers ? "Finish Editing Users" : "Edit Users"}
          </button>
        </>
      </div>
    </div>
  );
};

export default ClubDetail;
