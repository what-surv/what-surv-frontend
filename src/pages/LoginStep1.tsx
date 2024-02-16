import React from 'react';

import { GoogleLogin } from '../stories/social/googlelogin/GoogleLogin';
import { KakaoLogin } from '../stories/social/kakaologin/KakaoLogin';
import { NaverLogin } from '../stories/social/naverlogin/NaverLogin';

export interface LoginStep1Props {
  handleLogin: () => void;
}

const LoginStep1 = ({ handleLogin }: LoginStep1Props) => {
  return (
    <>
      <p className='text-lg font-bold'>서비스명에 오신 것을 환영합니다!</p>
      <KakaoLogin size='full' onClick={() => handleLogin('kakao')}>
        카카오로 시작하기
      </KakaoLogin>

      <GoogleLogin size='full' onClick={() => handleLogin('google')}>
        구글로 시작하기
      </GoogleLogin>
      <NaverLogin size='full' onClick={() => handleLogin('naver')}>
        네이버로 시작하기
      </NaverLogin>
    </>
  );
};

export default LoginStep1;
