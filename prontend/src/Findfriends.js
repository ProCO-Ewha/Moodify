import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';

const Findfriends = ({ userId }) => { // userId prop을 추가합니다.
  const [friendList, setFriendList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  // 사용자 ID에 해당하는 친구 목록을 불러오는 함수
  const fetchFriends = () => {
    axios.get(`/api/user/${userId}/friends`)
      .then(response => {
        setFriendList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // 컴포넌트가 마운트될 때 친구 목록을 불러옴
  useEffect(() => {
    fetchFriends();
  }, [userId]);

  // 친구 검색을 처리하는 함수
  const handleSearch = () => {
    axios.get(`/api/friends?search=${searchQuery}`)
      .then(response => {
        setSearchResult(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // 친구 추가를 처리하는 함수
  const handleAddFriend = (friend) => {
    axios.post(`/api/user/${userId}/friends`, friend)
      .then(response => {
        setFriendList([...friendList, response.data]);
        setSearchResult([]);
        setSearchQuery('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='title'>Friend List</div>
      <BackButton></BackButton>
      <ul>
        {friendList.map(friend => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>

      <h2>사용자 검색</h2>
      <div className="input-button-group">
      <input
        type="text"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      </div>
      <div className='black-button-group'>
      <button onClick={handleSearch}>Search</button>
      </div>

      <h2>검색 결과</h2>
      <ul>
        {searchResult.map(friend => (
          <li key={friend.id}>
            {friend.name}
            <div className='black-button-group'>
            <button onClick={() => handleAddFriend(friend)}>친구로 추가</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Findfriends;


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from './BackButton';

const Findfriends = () => {
  const [friendList, setFriendList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  // 친구 목록을 초기화하는 함수
  const resetFriendList = () => {
    axios.get('/api/friends')
      .then(response => {
        setFriendList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // 컴포넌트가 마운트될 때 친구 목록을 불러옴
  useEffect(() => {
    resetFriendList();
  }, []);

  // 친구 검색을 처리하는 함수
  const handleSearch = () => {
    axios.get(`/api/friends?search=${searchQuery}`)
      .then(response => {
        setSearchResult(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // 친구 추가를 처리하는 함수
  const handleAddFriend = (friend) => {
    axios.post('/api/friends', friend)
      .then(response => {
        setFriendList([...friendList, response.data]);
        setSearchResult([]);
        setSearchQuery('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='title'>Friend List</div>
      <BackButton></BackButton>
      <ul>
        {friendList.map(friend => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>

      <h2>친구 검색</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <h2>검색 결과</h2>
      <ul>
        {searchResult.map(friend => (
          <li key={friend.id}>
            {friend.name}
            <button onClick={() => handleAddFriend(friend)}>추가</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Findfriends;*/

/*import React, { useState } from 'react';
import BackButton from './BackButton';

const Findfriends = () => {
  const allUsers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'moon' },
    // 필요한 만큼 여기에 더 추가하실 수 있습니다.
  ];

  const [friendList, setFriendList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = () => {
    const result = allUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(result);
  };

  const handleAddFriend = (friend) => {
    if (!friendList.find(f => f.id === friend.id)) {
      setFriendList([...friendList, friend]);
    }
    setSearchResult([]);
    setSearchQuery('');
  };

  return (
    <div>
      <div className='title'>Friend List</div>
      <BackButton></BackButton>
      <ul>
        {friendList.map(friend => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>

      <h2>사용자 검색</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <h2>검색 결과</h2>
      <ul>
        {searchResult.map(friend => (
          <li key={friend.id}>
            {friend.name}
            <button onClick={() => handleAddFriend(friend)}>친구로 추가</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Findfriends;*/

