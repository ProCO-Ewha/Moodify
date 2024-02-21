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

const FriendCalendarPage = () => {
  const { friendId } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [selectedYearMonth, setSelectedYearMonth] = useState('2024-02');
  const [calendarModalShown, setCalendarModalShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaries = async () => {
      // const response = await axios.get(`/api/diaries/${friendId}/${selectedYearMonth}`);
      // setDiaries(response.data);
      setDiaries([ 
        { id: 1, content: 'Happy Valentine\'s Day!', emoji: '😊', date: '2024-02-14' },
        { id: 2, content: 'Diary 2', emoji: '😔', date: '2024-03-03'},
        // ... 
      ]);
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
      <h2>{selectedYearMonth}</h2>
      <button onClick={() => setCalendarModalShown(!calendarModalShown)} className="button-select-year">Select Year and Month</button>
      {calendarModalShown && (
        <CalendarModal
          onSelect={handleSelectDate}
          onClose={() => setCalendarModalShown(false)}
        />
      )}
      {
        diaries.map(diary => (
          <div key={diary.id} onClick={() => handleDiaryClick(diary.id)}>
            <span>{diary.emoji}</span>
          </div>
        ))
      }
    </div>
  );
};

export default FriendCalendarPage;
