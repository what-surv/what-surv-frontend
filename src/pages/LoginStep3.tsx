import React, { useState } from 'react';
import ic_text_field_fail from '../stories/assets/ic_text_field_fail.svg';
import ic_text_field_success from '../stories/assets/ic_text_field_success.svg';
import style from './login.module.css';
import { Button } from '../stories/button/Button';

const LoginStep3 = ({ onNextStep, onChange, onClick, value }) => {
  const [result, setResult] = useState(null);
  const handleButtonClick = () => {
    const result = onClick();
    setResult(result);
  };

  return (
    <div>
      <p className='text-lg font-bold mb-[24px]'>
        서비스명 에서 어떻게 불러드릴까요?
      </p>
      <p className='mb-[12px] font-semibold '>닉네임을 입력해주세요!</p>
      <div className='flex'>
        <div
          className={`${style['text-filed-wrap']} ${result ? style.success : style.fail}`}
        >
          <input
            type='text'
            className={style['text-filed']}
            onChange={onChange}
            value={value}
          />

          <img className='block' src={ic_text_field_success} alt='성공아이콘' />
          <img className='' src={ic_text_field_fail} alt='실패아이콘' />
        </div>
        <button className={`${style['btn-small']}`} onClick={handleButtonClick}>
          중복확인
        </button>
      </div>
      <p
        className={`${style[`text-filed-txt`]} ${result ? style.success : style.fail} mt-1.5 text-xs`}
      >
        {result
          ? '사용 가능한 닉네임입니다!'
          : '사용하실 수 없는 닉네임 입니다!'}
      </p>
      {/* <Button size='default' state='contained' onClick={onNextStep}>
        로그인하기
      </Button> */}
    </div>
  );
};

export default LoginStep3;
