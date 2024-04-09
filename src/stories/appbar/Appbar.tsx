// import { actions } from '@storybook/addon-actions';
import { cva } from 'class-variance-authority';
import React, { useEffect, useRef, useState } from 'react';

import { menuItems } from './util';
import account from '../assets/account.svg';
import close from '../assets/close.svg';
import editBlack from '../assets/edit-black.svg';
import heartBlack from '../assets/heart-black.svg';
import smallLogo from '../assets/logo-identity.svg';
import logo from '../assets/logo.svg';
import notification from '../assets/notification.svg';
import rightArrow from '../assets/right_arrow.svg';
import search from '../assets/search.svg';
import setting from '../assets/setting.svg';
import Typography from '../typography/Typography';

import { useNavigate, Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';

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
  /** 로그인, 게스트 Boolean값 (ture -> 로그인 / false -> 게스트) */
  isLogin?: boolean;
  /** 각 단말기별 크기 확인용 */
  size?: 'mobile' | 'default' | 'full';
  /** 화살표 클릭 시 뒤로가기 기능 */
  onArrowClick?: () => void;
  /** 닫기 클릭 시 페이지로 이동 */
  onCloseClick?: () => void;
  /** 로그아웃 */
  logout?: () => void;
  /** 메인으로 이동시, 쿼리스트링 제거 */
  onlogoClick?: () => void;
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
  isLogin,
  size,
  onArrowClick,
  onCloseClick,
  logout,
  ...props
}: AppbarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const el = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigateHome = () => {
    navigate('/', { replace: true, state: { filterClear: true } });
  };

  const handleAccountIconHover = () => {
    setShowMenu(true);
  };

  const handleAccountIconLeave = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        showMenu &&
        el.current &&
        !el.current.contains(e.relatedTarget as Node)
      ) {
        setShowMenu(false);
      }
    };

    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showMenu]);

  return (
    <header className={`${AppbarVariants({ size, ...props })}`}>
      <div className='max-w-[1560px] w-full flex justify-between m-auto'>
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
            <button type='button' onClick={navigateHome}>
              {isLogo && <img src={logo} alt='logo' />}
            </button>
          </div>
          <div className='md:hidden'>
            {isLogo && !isFullLogo && !children && (
              <button type='button' onClick={navigateHome}>
                <img src={smallLogo} alt='small logo' />
              </button>
            )}
            {isLogo && isFullLogo && !children && (
              <button type='button' onClick={navigateHome}>
                <img src={logo} alt='logo' />
              </button>
            )}
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
            <div className='relative'>
              <button
                type='button'
                className='flex w-6'
                onClick={toggleMenu}
                onMouseEnter={handleAccountIconHover}
              >
                <img
                  src={account}
                  alt='account icon'
                  className={`${isClose ? 'hidden md:inline-block' : ''}`}
                />
              </button>
              {showMenu && (
                <div
                  className='absolute z-50 self-stretch overflow-hidden border-[#6697FF] rounded-2xl border right-0 mt-3 bg-white shadow-lg w-[245px]'
                  onMouseLeave={handleAccountIconLeave}
                >
                  <ul className='py-2 '>
                    {menuItems.map(({ id, label, url }) => (
                      <Link to={url} key={id} className='h-[52px]'>
                        <li className='cursor-pointer font-semibold w-full px-5 py-3 justify-start items-center gap-2 inline-flex hover:bg-[#D6FF00] transition-all duration-300 ease-in-out'>
                          {label === '설정' && (
                            <img
                              src={setting}
                              alt='setting icon'
                              className='w-6 h-6'
                            />
                          )}
                          {label === '내 모집글' && (
                            <img
                              src={editBlack}
                              alt='edit icon'
                              className='w-6 h-6'
                            />
                          )}
                          {label === '관심 표시한 글' && (
                            <img
                              src={heartBlack}
                              alt='heart icon'
                              className='w-6 h-6'
                            />
                          )}
                          {label}
                        </li>
                      </Link>
                    ))}
                    <li className='cursor-pointer font-semibold w-full justify-start items-center gap-2 inline-flex hover:bg-[#D6FF00] transition-all duration-300 ease-in-out'>
                      <button
                        type='button'
                        onClick={logout}
                        className='w-full px-5 py-3 text-left'
                      >
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          {isClose && (
            <button type='button' onClick={onCloseClick}>
              <img src={close} alt='close icon' className='md:hidden' />
            </button>
          )}
          {isLogin && (
            <Link
              to='/login'
              className='flex items-center justify-center w-[74px] h-[34px] rounded-[400px] border border-[#0051FF]'
            >
              <Typography
                size='base'
                weight='Semibold'
                text='로그인'
                className=''
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
