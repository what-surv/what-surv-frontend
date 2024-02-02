import { cva, VariantProps } from 'class-variance-authority';
import { ReactHTMLElement } from 'react';

import google from '../../assets/google.svg';

const GoogleVariants = cva(
  `
  flex justify-center items-center gap-8 h-12 rounded-md
  `,
  {
    variants: {
      size: {
        default: 'py-3 px-4 bg-white rounded-[400px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface GoogleLoginProps
  extends ReactHTMLElement<HTMLButtonElement>,
    VariantProps<typeof GoogleVariants> {}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const GoogleLogin = ({ size, ...props }: GoogleLoginProps) => {
  return (
    <div>
      <button type='button' className={GoogleVariants({ size, ...props })}>
        <img alt='googlelogo' src={google} />
      </button>
      <button
        type='button'
        className='mt-10 bg-white flex w-[312px] h-[54px] items-center justify-center gap-x-3.5 rounded-md'
      >
        <img alt='googlelogo' src={google} className='' />
        <span className='text-base font-semibold'>구글로 시작하기</span>
      </button>
    </div>
  );
};
