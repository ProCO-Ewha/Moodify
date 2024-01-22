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
  const [password, setPassword] = useState('');
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

  const handleSignUp = () => {
    // 여기에서 회원 가입 로직을 추가할 수 있습니다.
    // 필요에 따라 서버에 요청을 보내거나 다른 작업을 수행할 수 있습니다.
    // 이 예제에서는 간단하게 alert를 통해 입력된 정보를 보여줍니다.
    alert(`Email: ${email}, Password: ${password}, Name: ${name}`);
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
          value={password}
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
