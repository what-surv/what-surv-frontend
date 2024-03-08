/* eslint-disable jsx-a11y/control-has-associated-label */
// import { actions } from '@storybook/addon-actions';
import { cva } from 'class-variance-authority';
import React from 'react';

import Typography from '../typography/Typography';

const TabbarVariants = cva(
  `w-full min-w-[280px] bg-[#FAFAFA] h-[56px] flex items-end`,
  {
    variants: {
      size: {
        default: '',
        mobile: '',
        full: '',
      },
    },
  }
);

interface TabbarProps {
  children?: React.ReactNode;
  /** 단말기별 크기 확인용 size props */
  size?: 'default' | 'mobile' | 'full';
  /** 모바일에서 Tabbar를 보여줘야 하는 지 여부  */
  isMobileVisible?: boolean;
}

/**
 * Tabbar 컴포넌트
 */

export const Tabbar = ({ size, isMobileVisible, ...props }: TabbarProps) => {
  return (
    <header
      className={`${TabbarVariants({ size, ...props })} justify-between w-full px-6 ${isMobileVisible ? `` : `hidden md:block`} md:px-[180px]`}
    >
      <div className='flex max-w-[1560px] w-full m-auto items-center logo gap-7'>
        <button
          className='py-2 px-4 w-12 md:w-16 flex-col items-stretch flex gap-2.5 border-b-2 border-b-[#0051FF]'
          type='button'
        >
          <Typography
            text='IT'
            size='base'
            weight='Semibold'
            className='text-base font-semibold leading-[26px] text-[#0051FF]'
          />
        </button>
        <div>
          <button
            className='py-2 w-12 md:w-16 px-4 flex-col items-stretch flex gap-2.5'
            type='button'
          >
            <Typography
              text='Lite'
              size='base'
              weight='Semibold'
              className='text-base font-semibold leading-[26px] text-[#545760]'
            />
          </button>
        </div>
      </div>
    </header>
  );
};
