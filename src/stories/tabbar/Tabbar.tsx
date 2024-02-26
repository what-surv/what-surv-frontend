// import { actions } from '@storybook/addon-actions';
import { cva } from 'class-variance-authority';
import React from 'react';

const TabbarVariants = cva(`w-full  h-[56px] flex items-end`, {
  variants: {
    size: {
      default: '',
      mobile: '',
      full: '',
    },
  },
});

interface TabbarProps {
  children?: React.ReactNode;
  // 단말기별 크기 확인용 size props
  size?: 'default' | 'mobile' | 'full';
}

/**
 * Tabbar 컴포넌트
 */

export const Tabbar = ({ size, ...props }: TabbarProps) => {
  return (
    <header
      className={`${TabbarVariants({ size, ...props })} justify-between w-full hidden md:inline-block md:px-[180px]`}
    >
      <div className='flex max-w-[1560px] w-full m-auto items-center logo gap-7'>
        <button
          className='p-2 gap-2.5 border-b-2 border-b-[#0051FF]'
          type='button'
        >
          <span className='text-base font-semibold leading-[26px] text-[#0051FF]'>
            IT
          </span>
        </button>
        {/* 
        <div>
          <button className='p-2 gap-2.5' type='button'>
            <span className='text-base font-medium leading-[26px] text-[#545760]'>
              뷰티
            </span>
          </button>
        </div> */}
        {/* <div>
          <button className='p-2 gap-2.5' type='button'>
            <span className='text-base font-medium leading-[26px] text-[#545760]'>
              메디컬
            </span>
          </button>
        </div> */}
        <div>
          <button className='p-2 gap-2.5' type='button'>
            <span className='text-base font-medium leading-[26px] text-[#545760]'>
              Lite
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
