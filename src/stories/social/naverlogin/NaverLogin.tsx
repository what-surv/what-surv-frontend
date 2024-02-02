import { cva, VariantProps } from 'class-variance-authority';
import { ReactHTMLElement } from 'react';

import naver from '../../assets/naver.svg';

const NaverVariants = cva(
  `
  flex justify-center items-center gap-8 h-12
  `,
  {
    variants: {
      size: {
        default: 'py-3 px-4 bg-[#03C75A] rounded-[400px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface GoogleLoginProps
  extends ReactHTMLElement<HTMLButtonElement>,
    VariantProps<typeof NaverVariants> {}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const NaverLogin = ({ size, ...props }: GoogleLoginProps) => {
  return (
    <div>
      <button type='button' className={NaverVariants({ size, ...props })}>
        <img alt='naverlogo' src={naver} />
      </button>
      <button
        type='button'
        className='mt-10 bg-[#03C75A] text-white flex w-[312px] h-[54px] items-center justify-center gap-x-3.5 rounded-md'
      >
        <img alt='googlelogo' src={naver} className='' />
        <span className='text-base font-semibold'>네이버로 시작하기</span>
      </button>
    </div>
  );
};
