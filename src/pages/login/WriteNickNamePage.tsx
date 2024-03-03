import React from 'react';

import style from './login.module.css';
import icPrev from '../../stories/assets/ic-prev.svg';
import icTextFieldFail from '../../stories/assets/ic-text-field-fail.svg';
import icTextFieldSuccess from '../../stories/assets/ic-text-field-success.svg';

export interface LoginStep3Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  value: string;
  isButtonDisabled: null | boolean;
}

const LoginStep3 = ({
  onChange,
  onClick,
  onNextStep,
  onPrevStep,
  value,
  isButtonDisabled,
}: LoginStep3Props) => {
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
          className={`${style['text-filed-wrap']} ${isButtonDisabled != null && (isButtonDisabled ? style.success : style.fail)}`}
        >
          <input
            type='text'
            className={style['text-filed']}
            onChange={onChange}
            value={value}
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
          onClick={onClick}
        >
          중복확인
        </button>
      </div>
      <p
        className={`${style[`text-filed-txt`]} ${isButtonDisabled ? style.success : style.fail} mt-1.5 text-xs`}
      >
        {isButtonDisabled !== null &&
          (isButtonDisabled
            ? '사용 가능한 닉네임입니다!'
            : '사용하실 수 없는 닉네임 입니다!')}
      </p>
      <button
        type='button'
        disabled={isButtonDisabled === null || isButtonDisabled === false}
        className={style['basic-btn']}
        onClick={onNextStep}
      >
        다음
      </button>
    </div>
  );
};

export default LoginStep3;
