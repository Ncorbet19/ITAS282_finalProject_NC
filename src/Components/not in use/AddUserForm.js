// import { useState } from "react";
// import { db } from "../firebase";
// import { addDoc, collection } from "firebase/firestore";

// const AddUserForm = ({ clubUsers, setClubUsers }) => {
//   const [userName, setUserName] = useState("");

//   const handleAddUser = async (event) => {
//     event.preventDefault();
//     if (userName.trim() === "") {
//       alert("Please enter a username");
//       return;
//     }

//     try {
//       // Add new user to clubUsers array
//       const newClubUsers = [...clubUsers];
//       newClubUsers.push({ id: new Date().getTime().toString(), userName });
//       setClubUsers(newClubUsers);

//       // Update users array in Firestore
//       const clubsRef = collection(db, "clubs");
//       await addDoc(clubsRef, { users: newClubUsers }, { merge: true });

//       // Clear input field
//       setUserName("");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleAddUser}>
//       <h2>Add User:</h2>
//       <label>
//         Username:
//         <input
//           type="text"
//           value={userName}
//           onChange={(event) => setUserName(event.target.value)}
//         />
//       </label>
//       <button type="submit">Add User</button>
//     </form>
//   );
// };

// export default AddUserForm;






import { useState } from "react";

const AddUserForm = ({ handleAddUser }) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUser(userName);
    setUserName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter user name"
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;



// import { useState } from "react";
// import { db } from "../firebase";
// import { updateDoc, doc } from "firebase/firestore";

// const AddUserForm = ({ clubName, clubUsers, setClubUsers }) => {
//   const [newUser, setNewUser] = useState("");

//   const handleInputChange = (event) => {
//     setNewUser(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const userExists = clubUsers.some(
//       (user) => user.userName.toLowerCase() === newUser.toLowerCase()
//     );
//     if (userExists) {
//       alert("User already exists in this club.");
//       return;
//     }
//     const updatedUsers = [...clubUsers, { userName: newUser, id: Date.now() }];
//     const clubDocRef = doc(db, "clubs", clubName);
//     await updateDoc(clubDocRef, { users: updatedUsers });
//     setClubUsers(updatedUsers);
//     setNewUser("");
//   };

//   return (
//     <div>
//       <h2>Add User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="newUser"
//           placeholder="Enter username"
//           value={newUser}
//           onChange={handleInputChange}
//         />
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

// export default AddUserForm;
