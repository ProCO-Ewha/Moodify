import React from 'react';

const EmojiModal = ({ onSelect, onClose }) => {
  const emojis = ['😀', '😄', '😲', '😔', '😡'];

  const handleSelectEmoji = (emoji) => {
    onSelect(emoji);
    onClose();
  };

  return (
    <div>
      {emojis.map((emoji, index) => (
        <button key={index} onClick={() => handleSelectEmoji(emoji)}>
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiModal;