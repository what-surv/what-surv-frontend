import React from 'react';

import icTextFieldFail from '../assets/ic-text-field-fail.svg';
import icTextFieldSuccess from '../assets/ic-text-field-success.svg';

interface TextFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  value: string;
}

const Textfield = ({ onChange, onButtonClick, value }: TextFieldProps) => {
  return (
    <div className='flex'>
      <div className='relative w-full bg-white border border-[#6697ff] rounded-2xl p-5 transition duration-300 ease-in-out'>
        <input type='text' onChange={onChange} value={value} />

        <img src={icTextFieldSuccess} alt='성공아이콘' />

        <img src={icTextFieldFail} alt='실패아이콘' />
      </div>

      <button
        className='flex items-center justify-center w-84 h-46 bg-blue-500 text-white rounded-lg ml-12'
        type='button'
        onClick={onButtonClick}
      >
        중복확인
      </button>
    </div>
  );
};

export default Textfield;
