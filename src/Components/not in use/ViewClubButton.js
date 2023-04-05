// import { useState, useEffect } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   updateDoc,
//   onSnapshot,
//   addDoc,
// } from "firebase/firestore";
// import "../css/ViewClubButton.css";
// import ReactCalendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// // import { format } from "date-fns";

// const ViewClubButton = ({
//   clubName,
//   clubPassword,
//   userName,
//   setFoundClubName,
// }) => {

//   const [isLoading, setIsLoading] = useState(false);
//   const [clubUsers, setClubUsers] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [editUsers, setEditUsers] = useState(false);
//   const [clubOpened, setClubOpened] = useState(false);
//   const [movies, setMovies] = useState([]);

//   const handleViewClub = async () => {
//     setIsLoading(true);
//     // Check if the user exists in the users collection
//     const usersRef = collection(db, "users");
//     const usersQuery = query(usersRef, where("userName", "==", userName));
//     const usersSnapshot = await getDocs(usersQuery);

//     if (usersSnapshot.empty) {
//       alert("User not found");
//       setIsLoading(false);
//       return;
//     }

//     const currentUser = usersSnapshot.docs[0].data();

//     const clubsRef = collection(db, "clubs");
//     const clubsQuery = query(clubsRef, where("name", "==", clubName));
//     const clubsSnapshot = await getDocs(clubsQuery);
//     if (clubsSnapshot.empty) {
//       setFoundClubName("");
//       alert("Club not found");
//       setClubOpened(false); // Set clubOpened to false if club not found
//     } else {
//       const clubDoc = clubsSnapshot.docs[0];
//       const data = clubDoc.data();
//       if (data.password === clubPassword) {
//         if (data.users.some((user) => user.userName === currentUser.userName)) {
//           const foundClubName = data.name;
//           setFoundClubName(foundClubName);
//           setClubOpened(true); // Set clubOpened to true if club found
//           const usersData = data.users;
//           setClubUsers(usersData);
//           const allUsersRef = collection(db, "users");
//           const allUsersSnapshot = await getDocs(allUsersRef);

//           if (!allUsersSnapshot.empty) {
//             const allUsersData = allUsersSnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setAllUsers(allUsersData);
//           }

//           // Fetch movies from the "movies" collection
//           const clubId = clubDoc.id;
//           const moviesRef = collection(db, "movies");
//           const moviesQuery = query(moviesRef, where("clubId", "==", clubId));

//           const moviesSnapshot = await getDocs(moviesQuery);

//           const moviesData = moviesSnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setMovies(moviesData);
//         } else {
//           setFoundClubName("");
//           alert("User not a member of the club");
//           setClubOpened(false); // Set clubOpened to false if user not a member
//         }
//       } else {
//         setFoundClubName("");
//         alert("Incorrect password");
//         setClubOpened(false); // Set clubOpened to false if incorrect password
//       }
//     }
//     setIsLoading(false);
//   };

//   const handleRemoveUser = async (userId) => {
//     const clubsRef = collection(db, "clubs");
//     const clubsQuery = query(clubsRef, where("name", "==", clubName));
//     const clubsSnapshot = await getDocs(clubsQuery);
//     if (!clubsSnapshot.empty) {
//       clubsSnapshot.forEach(async (doc) => {
//         const clubRef = doc.ref;
//         const data = doc.data();
//         const updatedUsers = data.users.filter((user) => user.id !== userId);
//         await updateDoc(clubRef, {
//           users: updatedUsers,
//         });
//         setClubUsers(updatedUsers);
//       });
//     }
//   };

//   const handleAddUser = async (userToAdd) => {
//     const clubsRef = collection(db, "clubs");
//     const clubsQuery = query(clubsRef, where("name", "==", clubName));
//     const clubsSnapshot = await getDocs(clubsQuery);
//     if (!clubsSnapshot.empty) {
//       clubsSnapshot.forEach(async (doc) => {
//         const clubRef = doc.ref;
//         const data = doc.data();
//         await updateDoc(clubRef, {
//           users: [...data.users, userToAdd],
//         });
//         setClubUsers((prevUsers) => [...prevUsers, userToAdd]);
//       });
//     }
//   };

//   return (
//     <>
//       <button type="button" onClick={handleViewClub}>
//         {isLoading ? "Loading..." : "View Club"}
//       </button>
//       {clubOpened && (
//         <div>
//           <h1>{clubName}</h1>
//           <ReactCalendar
//             tileContent={({ date, view }) => {
//               if (view === "month") {
//                 return movies
//                   .filter((movie) => {
//                     const movieDate = new Date(movie.date);
//                     return (
//                       date.getFullYear() === movieDate.getFullYear() &&
//                       date.getMonth() === movieDate.getMonth() &&
//                       date.getDate() === movieDate.getDate()
//                     );
//                   })
//                   .map((movie, index) => (
//                     <div key={index} className="movie-title">
//                       {movie.title}
//                     </div>
//                   ));
//               }
//             }}
//           />

//         </div>
//       )}

