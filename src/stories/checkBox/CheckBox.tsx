import React from 'react';

import checkIcon from '../assets/ic-checked..svg';

interface CheckBoxProps {
  id: string;
  checked: boolean;
  children: React.ReactNode;
  onChange: () => void;
}
const CheckBox = ({ id, checked, onChange, children }: CheckBoxProps) => {
  return (
    <label htmlFor={id} className='flex items-center cursor-pointer'>
      <div
        className={`relative w-[18px] h-[18px] mx-5 border-2 ${checked ? 'border-[#0051FF]' : 'border-[#808490]'} rounded overflow-hidden`}
      >
        <img
          src={checkIcon}
          alt='체크 이미지'
          className={`absolute top-0 transition-all duration-300 ease ${!checked ? 'scale-0' : 'scale-1'}`}
        />
      </div>
      <input id={id} type='checkbox' checked={checked} onChange={onChange} />
      {children}
    </label>
  );
};

export default CheckBox;
