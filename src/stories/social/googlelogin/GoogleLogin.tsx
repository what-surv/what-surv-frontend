import { cva } from 'class-variance-authority';
import React from 'react';

import google from '../../assets/google.svg';

const GoogleVariants = cva(``, {
  variants: {
    size: {
      simple:
        'py-3 px-4 bg-white rounded-[400px] flex justify-center items-center gap-8 h-12 rounded-[400px]',
      full: 'bg-white min-w-[250px] flex w-full h-[54px] items-center justify-center gap-x-3.5 rounded-md font-bold',
    },
  },
  defaultVariants: {
    size: 'full',
  },
});

interface GoogleLoginProps {
  children: React.ReactNode;
  /** simple -> 간단한 로고만, full -> 로그인 버튼 */
  size: 'simple' | 'full';
  /** 온클릭 이벤트 */
  onClick: () => void;
}

/**
 * 구글 로그인 버튼 컴포넌트
 */

export const GoogleLogin = ({
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
        className={GoogleVariants({ size, ...props })}
      >
        <img alt='googlelogo' src={google} />
        {children}
      </button>
    </div>
  );
};
