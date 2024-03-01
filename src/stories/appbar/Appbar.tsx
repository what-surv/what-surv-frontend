// import { actions } from '@storybook/addon-actions';
import { cva } from 'class-variance-authority';
import React from 'react';

import account from '../assets/account.svg';
import close from '../assets/close.svg';
import smallLogo from '../assets/logo-identity.svg';
import logo from '../assets/logo.svg';
import notification from '../assets/notification.svg';
import rightArrow from '../assets/right_arrow.svg';
import search from '../assets/search.svg';

const AppbarVariants = cva(
  `w-full px-6 md:px-[150px] full:px-[180px] min-w-[280px] md:min-w-[680px] py-3.5 bg-[#FAFAFA]`,
  {
    variants: {
      size: {
        default: 'min-w-[680px] px-[150px]',
        mobile: 'min-w-[280px] px-6 w-[390px]',
        full: 'min-w-[1280px] px-[180px]',
      },
    },
  }
);

interface AppbarProps {
  children?: React.ReactNode;
  /** 계정 아이콘 여부(true -> 있음 / false -> 없음)  */
  isAccount?: boolean;
  /** 화살표 아이콘 여부(true -> 있음 / false -> 없음)  */
  isArrow?: boolean;
  /** 검색 아이콘 여부(true -> 있음 / false -> 없음)  */
  isSearch?: boolean;
  /** 알림 아이콘 여부(true -> 있음 / false -> 없음)  */
  isNotification?: boolean;
  /** 로고 여부(true -> 있음 / false -> 없음)  */
  isLogo?: boolean;
  /** 닫기 버튼 여부(true -> 있음 / false -> 없음)  */
  isClose?: boolean;
  /** 모바일에서 텍스트가 중앙에 위치하는지 여부(true -> 중앙에 배치 / false -> 중앙에 배치 x) */
  isTextCenter?: boolean;
  /** 모바일에서 전체 모양의 로고를 나타내는 여부(true -> 중앙에 배치 / false -> 중앙에 배치 x) */
  isFullLogo?: boolean;
  /** 각 단말기별 크기 확인용 */
  size?: 'mobile' | 'default' | 'full';
  /** 화살표 클릭 시 뒤로가기 기능 */
  onArrowClick?: () => void;
}

/**
 * App bar 컴포넌트
 */

export const Appbar = ({
  children,
  isAccount,
  isArrow,
  isSearch,
  isClose,
  isNotification,
  isLogo,
  isFullLogo,
  isTextCenter,
  size,
  onArrowClick,
  ...props
}: AppbarProps) => {
  return (
    <header className={`${AppbarVariants({ size, ...props })}`}>
      <div className='max-w-[1560px] w-full flex justify-between'>
        <div className='flex items-center w-full gap-4'>
          {isArrow && onArrowClick && (
            <button type='button' onClick={() => onArrowClick()}>
              <img
                src={rightArrow}
                alt='arrow'
                className='px-2 py-1.5 md:hidden'
              />
            </button>
          )}
          <div className='hidden w-full md:inline-block'>
            {isLogo && <img src={logo} alt='logo' />}
          </div>
          <div className='md:hidden'>
            {isLogo && !isFullLogo && !children && (
              <img src={smallLogo} alt='small logo' />
            )}
            {isLogo && isFullLogo && !children && <img src={logo} alt='logo' />}
          </div>
          <div
            className={`flex ${isTextCenter ? `w-full justify-center` : ``} `}
          >
            {children && <span className='md:hidden'>{children}</span>}
          </div>
        </div>
        <div className='flex gap-4 logo'>
          {isNotification && (
            <img
              src={notification}
              alt='notification'
              className={`${isClose ? `hidden md:inline-block` : ``}`}
            />
          )}
          {isSearch && (
            <img
              src={search}
              alt='search icon'
              className={`${isClose ? `hidden md:inline-block` : ``}`}
            />
          )}
          {isAccount && (
            <img
              src={account}
              alt='account icon'
              className={`${isClose ? `hidden md:inline-block` : ``}`}
            />
          )}
          {isClose && (
            <img src={close} alt='close icon' className='md:hidden' />
          )}
        </div>
      </div>
    </header>
  );
};
