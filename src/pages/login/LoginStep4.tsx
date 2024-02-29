import React from 'react';

import style from './login.module.css';
import icSuccessBig from '../../stories/assets/ic-success-big.svg';

import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';

const LoginStep4 = () => {
  const navigate = useNavigate();
  return (
    <div className='relative'>
      <div className='absolute top-1/2 left-1/2'>
        <ConfettiExplosion />
      </div>
      <p className='text-lg text-center text-center font-bold mb-[24px] mt-5'>
        서비스명에 오신 것을 환영합니다!!
      </p>
      <div className='text-center'>
        <img className='inline' src={icSuccessBig} alt='회원가입 성공 아이콘' />
      </div>
      <p className='text-center my-4'>회원가입이 완료되었습니다.</p>
      <button
        type='button'
        className={style['basic-btn']}
        onClick={() => {
          navigate('/');
        }}
      >
        서비스명 시작하기
      </button>
    </div>
  );
};

export default LoginStep4;
