import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton'
import  { useState } from 'react';
import './index.css';

/*function Setting() {
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    // 실제로는 여기에서 서버로 이름 변경 요청을 보낼 수 있습니다.
    console.log('새로운 이름:', name);
    setName('');
    setMessage('이름이 변경되었습니다.');
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    // 여기서는 현재 비밀번호와 새 비밀번호의 일치 여부를 확인합니다.
    if (currentPassword === newPassword) {
      setMessage('현재 비밀번호와 새 비밀번호가 동일합니다.');
    } else if (newPassword !== confirmPassword) {
      setMessage('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    } else {
      // 실제로는 여기에서 서버로 비밀번호 변경 요청을 보낼 수 있습니다.
      console.log('새로운 비밀번호:', newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage('비밀번호가 변경되었습니다.');
    }
  };

  return (
    <div>
      <div className='title'>
        Settings
      </div>
      <BackButton></BackButton>

      <form onSubmit={handleSubmitName}>
        <div className="input-button-group">
        <input
          type="text"
          placeholder="새 이름을 입력하세요"
          value={name}
          onChange={handleChangeName}
        />
        </div>
        <div className='black-button-group'>
        <button type="submit">Change Name</button> 
        </div>
      </form>

      <div style={{ marginBottom: '2rem' }}></div>

      <form onSubmit={handleSubmitPassword}>
      <div className="input-button-group">
        <input
          type="password"
          placeholder="현재 비밀번호"
          value={currentPassword}
          onChange={handleChangeCurrentPassword}
        />
      
      <br />
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={handleChangeNewPassword}
        />

      <br />
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
        />
        </div>
        <div className='black-button-group'>
        <button type="submit">Change Password</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Setting;*/


function Setting() {
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  /*const handleSubmitName = (e) => {
    e.preventDefault();
    // 실제로는 여기에서 서버로 이름 변경 요청을 보낼 수 있습니다.
    console.log('새로운 이름:', name);
    setName('');
    setMessage('이름이 변경되었습니다.');
  };*/

  const handleSubmitName = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8080/members/edit', {
        name
      });
      setName('');
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      setMessage('이름 변경 중 오류가 발생했습니다.');
    }
  };

  /*const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    } else {
      // 실제로는 여기에서 서버로 비밀번호 변경 요청을 보낼 수 있습니다.
      console.log('새로운 비밀번호:', newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setMessage('비밀번호가 변경되었습니다.');
    }
  };*/

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    } else {
      try {
        const response = await axios.put('http://localhost:8080/members/edit', {
          pw: newPassword
        });
        setNewPassword('');
        setConfirmPassword('');
        setMessage(response.data);
      } catch (error) {
        console.error(error);
        setMessage('비밀번호 변경 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <div className='title'>
        Settings
      </div>

      <form onSubmit={handleSubmitName}>
        <div className="input-button-group">
          <input
            type="text"
            placeholder="새 이름을 입력하세요"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className='black-button-group'>
          <button type="submit">Change Name</button>
        </div>
      </form>

      <div style={{ marginBottom: '2rem' }}></div>

      <form onSubmit={handleSubmitPassword}>
        <div className="input-button-group">
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={handleChangeNewPassword}
          />
          <br />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
        </div>
        <div className='black-button-group'>
          <button type="submit">Change Password</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Setting;
