import axios from 'axios';
import React, { useEffect, useState } from 'react';

import LoginStep1 from './LoginStep1';
import LoginStep2 from './LoginStep2';
import LoginStep3 from './LoginStep3';
import LoginStep4 from './LoginStep4';
import { ProgressBar } from '../../stories/indicator/progress bar/ProgressBar';

import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    advertisingConsent: false,
  });
  const [checkboxStates, setCheckboxStates] = useState({
    '0': { checked: false, href: 'https://www.naver.com/' },
    '1': { checked: false, href: 'https://www.google.co.kr/' },
    '2': { checked: false, href: 'https://github.com/' },
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean | null>(
    null
  );

  // Ouath2 링크별 분기처리
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 유저정보 체크
    const checkAuthStatus = async (path: string) => {
      try {
        const test = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/${path}`,
          {
            withCredentials: true,
          }
        );
        console.log('asdasdasdasd', test);

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          phone: '010-9076-2806',
          gender: 'helicopter',
          job: 'KFC',
        }));
        nextStepHandler();
      } catch (error) {
        navigate('/login');
      }
    };

    // location을 통해서 url별 분기처리
    const { pathname } = location;
    switch (pathname) {
      // 신규유저
      case '/login/new-user':
        checkAuthStatus('new-user/profile');
        break;

      // 가입된 유저
      case '/login/success':
        // 이미 유저정보가 있을때 메인으로 이동
        navigate('/');
        break;

      // 실패했을경우
      case '/login/failure':
        navigate('/login');

        break;
      default:
        break;
    }
  }, []);

  const nextStepHandler = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStepHandler = () => {
    setCurrentStep(currentStep - 1);
  };

  const userInfoHandler = (param: { sort: string; data: string }) => {
    const { sort, data } = param;
    switch (sort) {
      case 'check':
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          advertisingConsent: data === 'true',
        }));
        break;
      case 'nickname':
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          nickname: data,
        }));
        break;
      default:
        alert('에러! 관리자에게 문의하세요.');
        break;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      nickname: value,
    }));
    setIsButtonDisabled(false);
  };

  const isValidInput = (text: string) => {
    const regex = /^[a-zA-Z가-힣]{2,10}$/;
    return regex.test(text);
  };

  // STEP3에서 닉네임 요청하는 온클릭 함수
  const onClick = async () => {
    // 정규식 체크
    if (!isValidInput(userInfo.nickname)) {
      return false;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/nickname-exists?nickname=${userInfo.nickname}`
      );
      const { data } = response;

      return setIsButtonDisabled(!data);
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
    return undefined;
  };

  // STEP3에서 다음 눌렀을때 POST 요청
  const userRegistrationHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/sign-up`,
        userInfo,
        { withCredentials: true }
      );
      nextStepHandler();
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const loginHandler = (sort: string) => {
    switch (sort) {
      case 'google':
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/login/google`;
        break;
      case 'kakao':
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/login/kakao`;
        break;
      case 'naver':
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/login/naver`;
        break;

      default:
        alert('ERROR');
        break;
    }
  };

  const renderLoginStep = (step: number) => {
    switch (step) {
      case 1:
        return <LoginStep1 handleLogin={loginHandler} />;
      case 2:
        return (
          <LoginStep2
            onNextStep={nextStepHandler}
            userInfo={userInfoHandler}
            onPrevStep={prevStepHandler}
            checkboxStates={checkboxStates}
            setCheckboxStates={setCheckboxStates}
          />
        );
      case 3:
        return (
          <LoginStep3
            onChange={onChange}
            onClick={onClick}
            onNextStep={userRegistrationHandler}
            onPrevStep={prevStepHandler}
            value={userInfo.nickname}
            isButtonDisabled={isButtonDisabled}
          />
        );
      case 4:
        return <LoginStep4 />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center mt-[60px]'>
        <div className='flex flex-col w-full max-w-xl'>
          <ProgressBar size='desktop' percent={currentStep * 25} />
          <div className='mt-[60px]'>{renderLoginStep(currentStep)}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
