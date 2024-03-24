import { cva } from 'class-variance-authority';
import React from 'react';

import kakao from '../../assets/kakaotalk.svg';

const KakaoVariants = cva(``, {
  variants: {
    size: {
      simple:
        'py-3 px-4 bg-[#FEE500] rounded-[400px] flex justify-center items-center gap-8 h-12',
      full: 'mt-10 bg-[#FEE500] min-w-[250px] flex w-full h-[54px] items-center justify-center gap-x-3.5 rounded-md font-bold',
    },
  },
  defaultVariants: {
    size: 'simple',
  },
});

interface KakaoLoginProps {
  children?: React.ReactNode;
  /** simple -> 간단한 로고만, full -> 로그인 버튼 */
  size: 'simple' | 'full';
  /** 온클릭 이벤트 */
  onClick: () => void;
}

/**
 * 카카오 로그인 버튼 컴포넌트
 */
export const KakaoLogin = ({
  size,
  children,
  onClick,
  ...props
}: KakaoLoginProps) => {
  return (
    <div>
      <button
        type='button'
        onClick={onClick}
        className={KakaoVariants({ size, ...props })}
      >
        <img alt='kakaologo' src={kakao} />
        {children}
      </button>
    </div>
  );
};
