// FriendDiaryPage.js

/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FriendDiaryPage = () => {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    const fetchDiary = async () => {
      const response = await axios.get(`/api/diaries/${diaryId}`);
      setDiary(response.data);
    };

    fetchDiary();
  }, [diaryId]);

  const handleLike = async () => {
    // 좋아요 처리 로직
    await axios.post(`/api/diaries/${diaryId}/like`);
  };

  return (
    <div>
      {diary && (
        <div>
          <div>{diary.emoji}</div>
          <div>{diary.text}</div>
          <button onClick={handleLike}>Like</button> // 좋아요 버튼 추가
        </div>
      )}
    </div>
  );
};

export default FriendDiaryPage;*/


// FriendDiaryPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FriendDiaryList from './FriendDiaryList';
import CalendarModal from './CalendarModal';

const FriendDiaryPage = () => {
  const { friendId, diaryId } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [diary, setDiary] = useState(null);
  const [likes, setLikes] = useState({});
  const [selectedYearMonth, setSelectedYearMonth] = useState('2024-02');
  const [calendarModalShown, setCalendarModalShown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    // diaries가 업데이트된 후에 실행됩니다.
    const selectedDiary = diaries.find(d => d.id === parseInt(diaryId));
    setDiary(selectedDiary);
  }, [diaries, diaryId]); // diaries와 diaryId가 변경될 때마다 실행됩니다.


  const handleSelectDate = (year, month) => {
    setSelectedYearMonth(`${year}-${month}`);
    setCalendarModalShown(false);
    navigate(`/friend-calendar/${friendId}/${year}-${month}`);
  };

  const handleLike = (diaryId) => {
    setLikes(prev => ({
      ...prev,
      [diaryId]: !prev[diaryId]
    }));
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
        diary && (
          <div>
            <p>Selected Emoji: {diary.emoji}</p>
            <p>Date: {diary.date}</p>
            <p>Text: {diary.content}</p>
            <button onClick={() => handleLike(diary.id)}>
              {likes[diary.id] ? 'Unlike' : 'Like'}
            </button>
          </div>
        )
      }
    </div>
  );
};

export default FriendDiaryPage;

