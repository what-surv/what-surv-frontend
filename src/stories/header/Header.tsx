// import { actions } from '@storybook/addon-actions';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ReactHTMLElement } from 'react';

import account from '../assets/account.svg';
import notification from '../assets/notification.svg';

const HeaderVariants = cva(`w-full py-3.5`, {
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
});

interface ButtonProps
  extends ReactHTMLElement<HTMLHeadElement>,
    VariantProps<typeof HeaderVariants> {
  children: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const Header = ({ size, children, ...props }: ButtonProps) => {
  return (
    <header
      className={`${HeaderVariants({ size, ...props })} flex justify-between`}
    >
      {children}
      <div className='logo flex gap-4'>
        <img src={account} alt='account' />
        <img src={notification} alt='notification' />
      </div>
    </header>
  );
};
