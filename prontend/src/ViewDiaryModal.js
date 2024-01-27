// ViewDiaryModal.js
const ViewDiaryModal = ({ onClose, selectedDiary }) => {
  return (
    <div>
      {selectedDiary && (
        <>
          <p>Selected Emoji: {selectedDiary.emoji}</p>
          <p>Date: {selectedDiary.date}</p>
          <p>Text: {selectedDiary.text}</p>
        </>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ViewDiaryModal;