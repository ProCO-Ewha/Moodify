// DiaryModal.js
/*import React, { useState } from 'react';
const DiaryModal = ({ onAdd, onEdit, onDelete, onClose, selectedEmoji, selectedText, selectedIndex }) => {
  const [diaryText, setDiaryText] = useState(selectedText || '');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      onEdit(diaryText, selectedDate, selectedIndex);
    } else {
      onAdd(diaryText, selectedDate);
    }
  };

  const handleDelete = () => {
    onDelete(selectedIndex);
  };
    return (
        <div>
          <p>Selected Emoji: {selectedEmoji}</p>
          {selectedIndex !== null ? (
            <>
              <p>Date: {selectedDate}</p>
              <p>{diaryText}</p>
              <button onClick={handleDelete}>Delete</button>
            </>
          ) : (
            <>
              <label>Date:</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              <textarea value={diaryText} onChange={(e) => setDiaryText(e.target.value)} />
              <button onClick={handleSubmit}>Add</button>
            </>
          )}
        </div>
      );
    };
    
    export default DiaryModal;*/

// DiaryModal.js
import React, { useState, useEffect } from 'react';

const DiaryModal = ({ onAdd, onClose, selectedEmoji, selectedText, selectedDate: initialDate, isAdding }) => { // isAdding 추가
  const [diaryText, setDiaryText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = () => {
    onAdd(diaryText, selectedDate);
    setDiaryText(''); 
    setSelectedDate(''); 
  };

  return (
    <div>
      {isAdding ? ( // 추가된 부분
        <>
          <p>Select Emoji: {selectedEmoji}</p>
          <label>Date:</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          <textarea value={diaryText} onChange={(e) => setDiaryText(e.target.value)} />
          <button onClick={handleSubmit}>Save</button>
        </>
      ) : (
        <>
          <p>Select Emoji: {selectedEmoji}</p>
          <p>Date: {selectedDate}</p>
          <p>Text: {selectedText}</p>
        </>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DiaryModal;


