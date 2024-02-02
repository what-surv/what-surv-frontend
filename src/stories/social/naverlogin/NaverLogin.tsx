import { cva, VariantProps } from 'class-variance-authority';
import React, { ReactHTMLElement } from 'react';

import naver from '../../assets/naver.svg';

const NaverVariants = cva(``, {
  variants: {
    size: {
      simple:
        'py-3 px-4 bg-[#03C75A] rounded-[400px] flex justify-center items-center gap-8 h-12',
      full: 'mt-10 bg-[#03C75A] text-white flex w-[312px] h-[54px] items-center justify-center gap-x-3.5 rounded-md',
    },
  },
  defaultVariants: {
    size: 'full',
  },
});

interface GoogleLoginProps
  extends ReactHTMLElement<HTMLButtonElement>,
    VariantProps<typeof NaverVariants> {
  children: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const NaverLogin = ({ size, children, ...props }: GoogleLoginProps) => {
  return (
    <div>
      <button type='button' className={NaverVariants({ size, ...props })}>
        <img alt='naverlogo' src={naver} />
        {children}
      </button>
    </div>
  );
};
