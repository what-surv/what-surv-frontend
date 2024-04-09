import { useEffect, useState } from 'react';

import JobSelectsPage from './JobSelectsPage';
import LastPage from './LastPage';
import SocailButtonsPage from './SocailButtonsPage';
import TermsOfServiceAgreementPage from './TermsOfServiceAgreementPage';
import UserInformationsPage from './UserInformationsPage';
import WriteNickNamePage from './WriteNickNamePage';
import { checkAuth } from '../../api/loginApis';
import { Appbar } from '../../stories/appbar/Appbar';
import icPrev from '../../stories/assets/ic-prev.svg';
import { ProgressBar } from '../../stories/indicator/progress bar/ProgressBar';
import Typography from '../../stories/typography/Typography';

import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkboxStates, setCheckboxStates] = useState([
    {
      id: '0',
      checked: false,
      href: '/termsOfService',
      label: '[필수]  서비스 이용약관',
    },
    {
      id: '1',
      checked: false,
      href: '/privacyPolicy',
      label: '[필수]  개인정보 처리방침 및 수집이용 동의',
    },
    {
      id: '2',
      checked: false,
      href: '/marketingConsent',
      label: '[선택]  마케팅 정보 수신 및 이용 동의',
    },
  ]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  // Ouath2 링크별 분기처리
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // location을 통해서 url별 분기처리
    const { pathname } = location;
    switch (pathname) {
      // 신규유저
      case '/login/new-user':
        checkAuth('new-user/profile', nextStepHandler);
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

  useEffect(() => {
    // 모든 체크박스가 체크되었는지 확인, 필수 및 선택을 모두 포함
    const allChecked = checkboxStates.every((checkbox) => checkbox.checked);

    // '전체 동의하기' 체크박스 상태를 업데이트
    setIsAllChecked(allChecked);
  }, [checkboxStates]);

  const nextStepHandler = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStepHandler = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAllCheckboxChange = () => {
    const allChecked = !isAllChecked;
    setIsAllChecked(allChecked);

    setCheckboxStates((prevStates) => {
      const updatedStates = prevStates.map((checkbox) => ({
        ...checkbox,
        checked: allChecked,
      }));
      return updatedStates;
    });
  };

  const handleCheckboxChange = (id: string) => {
    setCheckboxStates((prevStates) => {
      const updatedStates = prevStates.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      );
      return updatedStates;
    });
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
        return <SocailButtonsPage handleLogin={loginHandler} />;
      case 2:
        return (
          <TermsOfServiceAgreementPage
            onNextStep={nextStepHandler}
            checkboxStates={checkboxStates}
            handleCheckboxChange={handleCheckboxChange}
            handleAllCheckboxChange={handleAllCheckboxChange}
            isAllChecked={isAllChecked}
          />
        );
      case 3:
        return <UserInformationsPage onNextStep={nextStepHandler} />;
      case 4:
        return <JobSelectsPage onNextStep={nextStepHandler} />;
      case 5:
        return <WriteNickNamePage onNextStep={nextStepHandler} />;
      case 6:
        return <LastPage />;
      default:
        return null;
    }
  };

  return (
    <div>
      {currentStep === 1 ? (
        <Appbar isLogo isFullLogo />
      ) : (
        <Appbar isArrow isLogo onArrowClick={() => prevStepHandler()}>
          <Typography size='lg' weight='Semibold' text='회원가입' />
        </Appbar>
      )}

      <div className='px-6'>
        <div className='max-w-[546px] w-full m-auto'>
          <div className='flex flex-col items-center mt-[60px]'>
            <div className='flex flex-col w-full max-w-xl'>
              <ProgressBar
                size='desktop'
                percent={currentStep * 16.66666666666667}
              />
              <div className='mt-[60px]'>
                {currentStep !== 1 && (
                  <button
                    type='button'
                    onClick={prevStepHandler}
                    className='hidden md:flex w-6 h-6 mb-10 justify-center items-center cursor-pointer'
                  >
                    <img
                      src={icPrev}
                      alt='뒤로가는 이미지'
                      className='block wd-1'
                    />
                  </button>
                )}
              </div>
              <div>{renderLoginStep(currentStep)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
