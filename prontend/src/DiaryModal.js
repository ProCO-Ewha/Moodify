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
import React, { useState } from 'react';

const DiaryModal = ({ onAdd, onClose, selectedEmoji, selectedText, selectedDate: initialDate, isAdding }) => {
  const [diaryText, setDiaryText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  //const [selectedImage, setSelectedImage] = useState(null);
  //const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 상태 추가
  const [isPublic, setIsPublic] = useState(true);

  /*const handleFileChange = (e) => {
    const file = e.target.files[0]; // 파일 객체 가져오기
    setSelectedImage(file); // 파일 객체 상태에 저장

    // 파일 객체를 URL로 변환하여 미리보기 이미지 표시
    setPreviewImage(URL.createObjectURL(file)); 
  };*/

  const handlePublicSwitch = () => {
    setIsPublic(!isPublic);
  };


  const handleSubmit = () => {
    onAdd(diaryText, selectedDate, isPublic, selectedEmoji);
    setDiaryText(''); 
    setSelectedDate(''); 
    //setSelectedImage(null);
    //setPreviewImage(null); // 제출 후 이미지 초기화
    setIsPublic(true);
  };

  return (
    <div>
      {isAdding ? (
        <>
          <p>Select Emoji: {selectedEmoji}</p>
          <label htmlFor="publicSwitch">Public:</label>
          <input id="publicSwitch" type="checkbox" checked={isPublic} onChange={handlePublicSwitch} />
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


