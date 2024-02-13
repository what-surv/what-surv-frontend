import { cva } from 'class-variance-authority';
import React from 'react';

import google from '../../assets/google.svg';

const GoogleVariants = cva(``, {
  variants: {
    size: {
      simple:
        'py-3 px-4 bg-white rounded-[400px] flex justify-center items-center gap-8 h-12 rounded-md',
      full: 'mt-10 bg-white flex w-full h-[54px] items-center justify-center gap-x-3.5 rounded-md font-bold',
    },
  },
  defaultVariants: {
    size: 'full',
  },
});

interface GoogleLoginProps {
  children: React.ReactNode;
  size: 'simple' | 'full';
  onClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const GoogleLogin = ({
  size,
  children,
  onClick,
  ...props
}: GoogleLoginProps) => {
  return (
    <div>
      <button
        type='button'
        onClick={onClick}
        className={GoogleVariants({ size, ...props })}
      >
        <img alt='googlelogo' src={google} />
        {children}
      </button>
    </div>
  );
};
