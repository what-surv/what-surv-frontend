import React, { useEffect, useState } from 'react';

import style from './login.module.css';
import { requestNickName, userRegistration } from '../../api/loginApis';
import { useUserInfoStore } from '../../store/store';
import icPrev from '../../stories/assets/ic-prev.svg';
import Textfield from '../../stories/textfield/Textfield';
import { convertToYYYYMMDD } from '../../utils/dateUtils';

import { useNavigate } from 'react-router-dom';

export interface WriteNickNamePageProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

const WriteNickNamePage = ({
  onNextStep,
  onPrevStep,
}: WriteNickNamePageProps) => {
  const {
    nickname,
    phone,
    gender,
    advertisingConsent,
    birthDate,
    job,
    setNickName,
  } = useUserInfoStore();
  const [nicknameBoolean, setNickNameBoolean] = useState<
    'default' | 'error' | 'success'
  >('default');
  const [nickNameValue, setNickNameValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (nickNameValue === '' && nickname) {
      setNickNameValue(nickname);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickNameValue(value);

    setNickNameBoolean('default');
  };

  const isValidInput = (text: string) => {
    const regex = /^[a-zA-Z가-힣]{2,10}$/;
    return regex.test(text);
  };

  const requestNickNameOnClick = async () => {
    // 정규식 체크
    if (!isValidInput(nickNameValue)) {
      setNickNameBoolean('error');
      return null;
    }

    const response = await requestNickName(nickNameValue);
    if (response === false) {
      setNickNameBoolean(response);
      setNickName(nickNameValue);
    } else {
      setNickNameBoolean('error');
    }
    return undefined;
  };

  const nextButtonClick = async () => {
    const params = {
      nickname: nickname || '',
      phone,
      gender,
      advertisingConsent,
      birthDate: convertToYYYYMMDD(birthDate),
      job,
    };

    try {
      userRegistration(params, onNextStep);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        type='button'
        onClick={onPrevStep}
        className=' flex w-6 h-6 mb-10 justify-center items-center cursor-pointer'
      >
        <img src={icPrev} alt='뒤로가는 이미지' className='block wd-1' />
      </button>
      <p className='text-lg font-bold mb-[24px]'>
        서비스명 에서 어떻게 불러드릴까요?
      </p>
      <p className='mb-[12px] font-semibold '>닉네임을 입력해주세요!</p>

      <Textfield
        onChange={onChange}
        value={nickNameValue}
        state={nicknameBoolean}
        onClick={requestNickNameOnClick}
        type='button'
        placeholder='김왓섭'
      />

      <button
        type='button'
        disabled={
          nickname === undefined ||
          nicknameBoolean === 'error' ||
          nicknameBoolean === 'default'
        }
        className={style['basic-btn']}
        onClick={nextButtonClick}
      >
        다음
      </button>
    </div>
  );
};

export default WriteNickNamePage;
