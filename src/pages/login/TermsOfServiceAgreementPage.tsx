import React from 'react';

import style from './login.module.css';
import { useUserInfoStore } from '../../store/store';
import icPrev from '../../stories/assets/ic-prev.svg';
import Typography from '../../stories/typography/Typography';

export interface TermsOfServiceAgreementPageProps {
  onNextStep: () => void;
  onPrevStep: () => void;
  checkboxStates: {
    id: string;
    checked: boolean;
    href: string;
    label: string;
  }[];
  handleAllCheckboxChange: () => void;
  handleCheckboxChange: (id: string) => void;
  isAllChecked: boolean;
}

const TermsOfServiceAgreementPage = ({
  onNextStep,
  onPrevStep,
  handleAllCheckboxChange,
  handleCheckboxChange,
  checkboxStates,
  isAllChecked,
}: TermsOfServiceAgreementPageProps) => {
  const { setAdvertisingConsent } = useUserInfoStore();

  const onClick = () => {
    if (checkboxStates[2].checked) {
      setAdvertisingConsent(true);
    } else {
      setAdvertisingConsent(false);
    }
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
      <div className='mb-6'>
        <Typography
          text='서비스명에 오신 것을 환영하니다!'
          size='lg'
          weight='Bold'
        />
      </div>

      <div className={style['checkbox-wrap']}>
        <label htmlFor='all' className={isAllChecked ? style.on : ''}>
          <input
            id='all'
            type='checkbox'
            checked={isAllChecked}
            onChange={handleAllCheckboxChange}
          />
          <span>전체 동의하기</span>
        </label>
      </div>
      {checkboxStates.map((params) => {
        const { id, href, label } = params;

        return (
          <div key={id} className={style['checkbox-wrap']}>
            <label
              htmlFor={id}
              className={checkboxStates[Number(id)].checked ? style.on : ''}
            >
              <input
                id={id}
                type='checkbox'
                checked={checkboxStates[Number(id)].checked}
                onChange={() => handleCheckboxChange(id)}
              />
              <span>{label}</span>
            </label>
            <a href={href} target='_blank' rel='noreferrer'>
              보기
            </a>
          </div>
        );
      })}

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

export default TermsOfServiceAgreementPage;
