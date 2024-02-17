// import { actions } from '@storybook/addon-actions';
import { cva } from 'class-variance-authority';
import React from 'react';

const HeaderVariants = cva(
  `w-full min-w-[390px] max-w-[1920px] h-[56px] flex items-end`,
  {
    variants: {
      size: {
        default: 'min-w-[680px] px-[150px]',
        mobile: 'min-w-[280px] px-6',
        full: 'min-w-[1280px] px-[180px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface ButtonProps {
  children?: React.ReactNode;
  size: 'default' | 'mobile' | 'full';
}

/**
 * Primary UI component for user interaction
 */

export const SubHeader = ({ size, ...props }: ButtonProps) => {
  return (
    <header
      className={`${HeaderVariants({ size, ...props })} flex justify-between`}
    >
      <div className='flex items-center w-full logo gap-7'>
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
