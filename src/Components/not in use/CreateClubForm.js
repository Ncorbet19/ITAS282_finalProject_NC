// import { useState } from "react";
// import { db } from "../firebase";
// import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
// import Calendar from "react-calendar";
// import ViewClubButton from "./ViewClubButton";

// const CreateClubForm = ({ onClubIdChange }) => {
//   const [clubName, setClubName] = useState("");
//   const [clubPassword, setClubPassword] = useState("");
//   const [existingClubName, setExistingClubName] = useState("");
//   const [foundClubName, setFoundClubName] = useState("");

//   const handleClubNameChange = (event) => {
//     setClubName(event.target.value);
//     setExistingClubName("");
//     setFoundClubName("");
//   };

//   const handleClubPasswordChange = (event) => {
//     setClubPassword(event.target.value);
//     setFoundClubName("");
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // Check if club name already exists
//     const clubsRef = collection(db, "clubs");
//     const clubsQuery = query(clubsRef, where("name", "==", clubName));
//     const clubsSnapshot = await getDocs(clubsQuery);
//     if (!clubsSnapshot.empty) {
//       setExistingClubName(clubName);
//       setClubName("");
//       setClubPassword("");
//       setFoundClubName("");
//       return;
//     }

//     try {
//       const docRef = await addDoc(clubsRef, {
//         name: clubName,
//         password: clubPassword,
//         users: [],
//       });
//       console.log("Document written with ID: ", docRef.id);
//       onClubIdChange(docRef.id);
//       setClubName("");
//       setClubPassword("");
//       setExistingClubName("");
//       setFoundClubName("");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <div>
//         <label htmlFor="club-name">Club Name</label>
//         <input
//           type="text"
//           id="club-name"
//           value={clubName}
//           onChange={handleClubNameChange}
//         />
//         <div style={{ height: "10px" }}></div>
//         {existingClubName && (
//           <p style={{ fontSize: "small", color: "red", margin: "4px 0" }}>
//             {existingClubName} has been taken
//           </p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="club-password">Club Password</label>
//         <input
//           type="password"
//           id="club-password"
//           value={clubPassword}
//           onChange={handleClubPasswordChange}
//         />
//       </div>
//       <button type="submit">Create Club</button>
//       <ViewClubButton
//         clubName={clubName}
//         clubPassword={clubPassword}
//         setFoundClubName={setFoundClubName}
//       />
//       {foundClubName && <p>Club Found: {foundClubName}</p>}
//     </form>
//     );
//   };
  
//   export default CreateClubForm;
  


















// // CreateClubForm.js this code works im only saving the code above it for some reson so delete it if you want
// import { useState } from "react";
// import { db } from "../firebase";
// import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
// import Calendar from "react-calendar";
// import ViewClubButton from "./ViewClubButton";

// const CreateClubForm = ({ onClubIdChange }) => {
//   const [clubName, setClubName] = useState("");
//   const [clubPassword, setClubPassword] = useState("");
//   const [existingClubName, setExistingClubName] = useState("");
//   const [foundClubName, setFoundClubName] = useState("");

//   const handleClubNameChange = (event) => {
//     setClubName(event.target.value);
//     setExistingClubName("");
//     setFoundClubName("");
//   };

//   const handleClubPasswordChange = (event) => {
//     setClubPassword(event.target.value);
//     setFoundClubName("");
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // Check if club name already exists
//     const clubsRef = collection(db, "clubs");
//     const clubsQuery = query(clubsRef, where("name", "==", clubName));
//     const clubsSnapshot = await getDocs(clubsQuery);
//     if (!clubsSnapshot.empty) {
//       setExistingClubName(clubName);
//       setClubName("");
//       setClubPassword("");
//       setFoundClubName("");
//       return;
//     }

//     try {
//       const docRef = await addDoc(clubsRef, {
//         name: clubName,
//         password: clubPassword,
//         users: [],
//       });
//       console.log("Document written with ID: ", docRef.id);
//       onClubIdChange(docRef.id);
//       setClubName("");
//       setClubPassword("");
//       setExistingClubName("");
//       setFoundClubName("");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <div>
//         <label htmlFor="club-name">Club Name</label>
//         <input
//           type="text"
//           id="club-name"
//           value={clubName}
//           onChange={handleClubNameChange}
//         />
//         <div style={{ height: "10px" }}></div>
//         {existingClubName && (
//           <p style={{ fontSize: "small", color: "red", margin: "4px 0" }}>
//             {existingClubName} has been taken
//           </p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="club-password">Club Password</label>
//         <input
//           type="password"
//           id="club-password"
//           value={clubPassword}
//           onChange={handleClubPasswordChange}
//         />
//       </div>
//       <button type="submit">Create Club</button>

//       <ViewClubButton
//         clubName={clubName}
//         clubPassword={clubPassword}
//         setFoundClubName={setFoundClubName}
//       />
//     </form>
    
//   );
// };

// export default CreateClubForm;












// import { useState } from "react";
// import { db } from "../firebase";
// import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
// import Calendar from "react-calendar";
// import ViewClubButton from "./ViewClubButton";

