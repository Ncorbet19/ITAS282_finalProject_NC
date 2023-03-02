import "firebase/compat/firestore";
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = firebase.firestore();
      const data = await db.collection('users').get();
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>List of users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
