import React, { useEffect, useState } from 'react';

import style from './login.module.css';
import SelectToggleButton from '../../atoms/login/SelectToggleButton';
import { useUserInfoStore } from '../../store/store';
import icPrev from '../../stories/assets/ic-prev.svg';
import Textfield from '../../stories/textfield/Textfield';
import Typography from '../../stories/typography/Typography';

export interface JobSelectsPageProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

interface OptionProps {
  id: number;
  label: string;
  selected: boolean;
}

const initOptions = [
  {
    id: 0,
    label: 'PM/PO',
    selected: false,
  },
  { id: 1, label: '기획', selected: false },
  { id: 2, label: 'UX디자인', selected: false },
  {
    id: 3,
    label: 'UI디자인',
    selected: false,
  },
  { id: 4, label: '데이터', selected: false },
  { id: 5, label: '마케팅', selected: false },
  { id: 6, label: '프론트엔드', selected: false },
  { id: 7, label: '백엔드', selected: false },
  { id: 8, label: '해당하는 직종이 없어요ㅠ 추가해주세요!', selected: false },
];
const JobSelectsPage = ({ onNextStep, onPrevStep }: JobSelectsPageProps) => {
  const [options, setOptions] = useState<OptionProps[]>(initOptions);
  const { job, setJob } = useUserInfoStore();

  useEffect(() => {
    if (job) {
      // job과 일치하는 옵션을 찾습니다.
      const matchedOption = options.find((option) => option.label === job);
      if (matchedOption) {
        // 옵션을 선택된 상태로 업데이트합니다.
        setOptions((prevOptions) =>
          prevOptions.map((option) =>
            option.id === matchedOption.id
              ? { ...option, selected: true }
              : { ...option, selected: false }
          )
        );
      } else {
        // id가 8인 옵션의 selected를 true로 설정합니다.
        setOptions((prevOptions) =>
          prevOptions.map((option) =>
            option.id === 8 ? { ...option, selected: true } : option
          )
        );
      }
    }
  }, []);

  const handleSelect = (id: number) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id
          ? { ...option, selected: true }
          : { ...option, selected: false }
      )
    );

    const selectedOption = options.find((option) => option.id === id);
    if (selectedOption) {
      if (selectedOption.id !== 8) {
        setJob(selectedOption.label);
      }
    }
  };

  const onClick = async () => {
    onNextStep();
  };

  const etcOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setJob(value);
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
          text='어떤 일을 하고 계신가요?'
          size='base'
          weight='Medium'
        />
      </div>
      <div className='flex flex-col gap-[10px]'>
        {options.map((option) => (
          <SelectToggleButton
            key={option.id}
            label={option.label}
            isSelected={option.selected}
            onClick={() => handleSelect(option.id)}
          />
        ))}
        {options[8].selected && (
          <div className='flex flex-col gap-3 mt-[26px]'>
            <p>
              <Typography
                text='빠르게 다음 업데이트에 반영할게요!'
                size='base'
                weight='Medium'
              />
            </p>
            <Textfield
              onChange={etcOnChange}
              placeholder='어떤 일을 하고계신지 알려주세요 :)'
              value={job}
              type='default'
            />
          </div>
        )}
      </div>
      <button
        type='button'
        className={style['basic-btn']}
        onClick={onClick}
        disabled={job === ''}
      >
        다음
      </button>
    </div>
  );
};

export default JobSelectsPage;
