import React from 'react';

import Home from '../../assets/ic-home-white.svg';
import Button from '../../atoms/Button';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Typography from '../../stories/typography/Typography';

import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Appbar isAccount isLogo isFullLogo />
        <Tabbar isMobileVisible size='default' />
      </div>
      <div className='px-5'>
        <div className='relative flex flex-col max-w-[342px] w-full h-[calc(100vh-112px)] gap-9 m-auto -top-[60px] justify-center items-center '>
          <p>
            <Typography
              size='xl2'
              weight='Bold'
              text='404'
              className='text-center text-[#80A8FF]'
            />
          </p>
          <div className='flex flex-col gap-3 items-center'>
            <p>
              <Typography
                size='lg'
                weight='Semibold'
                text='원하시는 페이지를 찾을 수 없습니다.'
                className='block text-center text-[#545760]'
              />
            </p>
            <div>
              <p>
                <Typography
                  size='sm'
                  weight='Medium'
                  text='찾으려는 페이지의 주소가 잘못 입력되었거나,'
                  className='block text-center text-[#9497A2]'
                />
              </p>
              <p>
                <Typography
                  size='sm'
                  weight='Medium'
                  text='주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.'
                  className='block text-center text-[#9497A2]'
                />
              </p>
              <p>
                <Typography
                  size='sm'
                  weight='Medium'
                  text='입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.'
                  className='block text-center text-[#9497A2]'
                />
              </p>
            </div>
          </div>
          <Button
            className='ButtonCta w-[131px] h-[52px] px-6 py-3 bg-blue-600 rounded-[400px] justify-center items-center gap-2 inline-flex'
            onClick={() => {
              navigate('/');
            }}
            type='button'
          >
            <img
              src={Home}
              alt='홈 아이콘'
              className='Home5Line w-7 h-7 px-[3.50px] pt-[2.64px] pb-[3.50px] justify-center items-center flex'
            />
            <Typography
              size='lg'
              weight='Semibold'
              text='홈으로'
              className='text-[#FFFFFF]'
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
