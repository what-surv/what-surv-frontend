import React, { useEffect, useState } from 'react';

import style from './login.module.css';
import { requestNickName } from '../../api/loginApis';
import { useUserInfoStore } from '../../store/store';
import icPrev from '../../stories/assets/ic-prev.svg';
import icTextFieldFail from '../../stories/assets/ic-text-field-fail.svg';
import icTextFieldSuccess from '../../stories/assets/ic-text-field-success.svg';

export interface WriteNickNamePageProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

const WriteNickNamePage = ({
  onNextStep,
  onPrevStep,
}: WriteNickNamePageProps) => {
  const { nickname, setNickName } = useUserInfoStore();
  const [nicknameBoolean, setNickNameBoolean] = useState<boolean | undefined>(
    undefined
  );
  const [nickNameValue, setNickNameValue] = useState('');

  useEffect(() => {
    if (nickNameValue === '' && nickname) {
      setNickNameValue(nickname);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickNameValue(value);

    setNickNameBoolean(undefined);
  };

  const isValidInput = (text: string) => {
    const regex = /^[a-zA-Z가-힣]{2,10}$/;
    return regex.test(text);
  };

  const requestNickNameOnClick = async () => {
    // 정규식 체크
    if (!isValidInput(nickNameValue)) {
      setNickNameBoolean(true);
      return false;
    }

    const response = await requestNickName(nickNameValue);
    if (response === false) {
      setNickNameBoolean(response);
      setNickName(nickNameValue);
    } else {
      setNickNameBoolean(true);
    }
    return undefined;
  };

  const nextButtonClick = async () => {
    onNextStep();
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
      <div className='flex'>
        <div
          className={`${style['text-filed-wrap']} ${(nicknameBoolean !== undefined && (nicknameBoolean ? style.fail : style.success)) || style.fail}`}
        >
          <input
            type='text'
            className={style['text-filed']}
            onChange={onChange}
            value={nickNameValue}
          />

          <img
            className={style['ic-success']}
            src={icTextFieldSuccess}
            alt='성공아이콘'
          />

          <img
            className={style['ic-fail']}
            src={icTextFieldFail}
            alt='실패아이콘'
          />
        </div>
        <button
          type='button'
          className={`${style['btn-small']}`}
          onClick={requestNickNameOnClick}
        >
          중복확인
        </button>
      </div>
      {nickname !== undefined && (
        <p
          className={`${style[`text-filed-txt`]} ${style['text-filed-txt']} ${(nicknameBoolean !== undefined && (nicknameBoolean ? style.fail : style.success)) || style.fail} mt-1.5 text-xs`}
        >
          {nicknameBoolean !== undefined &&
            (nicknameBoolean
              ? '사용하실 수 없는 닉네임 입니다!'
              : '사용 가능한 닉네임입니다!')}
          {nicknameBoolean === undefined && '중복 확인을 눌러주세요'}
        </p>
      )}

      <button
        type='button'
        disabled={
          nickname === undefined ||
          nicknameBoolean === true ||
          nicknameBoolean === undefined
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
