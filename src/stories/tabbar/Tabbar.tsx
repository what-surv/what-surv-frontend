/* eslint-disable jsx-a11y/control-has-associated-label */
// import { actions } from '@storybook/addon-actions';
import { cva } from 'class-variance-authority';
import React from 'react';

import Typography from '../typography/Typography';

import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  // 현재 URL 경로와 링크의 경로가 일치하는지 확인하는 함수
  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header
      className={`${TabbarVariants({ size, ...props })} justify-between w-full px-6 ${isMobileVisible ? `` : `hidden md:block`} md:px-[180px]`}
    >
      <div className='flex max-w-[1560px] w-full m-auto items-center logo gap-7'>
        <Link
          className='relative py-2 px-4 w-12 md:w-16 flex-col items-stretch flex gap-2.5'
          to='/'
        >
          <Typography
            text='IT'
            size='base'
            weight='Semibold'
            className='text-base font-semibold leading-[26px] text-[#0051FF] text-center'
          />
          <div
            className={`absolute bottom-0 left-0 w-0 h-[2px] bg-[#0051FF] ${isActiveLink('/') ? 'w-[100%]' : ''}  transition-all duration-300 ease-in`}
          />
        </Link>
        <div>
          <Link
            to='/lite'
            className='relative py-2 w-12 md:w-16 px-4 flex-col items-stretch flex gap-2.5'
          >
            <Typography
              text='Lite'
              size='base'
              weight='Semibold'
              className='text-base font-semibold leading-[26px] text-[#545760] text-center'
            />
            <div
              className={`absolute bottom-0 left-0 w-0 h-[2px] bg-[#0051FF] ${isActiveLink('/lite') ? 'w-[100%]' : ''}  transition-all duration-300 ease-in`}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
