/*import React, { useState } from 'react';

const CalendarModal = ({ onClose, onYearMonthSelect }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleSelectYearMonth = () => {
    if (selectedYear && selectedMonth) {
      onYearMonthSelect(selectedYear, selectedMonth);
      onClose();
    } else {
      alert('Please select both year and month.');
    }
  };

  return (
    <div>
      <h3>Select Year and Month</h3>
      <label>Year:</label>
      <input type="text" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />
      <label>Month:</label>
      <input type="text" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
      <button onClick={handleSelectYearMonth}>Select</button>
    </div>
  );
};

export default CalendarModal;*/

/*import React, { useState, useEffect } from 'react';

const CalendarModal = ({ onClose, onYearMonthSelect }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);

  useEffect(() => {
    // 년도 목록 생성 (예: 2020부터 2030까지)
  const startYear = 2020;
  const years = Array.from({ length: 11 }, (_, index) => startYear + index);
  setYearList(years);


    // 달 목록 생성 (1부터 12까지)
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    setMonthList(months);
  }, []);

  const handleSelectYearMonth = () => {
    if (selectedYear && selectedMonth) {
      onYearMonthSelect(selectedYear, selectedMonth);
      onClose();
    } else {
      alert('Please select both year and month.');
    }
  };

  return (
    <div>
      <h3>Select Year and Month</h3>
      <label>Year:</label>
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Select Year</option>
        {yearList.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <label>Month:</label>
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Select Month</option>
        {monthList.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <button onClick={handleSelectYearMonth}>Select</button>
    </div>
  );
};

export default CalendarModal;*/

// CalendarModal.js
/*import React, { useState } from 'react';

const CalendarModal = ({ onSelect, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectYearMonth = (yearMonth) => {
    setSelectedYearMonth(yearMonth);
    setCalendarModalShown(false);
  };
  

  const handleSubmit = () => {
    onSelect(selectedDate);
    onClose();
  };

  return (
    <div>
      <input type="month" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <button onClick={handleSubmit}>Select</button>
    </div>
  );
};

export default CalendarModal;*/

// CalendarModal.js
import React, { useState } from 'react';

const CalendarModal = ({ onSelect, onClose }) => {
const [selectedDate, setSelectedDate] = useState('');

const handleSubmit = () => {
onSelect(selectedDate);
onClose();
};

return (
<div>
<input type="month" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
<button onClick={handleSubmit}>Select</button>
</div>
);
};

export default CalendarModal;
