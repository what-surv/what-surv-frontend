import React from 'react';

import style from './login.module.css';
import { KakaoLogin } from '../stories/social/kakaologin/KakaoLogin';
import { GoogleLogin } from '../stories/social/googlelogin/GoogleLogin';
import { NaverLogin } from '../stories/social/naverlogin/NaverLogin';

const Login = () => {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <div className='progressBar'>
          <p>asd</p>
        </div>
        <div className='flex flex-col max-w-xl w-full'>
          <p className='text-lg font-bold'>서비스명에 오신 것을 환영합니다!</p>
          <KakaoLogin size='full' children='카카오로 시작하기' />
          <GoogleLogin size='full' children='구글로 시작하기' />
          <NaverLogin size='full' children='네이버로 시작하기' />
        </div>
      </div>
    </div>
  );
};

export default Login;