// const CreateClubForm = ({ onClubIdChange }) => {
//   const [clubName, setClubName] = useState("");
//   const [clubPassword, setClubPassword] = useState("");
//   const [existingClubName, setExistingClubName] = useState("");
//   const [foundClubName, setFoundClubName] = useState("");

//   const handleClubNameChange = (event) => {
//     setClubName(event.target.value);
//     setExistingClubName("");
//     setFoundClubName("");
//   };

//   const handleClubPasswordChange = (event) => {
//     setClubPassword(event.target.value);
//     setFoundClubName("");
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // Check if club name already exists
//     const clubsRef = collection(db, "clubs");
//     const clubsQuery = query(clubsRef, where("name", "==", clubName));
//     const clubsSnapshot = await getDocs(clubsQuery);
//     if (!clubsSnapshot.empty) {
//       setExistingClubName(clubName);
//       setClubName("");
//       setClubPassword("");
//       setFoundClubName("");
//       return;
//     }

//     try {
//       const docRef = await addDoc(clubsRef, {
//         name: clubName,
//         password: clubPassword,
//         users: [],
//       });
//       console.log("Document written with ID: ", docRef.id);
//       onClubIdChange(docRef.id);
//       setClubName("");
//       setClubPassword("");
//       setExistingClubName("");
//       setFoundClubName("");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <div>
//         <label htmlFor="club-name">Club Name</label>
//         <input
//           type="text"
//           id="club-name"
//           value={clubName}
//           onChange={handleClubNameChange}
//         />
//         <div style={{ height: "10px" }}></div>
//         {existingClubName && (
//           <p style={{ fontSize: "small", color: "red", margin: "4px 0" }}>
//             {existingClubName} has been taken
//           </p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="club-password">Club Password</label>
//         <input
//           type="password"
//           id="club-password"
//           value={clubPassword}
//           onChange={handleClubPasswordChange}
//         />
//       </div>
//       <button type="submit">Create Club</button>
//       <ViewClubButton
//         clubName={clubName}
//         clubPassword={clubPassword}
//         setFoundClubName={setFoundClubName}
//       />
//       {foundClubName && <p>Club Found: {foundClubName}</p>}
//     </form>
//     );
//   };
  
//   export default CreateClubForm;
  



























// import { useState } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
// } from "firebase/firestore";
// import ViewClubButton from "./ViewClubButton";

// const CreateClubForm = ({ onClubIdChange }) => {
//   const [clubName, setClubName] = useState("");
//   const [clubPassword, setClubPassword] = useState("");
//   const [userName, setUserName] = useState("");
//   const [existingClubName, setExistingClubName] = useState("");
//   const [foundClubName, setFoundClubName] = useState("");
//   const [clubId, setClubId] = useState(null); 
//   const [clubUsers, setClubUsers] = useState([]);

//   const handleClubNameChange = (event) => {
//     setClubName(event.target.value);
//     setExistingClubName("");
//     setFoundClubName("");
//   };

//   const handleClubPasswordChange = (event) => {
//     setClubPassword(event.target.value);
//     setFoundClubName("");
//   };

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // Check if the user exists in the users collection
//     const usersRef = collection(db, "users");
//     const usersQuery = query(usersRef, where("userName", "==", userName));
//     const usersSnapshot = await getDocs(usersQuery);

//     if (usersSnapshot.empty) {
//       alert("User not found");
//       return;
//     }

//     const currentUser = usersSnapshot.docs[0].data();

//     // Check if club name already exists
//     const clubsRef = collection(db, "clubs");
//     const clubsQuery = query(clubsRef, where("name", "==", clubName));
//     const clubsSnapshot = await getDocs(clubsQuery);
//     if (!clubsSnapshot.empty) {
//       setExistingClubName(clubName);
//       setClubName("");
//       setClubPassword("");
//       setFoundClubName("");
//       return;
//     }

//     try {
//       const docRef = await addDoc(clubsRef, {
//         name: clubName,
//         password: clubPassword,
//         users: [currentUser],
//       });
//       console.log("Document written with ID: ", docRef.id);
//       onClubIdChange(docRef.id);
//       setClubName("");
//       setClubPassword("");
//       setExistingClubName("");
//       setFoundClubName("");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <div>
//         <label htmlFor="user-name">User Name</label>
//         <input
//           type="text"
//           id="user-name"
//           value={userName}
//           onChange={handleUserNameChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="club-name">Club Name</label>
//         <input
//           type="text"
//           id="club-name"
//           value={clubName}
//           onChange={handleClubNameChange}
//         />
//         <div style={{ height: "10px" }}></div>
//         {existingClubName && (
//           <p style={{ fontSize: "small", color: "red", margin: "4px 0" }}>
//             {existingClubName} has been taken
//           </p>
//         )}
//       </div>
      
//         <label htmlFor="club-password">Club Password</label>
//         <input
//           type="password"
//           id="club-password"
//           value={clubPassword}
//           onChange={handleClubPasswordChange}
//         />
      
//       <button type="submit">Create Club</button>


//       <ViewClubButton
//         clubName={clubName}
//         clubPassword={clubPassword}
//         userName={userName}
//         setFoundClubName={setFoundClubName}
//       />
//       {/* {foundClubName && <p>Club Found: {foundClubName}</p>} */}
//     </form>
//   );
// };

