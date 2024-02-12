// import { actions } from '@storybook/addon-actions';
import { cva } from 'class-variance-authority';
import React from 'react';

const ButtonVariants = cva(
  `
  flex gap-2 items-center rounded-[400px] text-sm font-semibold leading-[22px]
  `,
  {
    variants: {
      size: {
        default: 'py-1 px-3',
      },
      state: {
        main: 'text-[#D6FF00] bg-[#0051FF]',
        sub: 'text-[#242424] bg-[#D6FF00]',
      },
      // color: {
      //   primary: 'bg-[#0051FF] hover:bg-[#4D85FF]',
      // },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface ButtonProps {
  children: React.ReactNode;
  size: 'default';
  state: 'main' | 'sub';
}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const Badge = ({ size, children, state, ...props }: ButtonProps) => {
  return (
    <span className={`${ButtonVariants({ size, state, ...props })}`}>
      {children}
    </span>
  );
};
