// HomeComponent.js

import React, { useState } from 'react';
import { useUser } from './UserContext';

const HomeComponent = () => {
  const { user, addDiaryEntry } = useUser();
  const [newDiaryDate, setNewDiaryDate] = useState('');
  const [newDiaryEmoticon, setNewDiaryEmoticon] = useState('');
  const [newDiaryText, setNewDiaryText] = useState('');

  const handleAddDiary = () => {
    if (newDiaryDate && newDiaryEmoticon && newDiaryText) {
      addDiaryEntry(newDiaryDate, newDiaryEmoticon, newDiaryText);
      // 추가 후 입력 필드 초기화
      setNewDiaryDate('');
      setNewDiaryEmoticon('');
      setNewDiaryText('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>

      {/* 일기 추가 폼 */}
      <div>
        <h3>Add New Diary Entry</h3>
        <label>Date:</label>
        <input type="date" value={newDiaryDate} onChange={(e) => setNewDiaryDate(e.target.value)} />
        <label>Emoticon:</label>
        <input type="text" value={newDiaryEmoticon} onChange={(e) => setNewDiaryEmoticon(e.target.value)} />
        <label>Diary:</label>
        <textarea value={newDiaryText} onChange={(e) => setNewDiaryText(e.target.value)} />
        <button onClick={handleAddDiary}>Add Diary</button>
      </div>

      {/* 사용자의 일기 목록 */}
      <div>
        <h3>Your Diary Entries</h3>
        <ul>
          {user.calendarData.map((entry, index) => (
            <li key={index}>
              {entry.date} - {entry.emoticon} - {entry.diary}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeComponent;
