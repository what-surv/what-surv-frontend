import React, { useState } from 'react';

import icTextFieldFail from '../assets/ic-text-field-fail.svg';
import icTextFieldSuccess from '../assets/ic-text-field-success.svg';
import Typography from '../typography/Typography';

interface TextFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  value: string;
  state: 'default' | 'error' | 'success';
}

const Textfield = ({ onChange, onClick, value, state }: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  return (
    <div>
      <label htmlFor='0' className='flex w-full h-[46px]'>
        <div
          className={`relative ${isFocused ? 'w-[calc(100%-92px)]' : 'w-full'} h-full transition-all duration-300 ease-in-out`}
        >
          <input
            id='0'
            type='text'
            className={`block w-full h-full px-5 border rounded-xl ${(state === 'default' && 'border-[#0051FF]') || (state === 'error' && 'border-[#EB271C]') || 'border-[#6697FF]'} focus:border-[#000AFF] active:border-[#0051FF] focus:outline-none`}
            onChange={onChange}
            value={value}
            placeholder='김왓섭'
            onFocus={handleFocus}
          />

          {state !== 'default' && (
            <div className='w-[15px] h-[15px] absolute top-1/2 right-5 -translate-y-1/2'>
              <img
                className={`absolute w-full top-0 left-0 ${(state === 'success' && 'scale-1') || 'scale-0'} transition-all duration-200 ease-in-out`}
                src={icTextFieldSuccess}
                alt='성공아이콘'
              />

              <img
                className={`absolute w-full top-0 left-0 ${(state === 'error' && 'scale-1') || 'scale-0'} transition-all duration-200 ease-in-out`}
                src={icTextFieldFail}
                alt='실패아이콘'
              />
            </div>
          )}
        </div>
        <button
          type='button'
          className={`${isFocused ? 'flex' : 'hidden'} w-[84px] h-[46px] ml-3 ${state === 'error' ? 'bg-[#A6AAB2]' : 'bg-[#0051FF]'} text-[#FFFFFF] rounded-[12px] justify-center items-center`}
          onClick={onClick}
          disabled={state === 'error'}
        >
          중복확인
        </button>
      </label>
      <div className='min-h-[24px]'>
        {state !== 'default' &&
          (state ? (
            <Typography
              text='사용할 수 없는 닉네임 입니다!'
              size='xs'
              weight='Regular'
              className='text-[#EB271C]'
            />
          ) : (
            <Typography
              text='사용할 수 있는 닉네임 입니다!'
              size='xs'
              weight='Regular'
              className='text-[#0051FF]'
            />
          ))}
      </div>
    </div>
  );
};

export default Textfield;
