import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const AddToClubButton = ({ user, clubName }) => {
  const handleAddToClubClick = async () => {
    try {
      await updateDoc(doc(db, 'users', user.id), {
        clubs: arrayUnion(clubName)
      });
      console.log(`Added user ${user.name} to club ${clubName}`);
    } catch (error) {
      console.error('Error adding user to club: ', error);
    }
  };

  return (
    <button onClick={handleAddToClubClick}>Add to Club</button>
  );
};

const UserList = ({ clubName }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'), where('clubs', 'array-contains', clubName));
      const querySnapshot = await getDocs(q);
      const fetchedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, [clubName]);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <AddToClubButton user={user} clubName={clubName} />
        </li>
      ))}
    </ul>
  );
};

export default UserList;