// export default CreateClubForm;
















// import { useState, useEffect } from "react";
// import { db } from "../../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   doc,
//   updateDoc,
//   getDoc,
// } from "firebase/firestore";
// import ViewClubButton from "./ViewClubButton";

// function CreateClubForm() {
//   const [clubId, setClubId] = useState(null);
//   const [clubUsers, setClubUsers] = useState([]);

//   const onClubIdChange = (id) => {
//     setClubId(id);
//   };

//   const onClubUsersChange = (users) => {
//     setClubUsers(users);
//   };

//   return (
//     <div>
//       <ClubForm
//         onClubIdChange={onClubIdChange}
//         onClubUsersChange={onClubUsersChange}
//       />
//       {clubId && <UserList clubId={clubId} clubUsers={clubUsers} />}
//     </div>
//   );
// }

// function ClubForm({ onClubIdChange, onClubUsersChange }) {
//   const [clubName, setClubName] = useState("");
//   const [clubPassword, setClubPassword] = useState("");
//   const [userName, setUserName] = useState("");
//   const [existingClubName, setExistingClubName] = useState("");
//   const [foundClubName, setFoundClubName] = useState("");

//   const handleClubNameChange = (event) => {
//     setClubName(event.target.value);
//     setExistingClubName("");
//     setFoundClubName("");
//   };

//   const handleClubPasswordChange = (event) => {
//     setClubPassword(event.target.value);
//     setFoundClubName("");
//   };

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
  
//     const usersRef = collection(db, "users");
//     const usersQuery = query(usersRef, where("userName", "==", userName));
//     const usersSnapshot = await getDocs(usersQuery);
  
//     if (usersSnapshot.empty) {
//       alert("User not found");
//       return;
//     }
  
//     const currentUser = usersSnapshot.docs[0].data();
  
//     const clubsRef = collection(db, "clubs");
//     const clubsQuery = query(clubsRef, where("name", "==", clubName));
//     const clubsSnapshot = await getDocs(clubsQuery);
//     if (!clubsSnapshot.empty) {
//       setExistingClubName(clubName);
//       setClubName("");
//       setClubPassword("");
//       setFoundClubName("");
//       return;
//     }
  
//     try {
//       const docRef = await addDoc(clubsRef, {
//         name: clubName,
//         password: clubPassword,
//         users: [currentUser],
//       });
      
//       // Create a movies collection within the club
//       const moviesCollectionRef = collection(docRef, "movies");
//       await addDoc(moviesCollectionRef, {});
  
//       console.log("Document written with ID: ", docRef.id);
//       onClubIdChange(docRef.id);
//       onClubUsersChange([currentUser]);
//       setClubName("");
//       setClubPassword("");
//       setExistingClubName("");
//       setFoundClubName("");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };
  

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <div>
//         <label htmlFor="user-name">User Name</label>
//         <input
//           type="text"
//           id="user-name"
//           value={userName}
//           onChange={handleUserNameChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="club-name">Club Name</label>
//         <input
//           type="text"
//           id="club-name"
//           value={clubName}
//                     onChange={handleClubNameChange}
//         />
//         <div style={{ height: "10px" }}></div>
//         {existingClubName && (
//           <p style={{ fontSize: "small", color: "red", margin: "4px 0" }}>
//             {existingClubName} has been taken
//           </p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="club-password">Club Password</label>
//         <input
//           type="password"
//           id="club-password"
//           value={clubPassword}
//           onChange={handleClubPasswordChange}
//         />
//       </div>
//       <button type="submit">Create Club</button>

//       <ViewClubButton
//         clubName={clubName}
//         clubPassword={clubPassword}
//         userName={userName}
//         setFoundClubName={setFoundClubName}
//       />
//     </form>
//   );
// }

// function UserList({ clubId, clubUsers = [] }) {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const usersCollection = collection(db, "users");
//         const usersSnapshot = await getDocs(usersCollection);
//         const usersData = usersSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log("usersData:", usersData);
//         setUsers(usersData);
//       } catch (error) {
//         console.error(error);
//         setError("Error fetching users");
//       }
//     };
//     getUsers();
//   }, []);

//   const handleAddUser = async (user) => {
//     try {
//       const clubRef = doc(db, "clubs", clubId);
//       const clubDoc = await getDoc(clubRef);
//       const clubData = clubDoc.data();
//       const updatedUsers = [...clubData.users, user];
//       await updateDoc(clubRef, { users: updatedUsers });
//       setUsers(users.filter((u) => u.id !== user.id));
//     } catch (error) {
//       console.error(error);
//       setError("Error adding user to club");
//     }
//   };

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <ul>
//       {users
//         .filter(
//           (user) => !clubUsers.some((clubUser) => clubUser.id === user.id)
//         )
//         .map((user) => (
//           <li key={user.id}>
//             {user.userName}{" "}
//             <button onClick={() => handleAddUser(user)}>Add User</button>
//           </li>
//         ))}
//     </ul>
//   );
// }

// export default CreateClubForm;

