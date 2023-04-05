import { useState, useEffect } from "react";
import CreateUserForm from "./CreateUser";
import LoginForm from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import '../css/back.css';
import Home from './Home'
import CommunityClubs from './CommunityClubs'
import "../css/App.css";




function App() {
  const [clubId, setClubId] = useState(null);

  const handleClubIdChange = (id) => {
    setClubId(id);
  };


  return (
<div className="app-black"> 
     <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CommunityClubs" element={<CommunityClubs />} />
          <Route path="/signup" element={<CreateUserForm clubId={clubId} />} />
          <Route path="/club-dashboard" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
