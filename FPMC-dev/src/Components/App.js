import { useState } from 'react';
import CreateClubForm from './CreateClubForm';
import UserList from './Users';

function App() {
  const [clubId, setClubId] = useState(null);

  const handleClubIdChange = (id) => {
    setClubId(id);
  };

  return (
    <div>
      <CreateClubForm onClubIdChange={handleClubIdChange} />
      {clubId && <UserList clubId={clubId} />}
    </div>
  );
}

export default App;
