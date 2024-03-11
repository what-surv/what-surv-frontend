import { useEffect } from 'react';

import logo from '../../stories/assets/logo-identity.svg';
import Typography from '../../stories/typography/Typography';
import home from '../../assets/ic-home.svg';
import { useNavigate } from 'react-router-dom';

const CommingSoon = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#F9F9FB';

    return () => {
      document.body.style.backgroundColor = '#F2F3F7';
    };
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className='mt-[51px] py-[72px] border border-[#E5EEFF] rounded-xl'>
        <div className='text-center mb-[52px]'>
          <img src={logo} alt='로고' className='inline-block mb-[13px]' />
          <Typography
            size='xl2'
            weight='Bold'
            text='Comming Soon'
            className='block text-[#3283FF]'
          />
        </div>
        <div className='text-center'>
          <Typography
            size='sm'
            weight='Semibold'
            text='아직 준비중인 페이지에요.'
            className='block'
          />
          <Typography
            size='sm'
            weight='Semibold'
            text='더 편리하고 재미있는 기능으로'
            className='block'
          />
          <Typography
            size='sm'
            weight='Semibold'
            text='업데이트 중이오니'
            className='block'
          />
          <Typography
            size='sm'
            weight='Semibold'
            text='많은 기대 부탁드립니다!!'
            className='block'
          />
        </div>
      </div>
      <button
        type='button'
        onClick={() => navigate('/')}
        className='flex w-[131px] items-center justify-center gap-2 mt-[43px] m-auto py-3 bg-[#0051FF] rounded-[400px]'
      >
        <img src={home} alt='집 아이콘' />
        <Typography
          size='sm'
          weight='Semibold'
          text='홈으로'
          className='text-[#FFFFFF]'
        />
      </button>
    </div>
  );
};

export default CommingSoon;
