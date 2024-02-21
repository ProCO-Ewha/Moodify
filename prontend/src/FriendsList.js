// FriendsList.js
import React from 'react';

const FriendsList = ({ friends, onFriendClick }) => {
  const containerStyle = {
    display: 'flex',
    overflowX: 'scroll',
    marginTop: '50px'  // 버튼과의 여백 추가
  };

  const itemStyle = {
    marginBottom: '10px',  // 닉네임 아래에 여백 추가
    marginRight: '20px'   // 닉네임 오른쪽에 여백 추가
  };


  return (
    <div style={containerStyle}>
      {friends.map((friend) => (
        <div key={friend.id} onClick={() => onFriendClick(friend.id)}>
          {friend.nickname}
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
