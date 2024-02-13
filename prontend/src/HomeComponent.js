// HomeComponent.js
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarModal from './CalendarModal';
import EmojiModal from './EmojiModal';
import DiaryModal from './DiaryModal';
import AddDiaryModal from './AddDiaryModal'; // 추가된 부분
import ViewDiaryModal from './ViewDiaryModal'; 
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
const [calendarModalShown, setCalendarModalShown] = useState(false);
const [emojiModalShown, setEmojiModalShown] = useState(false);
const [diaryModalShown, setDiaryModalShown] = useState(false);
const [selectedEmoji, setSelectedEmoji] = useState('');
const [diaryEntries, setDiaryEntries] = useState([]);
const [selectedYearMonth, setSelectedYearMonth] = useState('');
const [selectedDiaryIndex, setSelectedDiaryIndex] = useState(null);
const [selectedDate, setSelectedDate] = useState('');
const [selectedDiary, setSelectedDiary] = useState(null);
const [addDiaryModalShown, setAddDiaryModalShown] = useState(false);
const [isAdding, setIsAdding] = useState(false);
const [isModalOpen, setModalOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState(null); 
const navigate = useNavigate();


/*useEffect(() => {
axios.get('api/diaryEntries')
.then(response => setDiaryEntries(response.data));
}, []);*/

/*useEffect(() => {
  if (selectedYearMonth) {
    // 가짜 데이터
    const fakeData = [
      { date: '2024-01-01', emoji: '😊', text: 'Happy New Year!' },
      { date: '2024-01-02', emoji: '😍', text: 'I love the start of the year.' },
      { date: '2024-02-14', emoji: '😊', text: 'Happy Valentine\'s Day!' },
    ];
    setDiaryEntries(fakeData);
  }
}, [selectedYearMonth]);

const handleAddDiary = (diaryText, selectedDate, selectedImage) => { // Updated
  const newEntry = { date: selectedDate, emoji: selectedEmoji, text: diaryText, image: selectedImage }; // Updated
  setDiaryEntries([
    ...diaryEntries,
    newEntry
  ]);
  setSelectedEmoji('');
  setDiaryModalShown(false);
  setSelectedImage(null); // New
};
  
  /*axios.post('/api/diaryEntries', newEntry)
    .then(response => {
      if (response.status === 200) {
        setDiaryEntries([
          ...diaryEntries,
          newEntry
        ]);
        setSelectedEmoji('');
        setDiaryModalShown(false);
      }
    });*/
  
  // 가상의 응답을 생성
  /*setDiaryEntries([
    ...diaryEntries,
    newEntry
  ]);
  setSelectedEmoji('');
  setDiaryModalShown(false);
};

const handleEditDiary = (diaryText, selectedDate, index) => {
const editedEntry = { date: selectedDate, emoji: selectedEmoji, text: diaryText };
axios.put(`api/diaryEntries/${index}`, editedEntry)
.then(response => {
if (response.status === 200) {
const newDiaryEntries = [...diaryEntries];
newDiaryEntries[index] = editedEntry;
setDiaryEntries(newDiaryEntries);
}
});
};

const handleDeleteDiary = (index) => {
axios.delete(`api/diaryEntries/${index}`)
.then(response => {
if (response.status === 200) {
const newDiaryEntries = [...diaryEntries];
newDiaryEntries.splice(index, 1);
setDiaryEntries(newDiaryEntries);
}
});
};

const handleYearMonthClick = () => {
  setModalOpen(prevState => !prevState);
};

const handleSelect = (date) => {
  setSelectedYearMonth(date);
};

const handleClose = () => {
  setModalOpen(false);
};


const handleSelectEmoji = (emoji) => {
setSelectedEmoji(emoji);
setEmojiModalShown(false);
setDiaryModalShown(true);
};

const handleSelectDate = (yearMonth) => {
setSelectedYearMonth(yearMonth);
setCalendarModalShown(false);
};

const handleOpenEmojiModal = () => {
  setSelectedDiary(null); // 추가된 부분
  setEmojiModalShown(!emojiModalShown);
};

const handleOpenAddDiaryModal = (emoji) => {
  setSelectedEmoji(emoji);
  setEmojiModalShown(false);
  setAddDiaryModalShown(true); // 추가된 부분
};

const sortedDiaryEntries = diaryEntries
    .filter(entry => entry.date.startsWith(selectedYearMonth))  // Add this line
    .sort((a, b) => new Date(a.date) - new Date(b.date));

    const handleOpenDiaryModal = (index) => {
      setIsAdding(false); // 추가된 부분
      setSelectedDiary(sortedDiaryEntries[index]);
      setDiaryModalShown(true);
    };

const handleCloseDiaryModal = () => {
  setSelectedDiaryIndex(null);
  setDiaryModalShown(false);
};

const handleOpenSettingPage = () => {
  navigate('/Setting'); // Setting.js로 이동
};

const handleOpenFindfriendsPage = () =>{
  navigate('/Findfriends');
}

return (
  <div>
      <h2>{selectedYearMonth}</h2> /* 선택한 년도와 월 표시 */
      /*<button onClick={() => setCalendarModalShown(true)}>Select Year and Month</button>
      <button onClick={handleOpenEmojiModal}>+</button>
      <button onClick={handleOpenSettingPage}>
        <img src="/images/setting.png"/>
      </button>
      <button onClick={handleOpenFindfriendsPage}>
        <img src="/images/user.png"/>
      </button>
      


  {calendarModalShown && (
    <CalendarModal
      onSelect={handleSelectDate}
      onClose={() => setCalendarModalShown(false)}
    />
  )}

{emojiModalShown && (
  <EmojiModal
    onSelect={handleOpenAddDiaryModal} // 변경된 부분
    onClose={() => setEmojiModalShown(false)}
  />
)}

{addDiaryModalShown && (
  <AddDiaryModal // 추가된 부분
    onAdd={handleAddDiary}
    onClose={() => setAddDiaryModalShown(false)}
    selectedEmoji={selectedEmoji}
  />
)}

{diaryModalShown && (
        <DiaryModal
          onAdd={handleAddDiary}
          onClose={handleCloseDiaryModal}
          selectedEmoji={selectedEmoji}
          selectedImage={selectedImage} // New
          setSelectedImage={setSelectedImage} // New
        />
      )}

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
  {sortedDiaryEntries.map((entry, index) => (
    <div key={index} onClick={() => handleOpenDiaryModal(index)}>
      {entry?.emoji}
    </div>
  ))}
</div>
</div>
  );
};
export default HomeComponent;*/

// HomeComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarModal from './CalendarModal';
import EmojiModal from './EmojiModal';
import DiaryModal from './DiaryModal';
import AddDiaryModal from './AddDiaryModal'; // 추가된 부분
import ViewDiaryModal from './ViewDiaryModal'; 
import FriendsList from './FriendsList'; // 추가된 부분
import FriendDiaryList from './FriendDiaryList'; 
import { useNavigate } from 'react-router-dom';
import './HomeComponent.css'

const HomeComponent = () => {
const [calendarModalShown, setCalendarModalShown] = useState(false);
const [emojiModalShown, setEmojiModalShown] = useState(false);
const [diaryModalShown, setDiaryModalShown] = useState(false);
const [selectedEmoji, setSelectedEmoji] = useState('');
const [diaryEntries, setDiaryEntries] = useState([]);
const [selectedYearMonth, setSelectedYearMonth] = useState('');
const [selectedDiaryIndex, setSelectedDiaryIndex] = useState(null);
const [selectedDate, setSelectedDate] = useState('');
const [selectedDiary, setSelectedDiary] = useState(null);
const [addDiaryModalShown, setAddDiaryModalShown] = useState(false);
const [isAdding, setIsAdding] = useState(false);
const [isModalOpen, setModalOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
//const [friends, setFriends] = useState([]); // 친구 목록을 저장하는 상태
const [selectedFriendId, setSelectedFriendId] = useState(null); 
const [diaries, setDiaries] = useState([]);
const navigate = useNavigate();
const [friends, setFriends] = useState([
  { id: 1, nickname: 'friend1' },
  { id: 2, nickname: 'friend2' },
  { id: 3, nickname: 'friend1' },
  { id: 4, nickname: 'friend2' },
  { id: 5, nickname: 'friend1' },
  { id: 6, nickname: 'friend2' },
  { id: 7, nickname: 'friend1' },
  { id: 8, nickname: 'friend2' },
  { id: 9, nickname: 'friend1' },
  { id: 10, nickname: 'friend2' },
  // ...
]);


/*useEffect(() => {
axios.get('api/diaryEntries')
.then(response => setDiaryEntries(response.data));
}, []);*/

useEffect(() => {
  if (selectedYearMonth) {
    // 가짜 데이터
    const fakeData = [
      { date: '2024-01-01', emoji: '😊', text: 'Happy New Year!' },
      { date: '2024-01-02', emoji: '😍', text: 'I love the start of the year.' },
      { date: '2024-02-14', emoji: '😊', text: 'Happy Valentine\'s Day!' },
    ];
    setDiaryEntries(fakeData);
  }
}, [selectedYearMonth]);

/*useEffect(() => {
  // 친구 목록을 가지고 오는 API 호출
  axios.get('/api/friends')
    .then(response => setFriends(response.data));
}, []);

useEffect(() => {
  // 선택한 친구의 일기 목록을 가지고 오는 API 호출
  if (selectedFriendId) {
    axios.get(`/api/diaries/${selectedFriendId}`)
      .then(response => setDiaries(response.data));
  }
}, [selectedFriendId]);*/

const handleAddDiary = (diaryText, selectedDate, selectedImage) => {
  const newEntry = { date: selectedDate, emoji: selectedEmoji, text: diaryText, image: selectedImage instanceof File ? URL.createObjectURL(selectedImage) : null};
  
  /*axios.post('/api/diaryEntries', newEntry)
    .then(response => {
      if (response.status === 200) {
        setDiaryEntries([
          ...diaryEntries,
          newEntry
        ]);
        setSelectedEmoji('');
        setDiaryModalShown(false);
      }
    });*/
  
  // 가상의 응답을 생성
  setDiaryEntries([
    ...diaryEntries,
    newEntry
  ]);
  setSelectedEmoji('');
  setDiaryModalShown(false);
  setSelectedYearMonth(selectedDate.slice(0, 7));
  setSelectedImage(null);
};

const handleEditDiary = (diaryText, selectedDate, index) => {
const editedEntry = { date: selectedDate, emoji: selectedEmoji, text: diaryText };
axios.put(`api/diaryEntries/${index}`, editedEntry)
.then(response => {
if (response.status === 200) {
const newDiaryEntries = [...diaryEntries];
newDiaryEntries[index] = editedEntry;
setDiaryEntries(newDiaryEntries);
}
});
};

const handleDeleteDiary = (index) => {
axios.delete(`api/diaryEntries/${index}`)
.then(response => {
if (response.status === 200) {
const newDiaryEntries = [...diaryEntries];
newDiaryEntries.splice(index, 1);
setDiaryEntries(newDiaryEntries);
}
});
};

const handleYearMonthClick = () => {
  setModalOpen(prevState => !prevState);
};

const handleSelect = (date) => {
  setSelectedYearMonth(date);
};

const handleClose = () => {
  setModalOpen(false);
};


const handleSelectEmoji = (emoji) => {
setSelectedEmoji(emoji);
setEmojiModalShown(false);
setDiaryModalShown(true);
};

const handleSelectDate = (yearMonth) => {
setSelectedYearMonth(yearMonth);
setCalendarModalShown(false);
};

const handleOpenEmojiModal = () => {
  setSelectedDiary(null); // 추가된 부분
  setEmojiModalShown(!emojiModalShown);
};

const handleOpenAddDiaryModal = (emoji) => {
  setSelectedEmoji(emoji);
  setEmojiModalShown(false);
  setAddDiaryModalShown(true); // 추가된 부분
};

const sortedDiaryEntries = diaryEntries
    .filter(entry => entry.date.startsWith(selectedYearMonth))  // Add this line
    .sort((a, b) => new Date(a.date) - new Date(b.date));

    const handleOpenDiaryModal = (index) => {
      setIsAdding(false); // 추가된 부분
      setSelectedDiary(sortedDiaryEntries[index]);
      setDiaryModalShown(true);
    };

const handleCloseDiaryModal = () => {
  setSelectedDiaryIndex(null);
  setDiaryModalShown(false);
};

const handleOpenSettingPage = () => {
  navigate('/Setting'); // Setting.js로 이동
};

const handleOpenFindfriendsPage = () =>{
  navigate('/Findfriends');
}

const handleLike = (id) => {
  // 좋아요 기능을 처리하는 함수
  // 백엔드 서버에 좋아요 상태를 변경하는 요청을 보내야 합니다.
  // 이 예제에서는 가상의 기능을 구현하기 위해 상태만 변경합니다.
  setDiaries(diaries.map(diary => diary.id === id ? { ...diary, isLiked: !diary.isLiked } : diary));
};

return (
  <div>
    <FriendsList friends={friends} onSelect={setSelectedFriendId} />
      {selectedFriendId && <FriendDiaryList diaries={diaries} onLike={handleLike} />}
      <h2>{selectedYearMonth}</h2> {/* 선택한 년도와 월 표시 */}
      <button onClick={() => setCalendarModalShown(true)} className="button-select-year">Select Year and Month</button>
      <button onClick={handleOpenEmojiModal} className="button-add-emoji">+</button>
      <button onClick={handleOpenSettingPage} className="button-settings">
        <img src="/images/setting.png"/>
      </button>
      <button onClick={handleOpenFindfriendsPage} className="button-find-friends">
        <img src="/images/user.png"/>
      </button>
      


  {calendarModalShown && (
    <CalendarModal
      onSelect={handleSelectDate}
      onClose={() => setCalendarModalShown(false)}
    />
  )}

{emojiModalShown && (
  <EmojiModal
    onSelect={handleOpenAddDiaryModal} // 변경된 부분
    onClose={() => setEmojiModalShown(false)}
  />
)}

{addDiaryModalShown && (
  <AddDiaryModal
    onAdd={handleAddDiary}
    onClose={() => setAddDiaryModalShown(false)}
    selectedEmoji={selectedEmoji}
    selectedImage={selectedImage} // 추가된 부분
    setSelectedImage={setSelectedImage} // 추가된 부분
  />
)}


{diaryModalShown && (
  <ViewDiaryModal
    onClose={handleCloseDiaryModal}
    selectedDiary={selectedDiary}
    selectedImage={selectedImage} // 추가된 부분
  />
)}

{selectedDiary?.image && <img src={selectedDiary.image} alt="Diary" />}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
  {sortedDiaryEntries.map((entry, index) => (
    <div key={index} onClick={() => handleOpenDiaryModal(index)}>
      {entry?.emoji}
    </div>
  ))}
</div>
</div>
  );
};

export default HomeComponent;
