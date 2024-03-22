import React from 'react';

import Typography from '../stories/typography/Typography';

import ReactDOM from 'react-dom';

const LoginAlertModal = ({
  isOpen,
  goLogin,
  handleClose,
}: {
  isOpen?: boolean;
  goLogin: () => void;
  handleClose?: () => void;
}) => {
  const modalRoot = document.getElementById('confirm-modal') as HTMLElement;

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className='fixed top-0 left-0 z-50 flex items-center flex-shrink-0 justify-center w-full h-screen mx-auto bg-[#242424] opacity-70' />
      <div className='fixed top-0 left-0 z-50 flex items-center justify-center flex-shrink-0 w-full h-screen mx-auto'>
        <div className='flex text-center w-[90%] justify-center items-center max-w-[504px] bg-[#E5EEFF] gap-6 iphone:p-10 fold:p-6 flex-col rounded-2xl'>
          <Typography
            size='xl'
            text='로그인 후 이용할 수 있는 기능이에요.'
            weight='Bold'
          />
          <Typography
            size='base'
            text='로그인 하시겠어요?'
            weight='Medium'
            lineheight={26}
            className='whitespace-pre-wrap '
          />
          <div className='flex items-center self-stretch justify-center gap-2'>
            <button
              type='button'
              onClick={goLogin}
              className='rounded-[400px] flex border-2 whitespace-nowrap  border-[#0051FF] text-white items-center py-3 px-6 bg-[#0051FF] flex-col gap-2.5 flex-1 justify-center'
            >
              간편 로그인하기
            </button>
            {handleClose !== undefined && (
              <button
                type='button'
                onClick={handleClose}
                className='rounded-[400px] bg-[#FAFAFA] text-[#242424] whitespace-nowrap flex items-center py-3 px-6 border-2 flex-col gap-2.5 flex-1 justify-center border-[#0051FF]'
              >
                취소
              </button>
            )}
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default LoginAlertModal;
