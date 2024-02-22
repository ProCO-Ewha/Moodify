// FriendCalendarPage.js

/*import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams, useNavigate import
import axios from 'axios';
import FriendDiaryList from './FriendDiaryList';
import CalendarModal from './CalendarModal'; // CalendarModal import

const FriendCalendarPage = () => {
  const { friendId } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [selectedYearMonth, setSelectedYearMonth] = useState('2024-02');
  const [calendarModalShown, setCalendarModalShown] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const fetchDiaries = async () => {
      const response = await axios.get(`/api/diaries/${friendId}/${selectedYearMonth}`);
      setDiaries(response.data);
    };

    fetchDiaries();
  }, [friendId, selectedYearMonth]);

  const handleSelectDate = (year, month) => {
    setSelectedYearMonth(`${year}-${month}`);
    setCalendarModalShown(false);
    navigate(`/friend-calendar/${friendId}/${year}-${month}`);
  };

  const handleLike = (diaryId) => {
    // 좋아요 처리 로직
  };

  return (
    <div>
      <h2>{selectedYearMonth}</h2>
      <button onClick={() => setCalendarModalShown(!calendarModalShown)} className="button-select-year">Select Year and Month</button>
      {calendarModalShown && (
        <CalendarModal
          onSelect={handleSelectDate}
          onClose={() => setCalendarModalShown(false)}
        />
      )}
      <FriendDiaryList diaries={diaries} onLike={handleLike} />
    </div>
  );
};

export default FriendCalendarPage;*/

// FriendCalendarPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CalendarModal from './CalendarModal';
import HomeComponent from './HomeComponent';
import './HomeComponent.css'

const FriendCalendarPage = () => {
  const { friendId } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [selectedYearMonth, setSelectedYearMonth] = useState('2024-02');
  const [calendarModalShown, setCalendarModalShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaries = async () => {
      // const response = await axios.get(`/api/diaries/${friendId}/${selectedYearMonth}`);
      // const sortedDiaries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      //setDiaries(sortedDiaries);
      const mockDiaries = [
        { id: 1, content: 'Happy Valentine\'s Day!', emoji: '😊', date: '2024-02-14' },
        { id: 2, content: 'Diary 2', emoji: '😔', date: '2024-03-03'},
        // ... 
      ];
      const sortedDiaries = mockDiaries.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDiaries(sortedDiaries);
    };

    fetchDiaries();
  }, [friendId, selectedYearMonth]);

  const handleSelectDate = (year, month) => {
    setSelectedYearMonth(`${year}-${month}`);
    setCalendarModalShown(false);
    navigate(`/friend-calendar/${friendId}/${year}-${month}`);
  };
  

  const handleDiaryClick = (diaryId) => {
    navigate(`/friend-diary/${diaryId}`);
  };


return (
  <div>
    <div className="button-container">
    <button onClick={() => setCalendarModalShown(!calendarModalShown)} className="button-select-year">Select Year and Month</button>
    </div>
    {calendarModalShown && (
      <CalendarModal
        onSelect={handleSelectDate}
        onClose={() => setCalendarModalShown(false)}
      />
    )}
    <div className="header-container">
    <h2 style={{ marginTop: '20px' }}>{selectedYearMonth}</h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
      {diaries.map((entry, index) => (
        <div key={index} onClick={() => handleDiaryClick(entry.id)}>
          <div style={{ marginTop: '20px' }}>{entry?.emoji}</div> {/* marginTop을 이모지에만 적용 */}
        </div>
      ))}
    </div>
  </div>
);




      }

export default FriendCalendarPage;
