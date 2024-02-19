import axios from 'axios';
import React, { useEffect, useState } from 'react';

import LoginStep1 from './LoginStep1';
import LoginStep2 from './LoginStep2';
import LoginStep3 from './LoginStep3';
import LoginStep4 from './LoginStep4';
import { ProgressBar } from '../stories/indicator/progress bar/ProgressBar';

import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    nickName: '',
    advertisingConsent: false,
  });
  const [checkboxStates, setCheckboxStates] = useState({
    '0': { checked: false, href: 'https://www.naver.com/' },
    '1': { checked: false, href: 'https://www.google.co.kr/' },
    '2': { checked: false, href: 'https://github.com/' },
  });

  // Ouath2 링크별 분기처리
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 유저정보 체크
    const checkAuthStatus = async (path: string) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/${path}`,
          {
            withCredentials: true, // Important: Include credentials to ensure cookies are sent
          }
        );
        const { data } = response;
        console.log(data);
        // if (response.status === 200) {
        //   const data = response.data;

        //   if (data.isAuthenticated) {
        //     // history.push('/dashboard');
        //     navigate('/main');
        //   } else {
        //     nextStepHandler();
        //     // navigate('/login');
        //   }
        // }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        // navigate('/login');
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
        // 이미 유저정보가 있을때 메인으로 이동~
        checkAuthStatus('profile');
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
      case 'nickName':
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          nickName: data,
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
      nickName: value,
    }));
  };

  const isValidInput = (text: string) => {
    const regex = /^[a-zA-Z가-힣]{2,10}$/;
    return regex.test(text);
  };

  // STEP3에서 닉네임 요청하는 온클릭 함수
  const onClick = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/profile`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        if (isValidInput(userInfo.nickName) && userInfo.nickName !== '서범규') {
          // DB에 중복되는 닉네임이 있는지 확인하는 IF문
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
    return undefined;
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
            onNextStep={nextStepHandler}
            onPrevStep={prevStepHandler}
            value={userInfo.nickName}
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
        <div className='flex flex-col max-w-xl w-full'>
          <ProgressBar environment='desktop' percent={currentStep * 25} />
          <div className='mt-[60px]'>{renderLoginStep(currentStep)}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
