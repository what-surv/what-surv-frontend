import axios from 'axios';
import React, { useState } from 'react';

import LoginStep1 from './LoginStep1';
import LoginStep2 from './LoginStep2';
import LoginStep3 from './LoginStep3';
import LoginStep4 from './LoginStep4';
import { ProgressBar } from '../stories/indicator/progress bar/ProgressBar';

const Login = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    nickName: '',
    reservMarketing: false,
  });
  const [checkboxStates, setCheckboxStates] = useState({
    '0': { checked: false, href: 'https://www.naver.com/' },
    '1': { checked: false, href: 'https://www.google.co.kr/' },
    '2': { checked: false, href: 'https://github.com/' },
  });

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
          reservMarketing: data === 'true',
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

  const onClick = () => {
    if (isValidInput(userInfo.nickName) && userInfo.nickName !== '서범규') {
      return true;
    }
    return false;
  };

  const loginHandler = async () => {
    window.location.href = 'http:localhost:3000/auth/google';
    // try {
    //   const response = await axios.get(
    //     'http://your-backend.com/api/auth/status',
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   if (response.status === 200) {
    //     const { data } = response;
    //     if (data.isAuthenticated) {
    //       nextStepHandler();
    //     } else {
    //       // 회원정보가 있을때 메인가는 코드 넣어야함 현재 컴포넌트 없어서 주석으로 처리
    //     }
    //   }
    // } catch (error) {
    //   console.error('인증 상태 확인 중 오류 발생:', error);
    // }
  };

  const renderLoginStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <LoginStep1 onNextStep={nextStepHandler} handleLogin={loginHandler} />
        );
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