//       {clubUsers.length > 0 && (
//         <div>
//           <h2>Club Users:</h2>
//           <ul>
//             {clubUsers.map((user) => (
//               <li key={user.id}>
//                 {user.userName}{" "}
//                 {editUsers && (
//                   <button
//                     className="small"
//                     type="button"
//                     onClick={() => handleRemoveUser(user.id)}
//                   >
//                     Remove
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {editUsers && allUsers.length > 0 && (
//         <div>
//           <h2>Users not in club:</h2>
//           <ul>
//             {allUsers
//               .filter(
//                 (user) => !clubUsers.some((clubUser) => clubUser.id === user.id)
//               )
//               .map((user) => (
//                 <li key={user.id}>
//                   {user.userName}{" "}
//                   <button
//                     className="small"
//                     type="button"
//                     onClick={() => handleAddUser(user)}
//                   >
//                     Add
//                   </button>{" "}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       )}
//       {clubOpened && (
//         <button type="button" onClick={() => setEditUsers(!editUsers)}>
//           {editUsers ? "Finish Editing Users" : "Edit Users"}
//         </button>
//       )}
//     </>
//   );
// };

// export default ViewClubButton;









import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import "../css/ViewClubButton.css";
// import ReactCalendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// import { format } from "date-fns";

const ViewClubButton = ({
  clubName,
  clubPassword,
  userName,
  setFoundClubName,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clubUsers, setClubUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editUsers, setEditUsers] = useState(false);
  const [clubOpened, setClubOpened] = useState(false);

  const handleViewClub = async () => {
    setIsLoading(true);
    // Check if the user exists in the users collection
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("userName", "==", userName));
    const usersSnapshot = await getDocs(usersQuery);

    if (usersSnapshot.empty) {
      alert("User not found");
      setIsLoading(false);
      return;
    }

    const currentUser = usersSnapshot.docs[0].data();

    const clubsRef = collection(db, "clubs");
    const clubsQuery = query(clubsRef, where("name", "==", clubName));
    const clubsSnapshot = await getDocs(clubsQuery);
    if (clubsSnapshot.empty) {
      setFoundClubName("");
      alert("Club not found");
      setClubOpened(false); // Set clubOpened to false if club not found
    } else {
      const clubDoc = clubsSnapshot.docs[0];
      const data = clubDoc.data();
      if (data.password === clubPassword) {
        if (data.users.some((user) => user.userName === currentUser.userName)) {
          const foundClubName = data.name;
          setFoundClubName(foundClubName);
          setClubOpened(true); // Set clubOpened to true if club found
          const usersData = data.users;
          setClubUsers(usersData);
          const allUsersRef = collection(db, "users");
          const allUsersSnapshot = await getDocs(allUsersRef);

          if (!allUsersSnapshot.empty) {
            const allUsersData = allUsersSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAllUsers(allUsersData);
          }
        } else {
          setFoundClubName("");
          alert("User not a member of the club");
          setClubOpened(false); // Set clubOpened to false if user not a member
        }
      } else {
        setFoundClubName("");
        alert("Incorrect password");
        setClubOpened(false); // Set clubOpened to false if incorrect password
      }
    }
    setIsLoading(false);
  };

  const handleRemoveUser = async (userId) => {
    const clubsRef = collection(db, "clubs");
    const clubsQuery = query(clubsRef, where("name", "==", clubName));
    const clubsSnapshot = await getDocs(clubsQuery);
    if (!clubsSnapshot.empty) {
      clubsSnapshot.forEach(async (doc) => {
        const clubRef = doc.ref;
        const data = doc.data();
        const updatedUsers = data.users.filter((user) => user.id !== userId);
        await updateDoc(clubRef, {
          users: updatedUsers,
        });
        setClubUsers(updatedUsers);
      });
    }
  };

  const handleAddUser = async (userToAdd) => {
    const clubsRef = collection(db, "clubs");
    const clubsQuery = query(clubsRef, where("name", "==", clubName));
    const clubsSnapshot = await getDocs(clubsQuery);
    if (!clubsSnapshot.empty) {
      clubsSnapshot.forEach(async (doc) => {
        const clubRef = doc.ref;
        const data = doc.data();
        await updateDoc(clubRef, {
          users: [...data.users, userToAdd],
        });
        setClubUsers((prevUsers) => [...prevUsers, userToAdd]);
      });
    }
  };


  const handleAddMovie = async () => {
    const movieTitle = prompt("Enter movie title:");
  
    if (!movieTitle) {
      alert("Movie title cannot be empty.");
      return;
    }
  
    const clubsRef = collection(db, "clubs");
    const clubsQuery = query(clubsRef, where("name", "==", clubName));
    const clubsSnapshot = await getDocs(clubsQuery);
  
    if (!clubsSnapshot.empty) {
      clubsSnapshot.forEach(async (doc) => {
        const clubRef = doc.ref;
        const data = doc.data();
        const updatedMovies = data.movies ? [...data.movies, movieTitle] : [movieTitle];
  
        await updateDoc(clubRef, {
          movies: updatedMovies,
        });
      });
    }
  };



  return (
    <>
      <button type="button" onClick={handleViewClub}>
        {isLoading ? "Loading..." : "View Club"}
      </button>

      {clubOpened && (
      <>
        <button type="button" onClick={handleAddMovie}>
          Add Movie
        </button>
      </>
    )}


      {clubUsers.length > 0 && (
        <div>
          <h2>Club Users:</h2>
          <ul>
            {clubUsers.map((user) => (
              <li key={user.id}>
                {user.userName}{" "}
                {editUsers && (
                  <button
                    className="small"
                    type="button"
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {editUsers && allUsers.length > 0 && (
        <div>
          <h2>Users not in club:</h2>
          <ul>
            {allUsers
              .filter(
                (user) => !clubUsers.some((clubUser) => clubUser.id === user.id)
              )
              .map((user) => (
                <li key={user.id}>
                  {user.userName}{" "}
                  <button
                    className="small"
                    type="button"
                    onClick={() => handleAddUser(user)}
                  >
                    Add
                  </button>{" "}
                </li>
              ))}
          </ul>
        </div>
      )}
      {clubOpened && (
        <button type="button" onClick={() => setEditUsers(!editUsers)}>
          {editUsers ? "Finish Editing Users" : "Edit Users"}
        </button>
      )}
    </>
  );
};

export default ViewClubButton;
