import React from 'react';

// import home from '../../assets/ic-home-white.svg';
import logo from '../assets/logo.svg';
import Typography from '../typography/Typography';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='w-full min-h-[300px] pt-[72px] bg-[#E5E7ED] px-6 md:px-[150px] '>
      <div className='max-w-[1560px] w-full m-auto'>
        <img
          src={logo}
          alt='SurveyIT 로고'
          className='inline-block mb-[34px]'
        />
        <div className='relative flex flex-col justify-center'>
          <ul className='flex items-center gap-4'>
            <li className='flex gap-[6px]'>
              <Typography
                size='sm'
                weight='Medium'
                text='상호명'
                className='text-[#808490]'
              />
              <Typography
                size='sm'
                weight='Semibold'
                text='SurveyIT'
                className='text-[#676A72]'
              />
            </li>
            <li>
              <div className='w-[2px] h-5 bg-[#808490]' />
            </li>
            <li className='flex gap-[6px]'>
              <Typography
                size='sm'
                weight='Medium'
                text='개인정보보호책임자'
                className='text-[#808490]'
              />
              <Typography
                size='sm'
                weight='Semibold'
                text='백지수'
                className='text-[#676A72]'
              />
            </li>
          </ul>
          <div className='flex gap-[6px] mt-4'>
            <Typography
              size='sm'
              weight='Medium'
              text='문의 및 제휴 문의'
              className='text-[#808490]'
            />
            <Typography
              size='sm'
              weight='Semibold'
              text='SurveyIT2024@gmail.com'
              className='text-[#676A72]'
            />
          </div>
          <div className='flex gap-[10px] justify-center mt-[48px] sm:mt-0 sm:absolute bottom-0 right-0'>
            <Link to='/termsOfService'>
              <Typography
                size='base'
                weight='Medium'
                text='이용약관'
                className='text-[#676A72]'
              />
            </Link>
            <Link to='/privacyPolicy'>
              <Typography
                size='base'
                weight='Medium'
                text='개인정보처리방침'
                className='text-[#676A72]'
              />
            </Link>
            <Link to='/marketingConsent'>
              <Typography
                size='base'
                weight='Medium'
                text='마케팅'
                className='text-[#676A72]'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
