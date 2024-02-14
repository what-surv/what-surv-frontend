import React from 'react';

import { KakaoLogin } from '../stories/social/kakaologin/KakaoLogin';

export interface LoginStep1Props {
  onNextStep: () => void;
  handleLogin: () => void;
}

const LoginStep1 = ({ onNextStep, handleLogin }: LoginStep1Props) => {
  return (
    <>
      <p className='text-lg font-bold'>서비스명에 오신 것을 환영합니다!</p>
      <KakaoLogin size='full' onClick={() => handleLogin()}>
        카카오로 시작하기
      </KakaoLogin>
      {/* <GoogleLogin size='full' onClick={() => handleLogin()}>
        구글로 시작하기
      </GoogleLogin> */}
      {/* <NaverLogin size='full' onClick={() => handleLogin()}>
        네이버로 시작하기
      </NaverLogin> */}
      <button type='button' onClick={onNextStep}>
        asd
      </button>
    </>
  );
};

export default LoginStep1;
