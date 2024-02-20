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
      default: '',
      mobile: '',
      full: 'min-w-[1280px] px-[180px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface ButtonProps {
  children?: React.ReactNode;
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
  children,
  isAccount,
  isArrow,
  isSearch,
  isNotification,
  isLogo,
}: ButtonProps) => {
  return (
    <header
      className={`${HeaderVariants({})} flex justify-between iphone:min-w-[280px] iphone:px-6 w-[390px] md:min-w-[680px] md:px-[150px]`}
    >
      <div className='flex items-center gap-4'>
        {isArrow && (
          <img src={rightArrow} alt='arrow' className='px-2 py-1.5' />
        )}
        {isLogo && <img src={account} alt='logo' />}
        {children}
      </div>
      <div className='flex gap-4 logo'>
        {isNotification && <img src={notification} alt='notification' />}
        {isSearch && <img src={search} alt='search' />}
        {isAccount && <img src={account} alt='account' />}
      </div>
    </header>
  );
};
