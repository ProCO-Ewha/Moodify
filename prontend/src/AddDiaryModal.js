// AddDiaryModal.js
import React, { useState } from 'react';

const AddDiaryModal = ({ onAdd, onClose, selectedEmoji }) => {
  const [diaryText, setDiaryText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = () => {
    onAdd(diaryText, selectedDate);
    setDiaryText('');
    setSelectedDate('');
    onClose();
  };

  return (
    <div>
      <p>Select Emoji: {selectedEmoji}</p>
      <label>Date:</label>
      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <textarea value={diaryText} onChange={(e) => setDiaryText(e.target.value)} />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddDiaryModal;
