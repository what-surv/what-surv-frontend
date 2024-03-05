import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactHTMLElement } from 'react';

const GenderButtonVariants = cva(
  `
      max-w-[248px] w-full h-[50px] rounded-xl
      `,
  {
    variants: {},
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface BirthDayWriteBoxProps
  extends ReactHTMLElement<HTMLButtonElement>,
    VariantProps<typeof GenderButtonVariants> {
  onClick: (clickGender: string) => void;
  text: string;
  state: boolean;
}

const GenderButton = ({ onClick, text, state }: BirthDayWriteBoxProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${GenderButtonVariants()} ${state ? 'bg-[#3283FF]' : 'bg-[#C1C5CC]'}`}
    >
      <p className='text-base font-medium text-[#FFFFFF]'>{text}</p>
    </button>
  );
};

export default GenderButton;
