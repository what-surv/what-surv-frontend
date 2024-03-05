import React from 'react';

import icTextFieldFail from '../../stories/assets/ic-text-field-fail.svg';
import icTextFieldSuccess from '../../stories/assets/ic-text-field-success.svg';
import Typography from '../../stories/typography/Typography';

interface InputStyleProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: boolean | undefined;
  success: boolean;
}

const InputStyle = ({ onChange, value, error, success }: InputStyleProps) => {
  return (
    <label htmlFor='0' className='block w-full h-[46px]'>
      <div className='relative h-full'>
        <input
          id='0'
          type='text'
          className={`block w-full h-full px-5 border rounded-xl ${(success && 'border-[#0051FF]') || (error && 'border-[#EB271C]') || 'border-[#6697FF]'} focus:border-[#000AFF] active:border-[#0051FF] focus:outline-none`}
          onChange={onChange}
          value={value}
        />

        <div className='w-[15px] h-[15px] absolute top-1/2 right-5 -translate-y-1/2'>
          <img
            className={`absolute w-full top-0 left-0 ${(success && 'scale-1') || 'scale-0'} transition-all duration-200 ease-in-out`}
            src={icTextFieldSuccess}
            alt='성공아이콘'
          />

          <img
            className={`absolute w-full top-0 left-0 ${(error && 'scale-1') || 'scale-0'} transition-all duration-200 ease-in-out`}
            src={icTextFieldFail}
            alt='실패아이콘'
          />
        </div>
      </div>
      <Typography text='에러~~~~~' size='xs' weight='Regular' />
      <Typography text='사용가능합니다!' size='xs' weight='Regular' />
    </label>
  );
};

export default InputStyle;
