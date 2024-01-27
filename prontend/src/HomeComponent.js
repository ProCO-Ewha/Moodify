// HomeComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarModal from './CalendarModal';
import EmojiModal from './EmojiModal';
import DiaryModal from './DiaryModal';
import AddDiaryModal from './AddDiaryModal'; // 추가된 부분
import ViewDiaryModal from './ViewDiaryModal'; 

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

const handleAddDiary = (diaryText, selectedDate) => {
  const newEntry = { date: selectedDate, emoji: selectedEmoji, text: diaryText };
  
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

return (
  <div>
      <h2>{selectedYearMonth}</h2> {/* 선택한 년도와 월 표시 */}
      <button onClick={() => setCalendarModalShown(true)}>Select Year and Month</button>
      <button onClick={handleOpenEmojiModal}>+</button>


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
  <ViewDiaryModal // 변경된 부분
    onClose={handleCloseDiaryModal}
    selectedDiary={selectedDiary}
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




// HomeComponent.js

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarModal from './CalendarModal';
import EmojiModal from './EmojiModal';
import DiaryModal from './DiaryModal';

const HomeComponent = () => {
  const [calendarModalShown, setCalendarModalShown] = useState(false);
  const [emojiModalShown, setEmojiModalShown] = useState(false);
  const [diaryModalShown, setDiaryModalShown] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    axios.get('/api/diaryEntries')
      .then(response => setDiaryEntries(response.data));
  }, []);

  const handleAddDiary = (diaryText, selectedDate) => {
    const newEntry = { date: selectedDate, emoji: selectedEmoji, text: diaryText };
    axios.post('/api/diaryEntries', newEntry)
      .then(response => {
        if (response.status === 200) {
          setDiaryEntries([
            ...diaryEntries,
            newEntry
          ]);
          setSelectedEmoji('');
          setDiaryModalShown(false);
        }
      });
  };

  const handleEditDiary = (diaryText, selectedDate, index) => {
    const editedEntry = { date: selectedDate, emoji: selectedEmoji, text: diaryText };
    axios.put(`/api/diaryEntries/${index}`, editedEntry)
      .then(response => {
        if (response.status === 200) {
          const newDiaryEntries = [...diaryEntries];
          newDiaryEntries[index] = editedEntry;
          setDiaryEntries(newDiaryEntries);
        }
      });
  };

  const handleDeleteDiary = (index) => {
    axios.delete(`/api/diaryEntries/${index}`)
      .then(response => {
        if (response.status === 200) {
          const newDiaryEntries = [...diaryEntries];
          newDiaryEntries.splice(index, 1);
          setDiaryEntries(newDiaryEntries);
        }
      });
  };

  const handleSelectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
    setEmojiModalShown(false);
    setDiaryModalShown(true);
  };

  const handleSelectDate = (date) => {
    setCalendarModalShown(false);
  };

  const handleOpenEmojiModal = () => {
    setEmojiModalShown(!emojiModalShown);
  };

  return (
    <div>
      <button onClick={() => setCalendarModalShown(true)}>Select Year and Month</button>
      <button onClick={handleOpenEmojiModal}>+</button>

      {calendarModalShown && (
        <CalendarModal
          onSelect={handleSelectDate}
          onClose={() => setCalendarModalShown(false)}
        />
      )}

      {emojiModalShown && (
        <EmojiModal
          onSelect={handleSelectEmoji}
          onClose={() => setEmojiModalShown(false)}
        />
      )}

      {diaryModalShown && (
        <DiaryModal
          onAdd={handleAddDiary}
          onEdit={handleEditDiary}
          onDelete={handleDeleteDiary}
          onClose={() => setDiaryModalShown(false)}
          selectedEmoji={selectedEmoji}
        />
      )}

      <ul>
        {diaryEntries.map((entry, index) => (
          <li key={index}>
            {entry.date} - {entry.emoji} - {entry.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
*/


/*import React, { useState, useEffect } from 'react';
import CalendarModal from './CalendarModal';
import EmojiModal from './EmojiModal';
import DiaryModal from './DiaryModal';

const HomeComponent = () => {
  const [calendarModalShown, setCalendarModalShown] = useState(false);
  const [emojiModalShown, setEmojiModalShown] = useState(false);
  const [diaryModalShown, setDiaryModalShown] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [diaryEntries, setDiaryEntries] = useState(
    JSON.parse(localStorage.getItem('diaryEntries')) || []
  );

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const handleAddDiary = (diaryText, selectedDate) => {
    setDiaryEntries([
      ...diaryEntries,
      { date: selectedDate, emoji: selectedEmoji, text: diaryText }
    ]);
    setSelectedEmoji('');
    setDiaryModalShown(false);
  };

  const handleSelectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
    setEmojiModalShown(false);
    setDiaryModalShown(true);
  };

  const handleSelectDate = (date) => {
    setCalendarModalShown(false);
  };

  const handleOpenEmojiModal = () => {
    setEmojiModalShown(!emojiModalShown);
  };

  return (
    <div>
      <button onClick={() => setCalendarModalShown(true)}>Select Year and Month</button>
      <button onClick={handleOpenEmojiModal}>+</button>

      {calendarModalShown && (
        <CalendarModal
          onSelect={handleSelectDate}
          onClose={() => setCalendarModalShown(false)}
        />
      )}

      {emojiModalShown && (
        <EmojiModal
          onSelect={handleSelectEmoji}
          onClose={() => setEmojiModalShown(false)}
        />
      )}

      {diaryModalShown && (
        <DiaryModal
          onAdd={handleAddDiary}
          onClose={() => setDiaryModalShown(false)}
          selectedEmoji={selectedEmoji}
        />
      )}

      /* 일기 목록 렌더링 */
      /*<ul>
        {diaryEntries.map((entry, index) => (
          <li key={index}>
            {entry.date} - {entry.emoji} - {entry.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeComponent;*/
