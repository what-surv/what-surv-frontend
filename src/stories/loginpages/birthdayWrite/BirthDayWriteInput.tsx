import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const BirthDayWriteInputVariants = cva(
  `flex items-center relative w-[44px] h-[51px]`,
  {
    variants: {},
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface BirthDayWriteBoxProps
  extends VariantProps<typeof BirthDayWriteInputVariants> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
  state: boolean;
  value: string;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
}

const BirthDayWriteInput = React.forwardRef<
  HTMLInputElement,
  BirthDayWriteBoxProps
>(({ id, state, value, onChange, onFocus }, ref) => {
  return (
    <div className={`${BirthDayWriteInputVariants()}`}>
      <input
        ref={ref as React.MutableRefObject<HTMLInputElement>}
        className={`w-full text-center text-2xl font-bold ${state ? 'text-[#1A62FF]' : 'text-[#676A72]'} bg-transparent`}
        type='number'
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder='0'
      />
      <span className='absolute w-6 h-[3px] left-[50%] bottom-[6px] translate-x-[-50%] rounded-[400px] bg-[#A6AAB2]' />
    </div>
  );
});

export default BirthDayWriteInput;
