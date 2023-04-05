import { useState } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

function formatDateForInput(releaseDate) {
  const date = new Date(releaseDate);
  const isoDate = date.toISOString().substring(0, 10);
  return isoDate;
}

const AddMovie = ({ clubName, onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !datetime || isNaN(datetime.getTime())) {
      alert("Please fill in all fields");
      return;
    }

    const clubsRef = collection(db, "clubs");
    const moviesRef = collection(db, "movies");

    // Check if a club with the provided name exists
    const clubQuery = await getDocs(
      query(clubsRef, where("name", "==", clubName))
    );
    let clubDoc;

    if (clubQuery.empty) {
      // If club doesn't exist, create a new club document with an empty 'movies' collection
      clubDoc = await addDoc(clubsRef, {
        name: clubName,
        password: "",
        users: [],
        movies: [],
      });
    } else {
      // If club exists, get the club document
      clubDoc = clubQuery.docs[0];
    }

    // Get the club's 'movies' collection and add the new movie
    const clubMoviesRef = collection(clubDoc.ref, "movies");
    await addDoc(clubMoviesRef, {
      title,
      date: datetime.toISOString(),
    });

    // Update the club document to include the new movie in its 'movies' field
    await setDoc(
      clubDoc.ref,
      {
        movies: [
          ...clubDoc.data().movies,
          {
            title,
            date: datetime.toISOString(),
          },
        ],
      },
      { merge: true }
    );

    // Clear the form and call the onAddMovie callback
    setTitle("");
    setDatetime("");
    onAddMovie();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Movie Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date and Time:
        <input
          type="datetime-local"
          value={formatDateForInput(datetime)}
          onChange={(e) => {
            const dateValue = e.target.value;
            setDatetime(
              !isNaN(new Date(dateValue).getTime())
                ? new Date(dateValue)
                : ""
            );
          }}
        />
      </label>
      <br />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
