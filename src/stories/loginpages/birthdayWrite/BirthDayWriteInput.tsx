import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactHTMLElement } from 'react';

const BirthDayWriteBoxVariants = cva(
  `flex items-center relative w-[44px] h-[51px]`,
  {
    variants: {},
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface BirthDayWriteBoxProps
  extends ReactHTMLElement<HTMLButtonElement>,
    VariantProps<typeof BirthDayWriteBoxVariants> {
  onChange: () => void;
  state: boolean;
  value: number;
}

const BirthDayWriteBox = ({
  state,
  value,
  onChange,
}: BirthDayWriteBoxProps) => {
  return (
    <div className={`${BirthDayWriteBoxVariants()}`}>
      <input
        className={`w-full text-center text-2xl font-bold text-[#676A72] ${state && 'text-[#1A62FF]'} bg-transparent`}
        type='number'
        name='0'
        id='1'
        value={value}
      />
      <span className='absolute w-6 h-[3px] left-[50%] bottom-[6px] translate-x-[-50%] rounded-[400px] bg-[#A6AAB2]' />
    </div>
  );
};

export default BirthDayWriteBox;
