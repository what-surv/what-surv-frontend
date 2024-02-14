import React, { useState, useEffect } from 'react';

import style from './login.module.css';
import icPrev from '../stories/assets/ic-prev.svg';

export interface LoginStep2Props {
  onNextStep: () => void;
  userInfo: (param: { sort: string; data: string }) => void;
  onPrevStep: () => void;
  checkboxStates: {
    '0': { checked: boolean; href: string };
    '1': { checked: boolean; href: string };
    '2': { checked: boolean; href: string };
  };
  setCheckboxStates: React.Dispatch<
    React.SetStateAction<{
      '0': { checked: boolean; href: string };
      '1': { checked: boolean; href: string };
      '2': { checked: boolean; href: string };
    }>
  >;
}

const LoginStep2 = ({
  onNextStep,
  userInfo,
  onPrevStep,
  checkboxStates,
  setCheckboxStates,
}: LoginStep2Props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(
      Object.values(checkboxStates).every((checkbox) => checkbox.checked)
    );
  }, [checkboxStates]);

  const onClick = () => {
    if (!checkboxStates['0'].checked || !checkboxStates['1'].checked) {
      alert('필수항목을 모두 선택해 주세요!');
    } else {
      if (checkboxStates['2'].checked) {
        userInfo({ sort: 'check', data: String(checkboxStates['2'].checked) });
      }
      onNextStep();
    }
  };

  const handleCheckboxChange = (checkboxId: '0' | '1' | '2') => {
    setCheckboxStates((prevStates) => {
      const updatedStates = {
        ...prevStates,
        [checkboxId]: {
          ...prevStates[checkboxId as keyof typeof prevStates],
          checked: !prevStates[checkboxId as keyof typeof prevStates]?.checked,
        },
      };
      return updatedStates;
    });
  };

  const handleAllCheckboxChange = () => {
    const allChecked = !isChecked;
    setIsChecked(allChecked);

    setCheckboxStates((prevStates) => {
      const updatedStates = Object.keys(prevStates).reduce(
        (states, key) => {
          return {
            ...states,
            [key as keyof typeof prevStates]: {
              ...prevStates[key as keyof typeof prevStates],
              checked: allChecked,
            },
          };
        },
        {} as typeof prevStates
      );

      return updatedStates;
    });
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
      <p className='text-lg font-bold mb-[24px]'>서비스 이용약관 동의</p>
      <div className={style['checkbox-wrap']}>
        <label htmlFor='all' className={isChecked ? style.on : ''}>
          <input
            id='all'
            type='checkbox'
            checked={isChecked}
            onChange={handleAllCheckboxChange}
          />
          <span>전체 동의하기</span>
        </label>
      </div>

      {['0', '1', '2'].map((checkboxId) => (
        <div key={checkboxId} className={style['checkbox-wrap']}>
          <label
            htmlFor={checkboxId}
            className={
              checkboxStates[checkboxId as '0' | '1' | '2'].checked
                ? style.on
                : ''
            }
          >
            <input
              id={checkboxId}
              type='checkbox'
              checked={checkboxStates[checkboxId as '0' | '1' | '2'].checked}
              onChange={() =>
                handleCheckboxChange(checkboxId as '0' | '1' | '2')
              }
            />
            <span>{getCheckboxLabel(checkboxId as '0' | '1' | '2')}</span>
          </label>
          <a
            href={checkboxStates[checkboxId as '0' | '1' | '2'].href}
            target='_blank'
            rel='noreferrer'
          >
            보기
          </a>
        </div>
      ))}
      <button
        type='button'
        className={style['basic-btn']}
        disabled={!checkboxStates['0'].checked || !checkboxStates['1'].checked}
        onClick={onClick}
      >
        다음
      </button>
    </div>
  );
};

const getCheckboxLabel = (checkboxId: '0' | '1' | '2') => {
  const labels = {
    '0': '[필수]  서비스 이용약관',
    '1': '[필수]  개인정보 처리방침 및 수집이용 동의',
    '2': '[선택]  마케팅 정보 수신 및 이용 동의',
  };
  return labels[checkboxId] || '';
};

export default LoginStep2;
