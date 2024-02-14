import React from 'react';

import icSuccessBig from '../stories/assets/ic-success-big.svg';

const LoginStep4 = () => {
  return (
    <div>
      <p className='text-lg text-center text-center font-bold mb-[24px] mt-5'>
        서비스명에 오신 것을 환영합니다!!
      </p>
      <div className='text-center'>
        <img className='inline' src={icSuccessBig} alt='회원가입 성공 아이콘' />
      </div>
      <p className='text-center my-4'>회원가입이 완료되었습니다.</p>
      {/* <Button
        key='0'
        enabled={false}
        disabled={false}
        hover={false}
        focused={false}
        pressed={false}
        type='button'
        ref={null}
      >
        서비스 시작하기
      </Button> */}
    </div>
  );
};

export default LoginStep4;
