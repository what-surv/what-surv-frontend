import { cva, VariantProps } from 'class-variance-authority';
import { ReactHTMLElement } from 'react';

import kakao from '../../assets/kakaotalk.svg';

const KakaoVariants = cva(
  `
  flex justify-center items-center gap-8 h-12
  `,
  {
    variants: {
      size: {
        default: 'py-3 px-4 bg-[#FEE500] rounded-[400px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface KakaoLoginProps
  extends ReactHTMLElement<HTMLButtonElement>,
    VariantProps<typeof KakaoVariants> {}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const KakaoLogin = ({ size, ...props }: KakaoLoginProps) => {
  return (
    <div>
      <button type='button' className={KakaoVariants({ size, ...props })}>
        <img alt='tt' src={kakao} />
      </button>
      <button
        type='button'
        className='mt-10 bg-[#FEE500] flex w-[312px] h-[54px] items-center justify-center gap-x-3.5 rounded-md'
      >
        <img alt='googlelogo' src={kakao} className='' />
        <span className='text-base font-semibold'>카카오로 시작하기</span>
      </button>
    </div>
  );
};
