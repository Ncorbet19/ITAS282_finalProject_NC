// import { useState, useEffect } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";

// const EditUsers = ({ clubId, clubUsers }) => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState("");
//   const handleSelectUser = () => {};
//   const allUsers = [];

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const clubRef = doc(db, "clubs", clubId);
//       const clubDoc = await getDoc(clubRef);
//       const clubData = clubDoc.data();
//       const usersData = clubUsers.map((user) => ({
//         id: user.id,
//         name: user.userName,
//       }));
//       setUsers(usersData);
//     };

//     fetchUsers();
//   }, [clubId, clubUsers]);

//   const handleNewUserChange = (event) => {
//     setNewUser(event.target.value);
//   };

//   const handleAddUser = async () => {
//     const usersRef = collection(db, "clubs", clubId, "users");
//     try {
//       const docRef = await addDoc(usersRef, {
//         userName: newUser,
//       });
//       console.log("Document written with ID: ", docRef.id);
//       setNewUser("");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     const userRef = doc(db, "clubs", clubId, "users", userId);
//     try {
//       await deleteDoc(userRef);
//       console.log("Document with ID ", userId, " deleted");
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   const handleAddUserToClub = async (user) => {
//     const clubRef = doc(db, "clubs", clubId);
//     const clubDoc = await getDoc(clubRef);
//     const clubData = clubDoc.data();
//     const users = clubData.users;
//     const userExists = users.some((u) => u.id === user.id);
//     if (!userExists) {
//       users.push(user);
//       try {
//         await updateDoc(clubRef, { users });
//         console.log("User added to club");
//       } catch (error) {
//         console.error("Error adding user to club: ", error);
//       }
//     } else {
//       console.log("User already in club");
//     }
//   };
//   const handleRemoveUserFromClub = async (user) => {
//     const clubRef = doc(db, "clubs", clubId);
//     const clubDoc = await getDoc(clubRef);
//     const clubData = clubDoc.data();
//     const users = clubUsers.filter((u) => u.id !== user.id);
//     try {
//       await updateDoc(clubRef, { users });
//       console.log("User removed from club");
//     } catch (error) {
//       console.error("Error removing user from club: ", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name}
//             <button onClick={() => handleDeleteUser(user.id)}>
//               Remove User
//             </button>
//             <button onClick={() => handleAddUserToClub(user)}>
//               Add User to Club
//             </button>
//           </li>
//         ))}
//         <li>
//           <h3>Add User</h3>
//           <input type="text" value={newUser} onChange={handleNewUserChange} />
//           <button onClick={handleAddUser}>Add User</button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default EditUsers;





import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const EditUsers = ({ clubId, clubUsers }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const allUsers = [];

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().userName,
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleNewUserChange = (event) => {
    setNewUser(event.target.value);
  };

  const handleAddUser = async () => {
    const usersRef = collection(db, "users");
    try {
      const docRef = await addDoc(usersRef, {
        userName: newUser,
      });
      console.log("Document written with ID: ", docRef.id);
      setNewUser("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await deleteDoc(userRef);
      console.log("Document with ID ", userId, " deleted");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleAddUserToClub = async (user) => {
    const clubRef = doc(db, "clubs", clubId);
    const clubDoc = await getDoc(clubRef);
    const clubData = clubDoc.data();
    const users = clubData.users || [];
    const userExists = users.some((u) => u.id === user.id);
    if (!userExists) {
      users.push(user);
      try {
        await updateDoc(clubRef, { users });
        console.log("User added to club");
      } catch (error) {
        console.error("Error adding user to club: ", error);
      }
    } else {
      console.log("User already in club");
    }
  };

  const handleRemoveUserFromClub = async (user) => {
    const clubRef = doc(db, "clubs", clubId);
    const clubDoc = await getDoc(clubRef);
    const clubData = clubDoc.data();
    const users = clubData.users.filter((u) => u.id !== user.id);
    try {
      await updateDoc(clubRef, { users });
      console.log("User removed from club");
    } catch (error) {
      console.error("Error removing user from club: ", error);
    }
  };

  return (
    <div>
      <h2>Edit Users</h2>
      <ul>
        {users.map((user) => {
          const isInClub =
            clubUsers &&
            clubUsers.length > 0 &&
            clubUsers.some((u) => u.id === user.id);
          return (
            <li key={user.id}>
              {user.name}
              {isInClub ? (
                <button onClick={() => handleRemoveUserFromClub(user)}>
                  Remove User
                </button>
              ) : (
                <button onClick={() => handleAddUserToClub(user)}>
                  Add User to Club
                </button>
              )}
            </li>
          );
        })}

      </ul>
    </div>
  );
};

export default EditUsers;



