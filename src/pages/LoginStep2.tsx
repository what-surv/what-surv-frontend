import React, { useState } from 'react';
import { Button } from '../stories/button/Button';
import style from './login.module.css';
import ic_prev from '../stories/assets/ic_prev.svg';

const LoginStep2 = ({ onNextStep, userInfo }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    '0': { checked: false, href: 'https://www.naver.com/' },
    '1': { checked: false, href: 'https://www.google.co.kr/' },
    '2': { checked: false, href: 'https://github.com/' },
  });

  const onClick = () => {
    if (!checkboxStates['0'].checked || !checkboxStates['1'].checked) {
      // '0' 또는 '1'이 체크되지 않았을 때
      alert('필수항목을 모두 선택해 주세요!');
    } else {
      if (checkboxStates['2'].checked) {
        userInfo({ sort: 'check', data: checkboxStates['2'].checked });
      }
      onNextStep();
    }
  };

  const handleCheckboxChange = (checkboxId) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [checkboxId]: {
        ...prevStates[checkboxId],
        checked: !prevStates[checkboxId].checked,
      },
    }));
  };

  const handleAllCheckboxChange = () => {
    const allChecked = !isChecked;
    setIsChecked(allChecked);

    setCheckboxStates((prevStates) => {
      const updatedStates = {};
      for (const key in prevStates) {
        updatedStates[key] = {
          ...prevStates[key],
          checked: allChecked,
          href: prevStates[key].href,
        };
      }
      return updatedStates;
    });
  };

  return (
    <div>
      <div className=' flex w-6 h-6 mb-10 justify-center items-center cursor-pointer'>
        <img src={ic_prev} alt='뒤로가는 이미지' className='block wd-1' />
      </div>
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
            className={checkboxStates[checkboxId].checked ? style.on : ''}
          >
            <input
              id={checkboxId}
              type='checkbox'
              checked={checkboxStates[checkboxId].checked}
              onChange={() => handleCheckboxChange(checkboxId)}
            />
            <span>{getCheckboxLabel(checkboxId)}</span>
          </label>
          <a href={checkboxStates[checkboxId].href} target='_blank'>
            보기
          </a>
        </div>
      ))}
      <Button size='default' state='contained' onClick={onClick}>
        로그인하기
      </Button>
    </div>
  );
};

// 각 체크박스에 대한 라벨을 가져오는 함수
const getCheckboxLabel = (checkboxId) => {
  const labels = {
    '0': '[필수]  서비스 이용약관',
    '1': '[필수]  개인정보 처리방침 및 수집이용 동의',
    '2': '[선택]  마케팅 정보 수신 및 이용 동의',
  };
  return labels[checkboxId] || '';
};

export default LoginStep2;
