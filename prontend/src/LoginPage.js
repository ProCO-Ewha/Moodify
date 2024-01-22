import React from 'react';
import './LoginPage.css';
import './index.css';
import HomeComponent from './HomeComponent';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import  { useState } from 'react';
import { useUser } from './UserContext';

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { login } = useUser();
    const navigate = useNavigate();

  const navigateToSignUpPage = () => {
    navigate('/SignUpPage');
  };

  const navigateToResetPage = () => {
    navigate('/ResetPassword');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const handleLogin = async () => {
    try {
      // 가상의 사용자 정보
      const fakeUserData = {
        id: 123,
        email: 'test@example.com',
        // ... 기타 사용자 정보 ...
      };

      // 가상의 로그인 성공
      login(fakeUserData);

      // 메인 달력 페이지로 이동
      navigate('/HomeComponent');
    } catch (error) {
      // 로그인 실패 시 처리
      alert(error.message);
    }
  };

  /*const handleLogin = async () => {
    try {
      // 서버에 로그인 요청을 보냄
      const response = await fetch('서버의 로그인 API 주소', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      // 서버에서 받아온 사용자 정보
      const userData = await response.json();

      // 로그인 성공 시 사용자 정보를 설정
      login(userData);

      // 메인 달력 페이지로 이동
      navigate('/HomeComponent');
    } catch (error) {
      // 로그인 실패 시 처리
      alert(error.message);
    }
  };*/

  return (
    <div className='login'>
      <div className='title'>Log In</div>
      <BackButton></BackButton>

      <div className='input-button-group'>
        <input
          type='email'
          value={email}
          onChange={handleEmailChange}
          className='input-button-group'
          placeholder='email'
        />
      </div>

      <div className='input-button-group'>
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
          className='input-button-group'
          placeholder='password'
        />
      </div>

      <div className='black-button-group' style={{ marginTop: '20px' }}>
        <button onClick={handleLogin}>LOG IN</button>
      </div>

      <div className='grey-button-group'>
        <button onClick={navigateToSignUpPage}>Sign Up</button>
      </div>

      <div className='smalltext'>
        <p onClick={navigateToResetPage}>Forgot password?</p>
      </div>
    </div>
  );
}

export default LoginPage;