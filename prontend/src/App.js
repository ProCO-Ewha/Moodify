import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ResetPassword from './ResetPassword';
import HomeComponent from './HomeComponent';
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

