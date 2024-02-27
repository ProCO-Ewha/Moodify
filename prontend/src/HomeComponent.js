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
const [selectedFriendId, setSelectedFriendId] = useState(null); 
const [diaries, setDiaries] = useState([]);

const navigate = useNavigate();
const [friends, setFriends] = useState([]);
const [username, setUsername] = useState('');
const [token, setToken] = useState('');

axios.post('http://localhost:8080/login', { /* 로그인 정보 */ })
  .then(response => {
    setUsername(response.data.username);
    setToken(response.data.token);
  });

// useEffect 내에서 username과 token, 그리고 선택된 년/월을 사용하여 API를 호출합니다.
useEffect(() => {
  if (username && token && selectedYearMonth) {
    const [year, month] = selectedYearMonth.split('-');
    axios.get(`http://localhost:8080/calendar/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        year,
        month
      }
    })
    .then(response => {
      setFriends(response.data.friends);
      setDiaryEntries(response.data.monthly);
    })
    .catch(error => {
      console.error(error);
    });
  }
}, [username, token, selectedYearMonth]);

/*useEffect(() => {
  axios.get(`http://localhost:8080/calendar/${username}?year=${year}&month=${month}`)
    .then(response => {
      setDiaryEntries(response.data.monthly);
    });
}, [selectedYearMonth]);*/

useEffect(() => {
  // selectedYearMonth에서 year와 month를 추출합니다.
  const [year, month] = selectedYearMonth.split('-');
  
  axios.get(`http://localhost:8080/calendar/${username}?year=${year}&month=${month}`)
    .then(response => {
      setDiaryEntries(response.data.monthly || []);
    });
}, [selectedYearMonth, username]);


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
}, [selectedYearMonth]);*/


/*useEffect(() => {
  // 선택한 친구의 일기 목록을 가지고 오는 API 호출
  if (selectedFriendId) {
    axios.get(`/api/diaries/${selectedFriendId}`)
      .then(response => setDiaries(response.data));
  }
}, [selectedFriendId]);*/

const handleAddDiary = (diaryText, selectedDate, isPublic, selectedEmoji) => {
  // 백엔드에서 요구하는 데이터 형식에 맞춰 객체를 생성합니다.
  const newEntry = {
    emotion: selectedEmoji, // 사용자가 선택한 이모지에 따라서 변경
    txt: diaryText,
    privacyStatus: isPublic ? 'PUBLIC' : 'PRIVATE' // isPublic 상태에 따라서 privacyStatus를 설정합니다.
  };

  axios.post('http://localhost:8080/diaries/new', newEntry)
    .then(response => {
      if (response.status === 201) { // 백엔드에서 201 Created 상태 코드를 반환합니다.
        // 백엔드에서 새로 생성된 diary의 ID를 반환하므로, 이를 사용하여 newEntry를 업데이트해야 합니다.
        newEntry.id = response.data;
        setDiaryEntries([
          ...diaryEntries,
          newEntry
        ]);
        setSelectedEmoji('');
        setDiaryModalShown(false);
        setSelectedYearMonth(selectedYearMonth)
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

/*const handleLike = (id) => {
  // 좋아요 기능을 처리하는 함수
  axios.post(`/api/diaries/${id}/like`)
    .then(response => {
      if (response.status === 200) {
        setDiaries(diaries.map(diary => diary.id === id ? { ...diary, isLiked: !diary.isLiked } : diary));
      }
    });
};*/


const handleFriendClick = (friendId) => {
  // 가상의 년도와 월을 사용하여 해당 친구의 달력 페이지로 이동
  const year = '2024';
  const month = '02';
  navigate(`/friend-calendar/${friendId}/${year}-${month}`);
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
    <h2>{selectedYearMonth}</h2> {/* 선택한 년도와 월 표시 */}
    </div>
    <FriendsList friends={friends} onFriendClick={handleFriendClick} />
      <button onClick={handleOpenEmojiModal} className="button-add-emoji">+</button>
      <button onClick={handleOpenSettingPage} className="button-settings">
        <img src="/images/setting.png"/>
      </button>
      <button onClick={handleOpenFindfriendsPage} className="button-find-friends">
        <img src="/images/user.png"/>
      </button>

      
{emojiModalShown && (
  <EmojiModal
    onSelect={handleOpenAddDiaryModal} // 변경된 부분
    onClose={() => setEmojiModalShown(false)}
  />
)}

{addDiaryModalShown && (
  <DiaryModal
    onAdd={handleAddDiary}
    onClose={() => setAddDiaryModalShown(false)}
    selectedEmoji={selectedEmoji}
    //selectedImage={selectedImage} // 추가된 부분
    //setSelectedImage={setSelectedImage} // 추가된 부분
    isAdding={true}
  />
)}


{diaryModalShown && (
  <ViewDiaryModal
    onClose={handleCloseDiaryModal}
    selectedDiary={selectedDiary}
    //selectedImage={selectedImage} // 추가된 부분
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

export default HomeComponent;