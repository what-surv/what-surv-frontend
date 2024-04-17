import React, { useState } from 'react';

import { axiosBaseUrl } from '../../api/axiosConfig';
import { GoogleLogin } from '../../stories/social/googlelogin/GoogleLogin';
import { KakaoLogin } from '../../stories/social/kakaologin/KakaoLogin';
import { NaverLogin } from '../../stories/social/naverlogin/NaverLogin';
import Textfield from '../../stories/textfield/Textfield';
import Typography from '../../stories/typography/Typography';

import { useNavigate } from 'react-router-dom';

export interface SocailButtonsPageProps {
  handleLogin: (sort: string) => void;
}

const SocailButtonsPage = ({ handleLogin }: SocailButtonsPageProps) => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const mockOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const mockOnClick = async () => {
    try {
      await axiosBaseUrl.post(`/auth/mock-login/${text}`, {
        username: 'user',
        password: 'userpw',
      });
      return navigate('/');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <Typography
        text='SurveyIT에 오신 것을 환영합니다!'
        size='lg'
        weight='Bold'
      />
      <div className='flex flex-col gap-4 mt-6'>
        <KakaoLogin size='full' onClick={() => handleLogin('kakao')}>
          카카오로 시작하기
        </KakaoLogin>

        <GoogleLogin size='full' onClick={() => handleLogin('google')}>
          구글로 시작하기
        </GoogleLogin>
        <NaverLogin size='full' onClick={() => handleLogin('naver')}>
          네이버로 시작하기
        </NaverLogin>
      </div>

      <div className='mt-10'>
        <Typography
          text='MockLogin'
          size='lg'
          weight='Bold'
          className='block mb-4'
        />
        <Textfield
          onChange={mockOnChange}
          value={text}
          placeholder='MockLogin'
          type='button'
          onClick={mockOnClick}
        />
      </div>
    </>
  );
};

export default SocailButtonsPage;
