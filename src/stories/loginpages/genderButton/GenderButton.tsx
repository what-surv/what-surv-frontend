import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactHTMLElement } from 'react';
import Typography from '../../typography/Typography';

const GenderButtonVariants = cva(
  `
      max-w-[248px] w-full h-[50px] bg-[#C1C5CC] rounded-xl
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
  onClick: () => void;
  text: string;
  state: boolean;
}

const GenderButton = ({ onClick, text, state }: BirthDayWriteBoxProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${GenderButtonVariants()} ${state && 'bg-[#3283FF]'}`}
    >
      <p className='text-base font-medium text-[#FFFFFF]'>{text}</p>
    </button>
  );
};

export default GenderButton;
