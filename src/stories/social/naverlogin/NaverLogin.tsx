import { cva } from 'class-variance-authority';
import React from 'react';

import naver from '../../assets/naver.svg';

const NaverVariants = cva(``, {
  variants: {
    size: {
      simple:
        'py-3 px-4 bg-[#03C75A] rounded-[400px] flex justify-center items-center gap-8 h-12',
      full: 'mt-10 bg-[#03C75A] text-white flex w-full h-[54px] items-center justify-center gap-x-3.5 rounded-md font-bold',
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

export const NaverLogin = ({
  size,
  onClick,
  children,
  ...props
}: GoogleLoginProps) => {
  return (
    <div>
      <button
        type='button'
        onClick={onClick}
        className={NaverVariants({ size, ...props })}
      >
        <img alt='naverlogo' src={naver} />
        {children}
      </button>
    </div>
  );
};
