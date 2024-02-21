/*import React from 'react';
import './LoginPage.css';
import './index.css';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

function SignUpPage(){

  return(
    <div>
      <div className = 'title'>
        Sign Up
      </div>
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

      <div className='input-button-group'>
        <input
          type='name'
          value={name}
          onChange={handleNameChange}
          className='input-button-group'
          placeholder='password'
        />
      </div>

      <div className = 'black-button-group' style={{ marginTop: '20px' }}>
        <button>SIGN UP</button>
      </div>
      
  </div>
  )
}

export default SignUpPage;*/

import React, { useState } from 'react';
import './LoginPage.css';
import './index.css';
import BackButton from './BackButton';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [pw, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      // 로컬에서 실행 중인 백엔드 서버로 회원가입 요청을 보냄
      const response = await fetch('http://localhost:8080/members/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pw, name }),
      });
  
      if (!response.ok) {
        throw new Error('Sign up failed');
      }
  
      // 서버에서 받아온 메시지
      const message = await response.text();
  
      // 회원가입 성공시 메시지를 보여줌
      alert(message);
    } catch (error) {
      // 회원가입 실패 시 처리
      alert(error.message);
    }
  };
  

  return (
    <div>
      <div className='title'>
        Sign Up
      </div>
      <BackButton></BackButton>

      <div className='input-button-group'>
        <input
          type='email'
          value={email}
          onChange={handleEmailChange}
          className='input-button-group'
          placeholder='Email'
        />
      </div>

      <div className='input-button-group'>
        <input
          type='password'
          value={pw}
          onChange={handlePasswordChange}
          className='input-button-group'
          placeholder='Password'
        />
      </div>

      <div className='input-button-group'>
        <input
          type='text'
          value={name}
          onChange={handleNameChange}
          className='input-button-group'
          placeholder='Name'
        />
      </div>

      <div className='black-button-group' style={{ marginTop: '20px' }}>
        <button onClick={handleSignUp}>SIGN UP</button>
      </div>
    </div>
  );
}

export default SignUpPage;
