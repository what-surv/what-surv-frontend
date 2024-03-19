import React from 'react';

import { GoogleLogin } from '../../stories/social/googlelogin/GoogleLogin';
import { KakaoLogin } from '../../stories/social/kakaologin/KakaoLogin';
import { NaverLogin } from '../../stories/social/naverlogin/NaverLogin';
import Typography from '../../stories/typography/Typography';

export interface SocailButtonsPageProps {
  handleLogin: (sort: string) => void;
}

const SocailButtonsPage = ({ handleLogin }: SocailButtonsPageProps) => {
  return (
    <>
      <Typography
        text='SurveyIT에 오신 것을 환영합니다!'
        size='lg'
        weight='Bold'
      />
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

export default SocailButtonsPage;
