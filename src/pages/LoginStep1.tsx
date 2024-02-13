import React from 'react';
import { KakaoLogin } from '../stories/social/kakaologin/KakaoLogin';
import { GoogleLogin } from '../stories/social/googlelogin/GoogleLogin';
import { NaverLogin } from '../stories/social/naverlogin/NaverLogin';

const LoginStep1 = ({ onNextStep, handleLogin }) => {
  return (
    <>
      <p className='text-lg font-bold'>서비스명에 오신 것을 환영합니다!</p>
      <KakaoLogin size='full' onClick={() => handleLogin()}>
        카카오로 시작하기
      </KakaoLogin>
      <GoogleLogin size='full' onClick={() => handleLogin()}>
        구글로 시작하기
      </GoogleLogin>
      <NaverLogin size='full' onClick={() => handleLogin()}>
        네이버로 시작하기
      </NaverLogin>
      <p onClick={onNextStep}>asd</p>
    </>
  );
};

export default LoginStep1;
