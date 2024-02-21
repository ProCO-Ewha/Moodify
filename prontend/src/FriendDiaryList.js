// FriendDiaryList.js
/*import React, { useState } from 'react';

const FriendDiaryList = ({ diaries, onLike }) => {
  const [selectedDiary, setSelectedDiary] = useState(null);

  const handleDiaryClick = (diary) => {
    setSelectedDiary(diary);
  };

  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id} onClick={() => handleDiaryClick(diary)}>
          {diary.emoji}
        </div>
      ))}

      {selectedDiary && (
        <div>
          <p>{selectedDiary.text}</p>
          <button onClick={() => onLike(selectedDiary.id)}>
            {selectedDiary.isLiked ? 'Unlike' : 'Like'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendDiaryList;*/

// FriendDiaryList.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const FriendDiaryList = ({ diaries }) => {
  const navigate = useNavigate();

  const handleDiaryClick = (diaryId) => {
    navigate(`/friend-diary/${diaryId}`);
  };

  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id} onClick={() => handleDiaryClick(diary.id)}>
          {diary.emoji} // 감정 이모지 표시
        </div>
      ))}
    </div>
  );
};

export default FriendDiaryList;

