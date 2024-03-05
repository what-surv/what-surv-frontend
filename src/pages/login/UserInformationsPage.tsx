import React, { useRef, useState } from 'react';

import style from './login.module.css';
import { userRegistration } from '../../api/loginApis';
import { useUserInfoStore } from '../../store/store';
import icPrev from '../../stories/assets/ic-prev.svg';
import BirthDayWriteInput from '../../stories/loginpages/birthdayWrite/BirthDayWriteInput';
import GenderButton from '../../stories/loginpages/genderButton/GenderButton';
import Typography from '../../stories/typography/Typography';
import { convertToYYYYMMDD } from '../../utils/dateUtils';

export interface UserInformationsPageProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}
const UserInformationsPage = ({
  onNextStep,
  onPrevStep,
}: UserInformationsPageProps) => {
  const [birthday, setBirthday] = useState([
    { id: '0', value: '', state: false },
    { id: '1', value: '', state: false },
    { id: '2', value: '', state: false },
    { id: '3', value: '', state: false },
    { id: '4', value: '', state: false },
    { id: '5', value: '', state: false },
  ]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

  const {
    nickname,
    phone,
    gender,
    advertisingConsent,
    birthDate,
    setGender,
    setbirthDate,
  } = useUserInfoStore();
  const [selectedGender, setSelectedGender] = useState({
    female: { gender: 'female', clicked: false },
    male: { gender: 'male', clicked: false },
  });
  const onChange = (index: number, value: string) => {
    const newBirthday = [...birthday];
    if (value.length === 1) {
      newBirthday[index] = { id: index.toString(), value, state: true };
    } else {
      newBirthday[index].value = value.substring(1);
    }
    setBirthday(newBirthday);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const updatedBirthDayResult = newBirthday
      .map((param) => param.value)
      .join('');
    setbirthDate(updatedBirthDayResult);
  };

  const onGenderClick = (genders: 'male' | 'female') => {
    setSelectedGender((prev) => ({
      ...prev,
      [genders]: { ...prev[genders], clicked: true },
      [genders === 'male' ? 'female' : 'male']: {
        ...prev[genders === 'male' ? 'female' : 'male'],
        clicked: false,
      },
    }));
    setGender(genders);
  };

  const exceptionHandler = () => {
    if (birthDate.length !== 6) {
      alert('생일을 입력해 주세요!');
      return;
    }

    if (gender === undefined) {
      alert('성별을 선택해 주세요');
      return;
    }
  };
  const onClick = async () => {
    exceptionHandler();

    const params = {
      nickname,
      phone,
      gender,
      advertisingConsent,
      birthDate: convertToYYYYMMDD(birthDate),
    };

    try {
      userRegistration(params, onNextStep);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='max-w-[504px] w-full m-auto'>
      <button
        type='button'
        onClick={onPrevStep}
        className=' flex w-6 h-6 mb-10 justify-center items-center cursor-pointer'
      >
        <img src={icPrev} alt='뒤로가는 이미지' className='block wd-1' />
      </button>
      <div className='mb-6'>
        <Typography
          text='회원님에 대해 알려주세요!'
          size='lg'
          weight='Semibold'
        />
      </div>
      <div className='mb-6'>
        <Typography
          text='생년월일 6자리를 입력해 주세요'
          size='base'
          weight='Medium'
        />
      </div>
      <div className='px-[15px] mb-9'>
        <div>
          <div className='flex justify-center items-center max-w-[342px] w-full h-[75px] m-auto px-6 gap-[6px] bg-[#D7DBE2] rounded-lg'>
            {birthday.map(({ id, value, state }, index) => (
              <BirthDayWriteInput
                key={id}
                id={id}
                onChange={(e) => onChange(index, e.target.value)}
                value={value}
                ref={(el) => (inputRefs.current[index] = el)}
                onFocus={(e) => e.preventDefault()}
                state={state}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <Typography text='성별을 선택해주세요!' size='base' weight='Medium' />
      </div>
      <div className='flex gap-2'>
        <GenderButton
          onClick={() => onGenderClick('male')}
          state={selectedGender.male.clicked}
          text='남성'
        />
        <GenderButton
          onClick={() => onGenderClick('female')}
          state={selectedGender.female.clicked}
          text='여성'
        />
      </div>
      <button type='button' className={style['basic-btn']} onClick={onClick}>
        다음
      </button>
    </div>
  );
};

export default UserInformationsPage;
