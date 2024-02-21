import React from 'react';
import './LoginPage.css';
import './index.css';
import HomeComponent from './HomeComponent';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import  { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });
  
      if (response.status !== 200) {
        throw new Error('Invalid email or password');
      }
  
      // 서버에서 받아온 사용자 정보
      const userData = response.data;
  
      // 로그인 성공 시 사용자 정보를 설정
      // 이 부분은 추후 사용자 정보를 사용하는 방식에 따라 수정이 필요합니다.
      localStorage.setItem('user', JSON.stringify(userData));
  
      // 메인 달력 페이지로 이동
      navigate('/HomeComponent');
    } catch (error) {
      // 로그인 실패 시 처리
      alert(error.message);
    }
  };

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