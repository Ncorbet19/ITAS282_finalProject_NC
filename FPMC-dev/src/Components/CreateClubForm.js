import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateClubForm = ({ onClubIdChange }) => {
  const [clubName, setClubName] = useState('');
  const [clubPassword, setClubPassword] = useState('');

  const handleClubNameChange = (event) => {
    setClubName(event.target.value);
  };

  const handleClubPasswordChange = (event) => {
    setClubPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'clubs'), {
        name: clubName,
        password: clubPassword,
        users: [],
      });
      console.log('Document written with ID: ', docRef.id);
      onClubIdChange(docRef.id);
      setClubName('');
      setClubPassword('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="club-name">Club Name</label>
        <input type="text" id="club-name" value={clubName} onChange={handleClubNameChange} />
      </div>
      <div>
        <label htmlFor="club-password">Club Password</label>
        <input type="password" id="club-password" value={clubPassword} onChange={handleClubPasswordChange} />
      </div>
      <button type="submit">Create Club</button>
    </form>
  );
};

export default CreateClubForm;
