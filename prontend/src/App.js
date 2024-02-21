import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ResetPassword from './ResetPassword';
import HomeComponent from './HomeComponent';
import Setting from './Setting';
import Findfriends from './Findfriends';
import FriendCalendarPage from './FriendCalendarPage';
import FriendDiaryPage from './FriendDiaryPage';
import './index.css';
import { UserProvider } from './UserContext';

function App() {

  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/HomeComponent" element={<HomeComponent />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/Findfriends" element={<Findfriends />} />
        <Route path="/my-calendar/:yearMonth" element={<HomeComponent />} />
        <Route path="/friend-calendar/:friendId/:yearMonth" element={<FriendCalendarPage />} />
        <Route path="/friend-diary/:diaryId" element={<FriendDiaryPage />} />
      </Routes>
      </UserProvider>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    navigate("/LoginPage");
  };

  return (
    <div className="App">
      <div className="centered-title">
        <p id="logo-text">moodify</p>
      </div>
      <div className="black-button-group">
        <button onClick={navigateToLoginPage}>START</button>
      </div>
      <div>
        <img src="/images/moodifymainpic.png" alt="메인화면사진" className="main-image" />
      </div>
    </div>
  );
}

export default App;

