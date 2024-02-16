// import { actions } from '@storybook/addon-actions';
import { cva } from 'class-variance-authority';
import React from 'react';

import account from '../assets/account.svg';
import notification from '../assets/notification.svg';
import rightArrow from '../assets/right_arrow.svg';
import search from '../assets/search.svg';

const HeaderVariants = cva(`w-full py-3.5 bg-[#FAFAFA]`, {
  variants: {
    size: {
      default: 'min-w-[680px] px-[150px]',
      mobile: 'min-w-[280px] px-6 w-[390px]',
      full: 'min-w-[1280px] px-[180px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface ButtonProps {
  children?: React.ReactNode;
  size: 'default' | 'mobile' | 'full';
  isAccount?: boolean;
  isArrow?: boolean;
  isSearch?: boolean;
  isNotification?: boolean;
  isLogo?: boolean;
}

/**
 * Primary UI component for user interaction
 */

export const Header = ({
  size,
  children,
  isAccount,
  isArrow,
  isSearch,
  isNotification,
  ...props
}: ButtonProps) => {
  return (
    <header
      className={`${HeaderVariants({ size, ...props })} flex justify-between`}
    >
      <div className='flex gap-4 items-center'>
        {isArrow && (
          <img src={rightArrow} alt='arrow' className='px-2 py-1.5' />
        )}
        {children}
      </div>
      <div className='logo flex gap-4'>
        {isAccount && <img src={account} alt='account' />}
        {isNotification && <img src={notification} alt='notification' />}
        {isSearch && <img src={search} alt='search' />}
      </div>
    </header>
  );
};
