import React from 'react';

import style from './login.module.css';

const Login = () => {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <div className='progressBar'>
          <p>asd</p>
        </div>
        <div className='flex flex-col max-w-xl w-full'>
          <p className='text-lg font-bold'>서비스명에 오신 것을 환영합니다!</p>
          <button type='button' className={`${style['login-btn']}`}>
            카카오로 시작하기
          </button>
          <button type='button' className={`${style['login-btn']}`}>
            구글로 시작하기
          </button>
          <button type='button' className={`${style['login-btn']}`}>
            네이버로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
