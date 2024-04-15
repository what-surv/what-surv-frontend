import React, { useEffect, useState } from 'react';

import { axiosBaseUrl } from '../../api/axiosConfig';
import { requestLogout, requestNickName } from '../../api/loginApis';
import { profileTypes } from '../../api/Posttypes';
import { userCheckApi } from '../../api/userCheckApi';
import userProfile from '../../assets/ic-user.svg';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import LoginAlertModal from '../../organisms/LoginAlertModal';
import LogoutAlertModal from '../../organisms/LogoutAlertModal';
import CompleteModal from '../../organisms/post/mypage/CompleteModal';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Textfield from '../../stories/textfield/Textfield';
import Typography from '../../stories/typography/Typography';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface Inputs {
  nickname: string;
  interest: string;
}

const Setting = () => {
  const { data: myData, isLoading } = useQuery<profileTypes>({
    queryKey: ['getProfile'],
    queryFn: () => axiosBaseUrl.get(`users/me`),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  // 저장하기 버튼 disabled 여부
  const [disableButton, setDisableButton] = useState(true);
  const [nicknameInputState, setNicknameInputState] = useState<
    'default' | 'error' | 'success'
  >('default');
  const [nickname, setNickname] = useState<string>(
    myData?.data.nickname as string
  );
  // modal 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // modal 확인 버튼 클릭 시 이벤트
  const modalButtonOnClick = () => {
    setIsModalOpen(false);
    navigate('/');
  };
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  // LogoutAlertModal을 제어하기 위한 상태
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  // 사용자 로그인 상태를 저장하기 위한 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (location.state?.quit) {
      setIsLoggedIn(false);
    } else {
      const fetchUserStatus = async () => {
        const userStatus = await userCheckApi();
        setIsLoggedIn(userStatus);
      };

      fetchUserStatus();
    }
  }, []);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const interest = watch('interest');

  useEffect(() => {
    if (nickname && nickname === myData?.data.nickname) {
      setDisableButton(true);
    } else if (
      nickname &&
      // nickname !== myData?.data.nickname &&
      nicknameInputState === 'success'
    ) {
      setDisableButton(false);
    }
  }, [nicknameInputState, myData, nickname]);

  useEffect(() => {
    if (myData?.data.areaOfInterest !== interest) {
      setDisableButton(false);
    } else if (myData?.data.areaOfInterest === interest) {
      setDisableButton(true);
    }
  }, [interest, myData]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 10);
    setNickname(value);
    setNicknameInputState('default');
  };

  const onSubmit = (data: Inputs) => {
    updateMyPage.mutate(data);
  };

  const updateMyPage = useMutation<void, unknown, Inputs>({
    mutationFn: (inputs) =>
      axiosBaseUrl.patch(`/users/me`, {
        nickname,
        areaOfInterest: inputs.interest,
      }),
    onSuccess: () => {
      setIsModalOpen(true);
      queryClient.invalidateQueries({
        queryKey: ['getProfile'],
      });
    },
    onError: () => {
      console.error('에러 발생');
    },
  });

  const requestNickNameOnClick = async () => {
    const isValidInput = (text: string) => {
      const regex = /^[a-zA-Z가-힣]{2,10}$/;
      return regex.test(text);
    };
    // 정규식 체크
    if (!isValidInput(nickname)) {
      setNicknameInputState('error');
      return null;
    }

    const response = await requestNickName(nickname);
    if (response === false) {
      setNicknameInputState('success');
      setNickname(nickname);
    } else {
      setNicknameInputState('error');
    }
    return undefined;
  };

  if (isLoading || !myData) {
    return null;
  }
  const birthDate = myData.data.birthDate
    ? new Date(myData.data.birthDate)
    : null;
  const formattedBirthDate = birthDate
    ? birthDate.toISOString().split('T')[0]
    : '';
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Appbar
            isAccount
            isLogo
            isFullLogo
            logout={() => {
              setShowLogoutAlert(true);
            }}
          />
        </div>
      ) : (
        <Appbar isLogo isFullLogo isLogin />
      )}
      <Tabbar isMobileVisible />

      <div className='max-w-[342px] md:max-w-[354px] lg:max-w-[506px] w-full mt-[50px] m-auto'>
        {/* 프로필 및 닉네임 */}
        <div className='mb-6 text-center'>
          <img
            src={userProfile}
            alt='유저 프로필 이미지'
            className='inline-block mb-[10px]'
          />
          <Typography
            text={`${myData.data.nickname} 님`}
            size='xl'
            weight='Bold'
            className='block'
          />
        </div>
        {/* // 프로필 및 닉네임 */}

        {/* 유저 기본정보 */}
        <div className='flex gap-4 overflow-x-auto mb-9'>
          <dl className='flex-shrink-0 min-w-[80px]'>
            <dt>
              <Typography text='로그인 아이디' size='base' weight='Medium' />
            </dt>
            <dd className='mt-2 px-4 py-[6px] bg-[#E5E7ED] rounded-lg'>
              <Typography
                text={`${myData.data.email}`}
                size='sm'
                weight='Semibold'
                className='text-[#545760]'
              />
            </dd>
          </dl>
          <dl className='flex-shrink-0 min-w-[80px]'>
            <dt>
              <Typography text='생일' size='base' weight='Medium' />
            </dt>
            <dd className='mt-2 px-4 py-[6px] bg-[#E5E7ED] rounded-lg'>
              <Typography
                text={formattedBirthDate || ''}
                size='sm'
                weight='Semibold'
                className='text-[#545760]'
              />
            </dd>
          </dl>
          <dl className='flex-shrink-0 min-w-[15px]'>
            <dt>
              <Typography text='성별' size='base' weight='Medium' />
            </dt>
            <dd className='mt-2 px-4 py-[6px] bg-[#E5E7ED] rounded-lg'>
              <Typography
                text={myData.data.gender === 'male' ? '남성' : '여성'}
                size='sm'
                weight='Semibold'
                className='text-[#545760]'
              />
            </dd>
          </dl>
        </div>
        {/* // 유저 기본정보 */}

        {/* 수정 인풋들 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col mb-9'>
            {/* <div className='flex flex-col items-start w-full gap-2'>
              <Typography
                size='base'
                weight='Medium'
                text='닉네임'
                className='text-[#242424]'
              />
              <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#808490] bg-[#FAFAFA]'>
                <Input
                  placeholder='닉네임을 입력해주세요.'
                  className='flex-1 bg-inherit text-base placeholder:text-[#545760] placeholder:font-semibold normal font-pretendard font-semibold outline-none leading-[26px]'
                  defaultValue={myData.data.nickname || ''}
                  {...register('nickname', {
                    required: '닉네임을 입력해주세요.',
                    pattern: {
                      value:
                        /^[a-zA-Z가-힣]*[ㄱ-ㅎㅏ-ㅣ]*[가-힣a-zA-Z]+[a-zA-Z가-힣]*$/,
                      message:
                        '닉네임은 한글 또는 영어만 사용 가능하며, 조합된 문자만 허용됩니다.',
                    },

                    onChange: handleNicknameChange,
                    maxLength: {
                      value: 10,
                      message: '닉네임은 10글자 이하로 작성해 주세요.',
                    },
                  })}
                />

                <Typography
                  size='xs'
                  text={`${nicknameLength}/10`}
                  weight='Regular'
                  className='text-[#818490]'
                />
              </div>
              {errors.nickname && <span>{errors.nickname.message}</span>}
            </div> */}
            <div className='flex flex-col w-full gap-2'>
              <div className='flex gap-1'>
                <Typography
                  size='base'
                  weight='Medium'
                  text='닉네임'
                  className='text-[#242424]'
                />
                <Typography
                  size='base'
                  weight='Medium'
                  text='*'
                  className='text-red-500'
                />
              </div>
              <Textfield
                type='button'
                onClick={requestNickNameOnClick}
                onChange={handleNicknameChange}
                state={nicknameInputState}
                placeholder='김왓섭'
                value={nickname}
                defaultValue={myData.data.nickname}
              />
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
              <Typography
                size='base'
                weight='Medium'
                text='관심분야'
                className='text-[#242424]'
              />
              <div className='w-full text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#808490] bg-[#FAFAFA]'>
                <Input
                  type='text'
                  id='interest'
                  defaultValue={myData.data.areaOfInterest}
                  placeholder='관심있는 분야 또는 도메인 등을 입력해보세요!'
                  {...register('interest', {
                    required: '관심분야를 입력해주세요.',
                    maxLength: {
                      value: 50,
                      message: '50자 이내로 입력해주세요.',
                    },
                  })}
                  className='flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
                />
              </div>
              {errors.interest && <span>{errors.interest.message}</span>}
            </div>
          </div>

          {/* // 수정 인풋들 */}

          <div className='flex flex-col gap-6'>
            <Button
              type='submit'
              className={`flex w-full items-center justify-center h-12 ${disableButton ? `bg-[#A6AAB2]` : `bg-[#0051FF]`} rounded-[400px]`}
              aria-label='저장하기'
              disabled={disableButton}
            >
              <Typography
                text='저장하기'
                size='base'
                weight='Medium'
                className='text-[#FFFFFF]'
              />
            </Button>

            <Link to='/withdrawal' className='text-center text-[#808490]'>
              회원 탈퇴
            </Link>
          </div>
        </form>
      </div>
      <CompleteModal
        title='프로필 저장이 완료되었습니다!'
        content='홈으로 이동해서 리서치에 참여해보세요!'
        buttonText='확인'
        isOpen={isModalOpen}
        onClick={modalButtonOnClick}
      />
      <LoginAlertModal
        isOpen={showLoginAlert}
        handleClose={() => setShowLoginAlert(false)}
        goLogin={() => {
          navigate('/login');
        }}
      />
      <LogoutAlertModal
        isOpen={showLogoutAlert}
        handleClose={() => setShowLogoutAlert(false)}
        goLogout={async () => {
          await requestLogout();
          setIsLoggedIn(false);
          setShowLogoutAlert(false);
          navigate('/');
        }}
      />
    </div>
  );
};

export default Setting;
