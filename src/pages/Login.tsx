import React, { useEffect, useState } from 'react';

import style from './login.module.css';
import { KakaoLogin } from '../stories/social/kakaologin/KakaoLogin';
import { GoogleLogin } from '../stories/social/googlelogin/GoogleLogin';
import { NaverLogin } from '../stories/social/naverlogin/NaverLogin';

import ic_prev from '../stories/assets/ic_prev.svg';
import { Button } from '../stories/button/Button';
import { Outlined } from '../stories/button/Button.stories';

import ic_text_field_fail from '../stories/assets/ic_text_field_fail.svg';
import ic_text_field_success from '../stories/assets/ic_text_field_success.svg';
import ic_success_big from '../stories/assets/ic_success_big.svg';

const Login = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center mt-[60px]'>
        <div className='flex flex-col max-w-xl w-full'>
          <div className={style.progressBar}>
            <div style={{ width: `${currentStep * 25}%` }}></div>
          </div>
          {currentStep === 1 && <LoginStep1 onNextStep={handleNextStep} />}
          {currentStep === 2 && <LoginStep2 onNextStep={handleNextStep} />}
          {currentStep === 3 && <LoginStep3 onNextStep={handleNextStep} />}
          {currentStep === 4 && <LoginStep4 />}
        </div>
      </div>
    </div>
  );
};

const LoginStep1 = ({ onNextStep }) => {
  return (
    <>
      <p className='text-lg font-bold'>서비스명에 오신 것을 환영합니다!</p>
      <KakaoLogin size='full'>카카오로 시작하기</KakaoLogin>
      <GoogleLogin size='full'>구글로 시작하기</GoogleLogin>
      <NaverLogin size='full'>네이버로 시작하기</NaverLogin>
      <p onClick={onNextStep}>asd</p>
    </>
  );
};

const LoginStep2 = ({ onNextStep }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    '0': { checked: false, href: 'https://www.naver.com/' },
    '1': { checked: false, href: 'https://www.google.co.kr/' },
    '2': { checked: false, href: 'https://github.com/' },
  });

  useEffect(() => {
    console.log(checkboxStates);
  }, [checkboxStates]);

  const handleCheckboxChange = (checkboxId) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [checkboxId]: {
        ...prevStates[checkboxId],
        checked: !prevStates[checkboxId].checked,
      },
    }));
  };

  const handleAllCheckboxChange = () => {
    const allChecked = !isChecked;
    setIsChecked(allChecked);

    setCheckboxStates((prevStates) => {
      const updatedStates = {};
      for (const key in prevStates) {
        updatedStates[key] = {
          ...prevStates[key],
          checked: allChecked,
          href: prevStates[key].href,
        };
      }
      return updatedStates;
    });
  };

  return (
    <div>
      <div className=' flex w-6 h-6 mb-10 justify-center items-center cursor-pointer'>
        <img src={ic_prev} alt='뒤로가는 이미지' className='block wd-1' />
      </div>
      <p className='text-lg font-bold mb-[24px]'>서비스 이용약관 동의</p>
      <div className={style['checkbox-wrap']}>
        <label htmlFor='all' className={isChecked ? style.on : ''}>
          <input
            id='all'
            type='checkbox'
            checked={isChecked}
            onChange={handleAllCheckboxChange}
          />
          <span>전체 동의하기</span>
        </label>
      </div>

      {['0', '1', '2'].map((checkboxId) => (
        <div key={checkboxId} className={style['checkbox-wrap']}>
          <label
            htmlFor={checkboxId}
            className={checkboxStates[checkboxId].checked ? style.on : ''}
          >
            <input
              id={checkboxId}
              type='checkbox'
              checked={checkboxStates[checkboxId].checked}
              onChange={() => handleCheckboxChange(checkboxId)}
            />
            <span>{getCheckboxLabel(checkboxId)}</span>
          </label>
          <a href={checkboxStates[checkboxId].href} target='_blank'>
            보기
          </a>
        </div>
      ))}
      <Button size='default' state='contained'>
        로그인하기
      </Button>
      <p onClick={onNextStep}>asd</p>
    </div>
  );
};

const LoginStep3 = ({ onNextStep }) => {
  return (
    <div>
      <p className='text-lg font-bold mb-[24px]'>
        서비스명 에서 어떻게 불러드릴까요?
      </p>
      <p className='mb-[12px] font-semibold '>닉네임을 입력해주세요!</p>
      <div className='flex'>
        <div className={`${style['text-filed-wrap']} ${style.success}`}>
          <input type='text' className={style['text-filed']} />
          <img className='block' src={ic_text_field_success} alt='성공아이콘' />
          <img className='' src={ic_text_field_fail} alt='실패아이콘' />
        </div>
        <button className={`${style['btn-small']}`}>중복확인</button>
      </div>
      <p
        className={`${style[`text-filed-txt`]} ${style.success} mt-1.5 text-xs`}
      >
        사용하실 수 없는 닉네임 입니다!
      </p>
      <Button
        key={'0'}
        children={'다음'}
        enabled={false}
        disabled={false}
        hover={false}
        focused={false}
        pressed={false}
        type={'button'}
        ref={null}
        props={'asd'}
      />
      <p onClick={onNextStep}>asd</p>
    </div>
  );
};

const LoginStep4 = ({ onNextStep }) => {
  return (
    <div>
      <p className='text-lg text-center text-center font-bold mb-[24px] mt-5'>
        서비스명에 오신 것을 환영합니다!!
      </p>
      <div className='text-center'>
        <img
          className='inline'
          src={ic_success_big}
          alt='회원가입 성공 아이콘'
        />
      </div>
      <p className='text-center my-4'>회원가입이 완료되었습니다.</p>
      <Button
        key={'0'}
        enabled={false}
        disabled={false}
        hover={false}
        focused={false}
        pressed={false}
        type={'button'}
        ref={null}
        props={'asd'}
      >
        서비스 시작하기
      </Button>
      <p onClick={onNextStep}>asd</p>
    </div>
  );
};

// 각 체크박스에 대한 라벨을 가져오는 함수
const getCheckboxLabel = (checkboxId) => {
  const labels = {
    '0': '[필수]  서비스 이용약관',
    '1': '[필수]  개인정보 처리방침 및 수집이용 동의',
    '2': '[선택]  마케팅 정보 수신 및 이용 동의',
  };
  return labels[checkboxId] || '';
};

export default Login;
