// import { actions } from '@storybook/addon-actions';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ReactHTMLElement } from 'react';

import circle from '../assets/circle.svg';

const ButtonVariants = cva(
  `
  flex justify-center items-center text-white rounded-[400px] gap-3.5
  `,
  {
    variants: {
      size: {
        default: 'py-3 px-6 h-[50px]',
        small: 'px-5 py-2 h-10',
      },
      state: {
        outlined: 'border-[#0051FF] border-2 text-black',
        contained: 'border bg-[#0051FF] hover:bg-[#4D85FF] text-white',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ReactHTMLElement<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
  enabled: boolean;
  disabled: boolean;
  hover: boolean;
  focused: boolean;
  pressed: boolean;
  onClick: () => void;
}

/**
 * Primary UI component for user interaction
 */

export const Button = ({
  size,
  children,
  enabled,
  disabled,
  hover,
  state,
  focused,
  pressed,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      type='button'
      className={`${ButtonVariants({ size, state, ...props })}`}
      disabled={disabled}
      onClick={onClick}
      aria-pressed={pressed}
      {...(enabled && { enabled })}
      {...(hover && { hover })}
      {...(focused && { focused })}
    >
      <img src={circle} alt='circle' />
      {children}
      <img src={circle} alt='circle' />
    </button>
  );
};
