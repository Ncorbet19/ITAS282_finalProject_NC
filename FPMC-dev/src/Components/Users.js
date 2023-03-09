import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function UserList({ clubId }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("usersData:", usersData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
        setError("Error fetching users");
      }
    };
    getUsers();
  }, []);

  const handleAddUser = async (user) => {
    try {
      const clubRef = doc(db, "clubs", clubId);
      const clubDoc = await getDoc(clubRef);
      const clubData = clubDoc.data();
      const updatedUsers = [...clubData.users, user];
      await updateDoc(clubRef, { users: updatedUsers });
      setUsers(users.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error(error);
      setError("Error adding user to club");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.userName} <button onClick={() => handleAddUser(user)}>Add User</button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;





