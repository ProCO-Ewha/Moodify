import React from 'react';
import './LoginPage.css';
import './index.css';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import { useState } from 'react';

function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <div className='title'>Reset Password</div>
      <BackButton></BackButton>
      <div className='input-button-group'>
        <input type='email' value={email} onChange={handleEmailChange} className = 'input-button-group' placeholder='Email'/>
      </div>
      <div className='black-button-group' style={{ marginTop: '20px' }}>
        <button>Send Request</button>
      </div>
    </div>
  );
}

export default ResetPassword;
