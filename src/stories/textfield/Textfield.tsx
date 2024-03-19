import React, { useState } from 'react';

import icTextFieldFail from '../assets/ic-text-field-fail.svg';
import icTextFieldSuccess from '../assets/ic-text-field-success.svg';
import Typography from '../typography/Typography';

interface TextFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  value: string;
  placeholder: string;
  state?: 'default' | 'error' | 'success';
  type: 'default' | 'button';
}

const Textfield = ({
  onChange,
  onClick,
  placeholder,
  value,
  state,
  type,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  let widthClass;

  if (type === 'button') {
    widthClass = isFocused ? 'w-[calc(100%-92px)]' : 'w-full';
  } else {
    widthClass = 'w-full';
  }

  return (
    <div>
      <label htmlFor='0' className='flex w-full h-[46px]'>
        <div
          className={`relative ${widthClass} h-full transition-all duration-300 ease-in-out`}
        >
          <input
            id='0'
            type='text'
            className={`block w-full h-full px-5 border rounded-xl ${(state === 'default' && 'border-[#0051FF]') || (state === 'error' && 'border-[#EB271C]') || 'border-[#6697FF]'} focus:border-[#000AFF] active:border-[#0051FF] focus:outline-none transition-all duration-300 ease-in-out`}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            onFocus={handleFocus}
          />

          {state !== 'default' && (
            <div className='w-[15px] h-[15px] absolute top-1/2 right-5 -translate-y-1/2'>
              <img
                className={`absolute w-full top-0 left-0 ${(state === 'success' && 'scale-1') || 'scale-0'} transition-all duration-300 ease-in-out`}
                src={icTextFieldSuccess}
                alt='성공아이콘'
              />

              <img
                className={`absolute w-full top-0 left-0 ${(state === 'error' && 'scale-1') || 'scale-0'} transition-all duration-300 ease-in-out`}
                src={icTextFieldFail}
                alt='실패아이콘'
              />
            </div>
          )}
        </div>
        {type === 'button' && (
          <button
            type='button'
            className={`${isFocused ? 'flex' : 'hidden'} w-[84px] h-[46px] ml-3 ${state === 'error' ? 'bg-[#A6AAB2]' : 'bg-[#0051FF]'} text-[#FFFFFF] rounded-[12px] justify-center items-center duration-300 ease-in-out`}
            onClick={onClick}
            disabled={state === 'error'}
          >
            중복확인
          </button>
        )}
      </label>
      {type === 'button' && (
        <div className='min-h-[24px] duration-300 ease-in-out'>
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
      )}
    </div>
  );
};

export default Textfield;
