import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 페이지를 뒤로 이동
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <img src="/images/backbutton.png" alt="뒤로가기버튼" className="back-button-img" />
    </button>
  );
}

export default BackButton;

