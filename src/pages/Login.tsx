import React, { useEffect, useState } from 'react';

import axios from 'axios';
import LoginStep1 from './LoginStep1';
import LoginStep2 from './LoginStep2';
import LoginStep3 from './LoginStep3';
import LoginStep4 from './LoginStep4';
import style from './login.module.css';

const Login = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    nickName: '',
    reservMarketing: false,
  });

  // 회원가입 STEP 함수
  const nextStepHandler = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Step2~3 에서 사용하는 핸들러 userInfoState에 저장함
  const userInfoHandler = (param: object) => {
    const { sort, data } = param;
    switch (sort) {
      case 'check':
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          reservMarketing: data,
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

  // Step3 input에서 사용하는 onChange
  const onChange = (e) => {
    const { value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      nickName: value,
    }));
  };

  const isValidInput = (text) => {
    const regex = /^[a-zA-Z가-힣]{2,10}$/;
    return regex.test(text);
  };

  // Step3 닉네임 중복 확인 및 정규식
  const onClick = () => {
    if (isValidInput(userInfo.nickName) && userInfo.nickName !== '서범규') {
      return true;
    } else {
      return false;
    }
  };

  // Back-End에 로그인정보 요청
  const handleLogin = async () => {
    try {
      const response = await axios.get(
        'http://your-backend.com/api/auth/status',
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { data } = response;

        if (data.isAuthenticated) {
          nextStepHandler();
        } else {
          // 회원정보가 있을때 메인가는 코드 넣어야함 현재 컴포넌트 없어서 주석으로 처리
        }
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  // 자식 컴포넌트 렌더링해주는 함수
  const renderLoginStep = (step) => {
    switch (step) {
      case 1:
        return (
          <LoginStep1 onNextStep={nextStepHandler} handleLogin={handleLogin} />
        );
      case 2:
        return (
          <LoginStep2 onNextStep={nextStepHandler} userInfo={userInfoHandler} />
        );
      case 3:
        return (
          <LoginStep3
            onNextStep={nextStepHandler}
            onChange={onChange}
            onClick={onClick}
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
          <div className={style.progressBar}>
            <div style={{ width: `${currentStep * 25}%` }}></div>
          </div>
          {renderLoginStep(currentStep)}
        </div>
      </div>
    </div>
  );
};

export default Login;
