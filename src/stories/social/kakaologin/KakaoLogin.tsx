import { cva } from 'class-variance-authority';
import React from 'react';

import kakao from '../../assets/kakaotalk.svg';

const KakaoVariants = cva(``, {
  variants: {
    size: {
      simple:
        'py-3 px-4 bg-[#FEE500] rounded-[400px] flex justify-center items-center gap-8 h-12',
      full: 'mt-10 bg-[#FEE500] flex w-full h-[54px] items-center justify-center gap-x-3.5 rounded-md font-bold',
    },
  },
  defaultVariants: {
    size: 'simple',
  },
});

interface KakaoLoginProps {
  children?: React.ReactNode;
  size: 'simple' | 'full';
}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const KakaoLogin = ({ size, children, ...props }: KakaoLoginProps) => {
  return (
    <div>
      <button type='button' className={KakaoVariants({ size, ...props })}>
        <img alt='kakaologo' src={kakao} />
        {children}
      </button>
    </div>
  );
};
