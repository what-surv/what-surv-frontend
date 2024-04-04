import React from 'react';

import Typography from '../stories/typography/Typography';

import ReactDOM from 'react-dom';

const LogoutAlertModal = ({
  isOpen,
  goLogout,
  handleClose,
}: {
  isOpen?: boolean;
  goLogout: () => void;
  handleClose?: () => void;
}) => {
  const modalRoot = document.getElementById('confirm-modal') as HTMLElement;

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className='fixed top-0 left-0 z-50 flex items-center flex-shrink-0 justify-center w-full h-screen mx-auto bg-[#242424] opacity-70' />
      <div className='fixed top-0 left-0 z-50 flex items-center justify-center flex-shrink-0 w-full h-screen mx-auto'>
        <div className='flex text-center w-[90%] justify-center items-center max-w-[504px] bg-[#E5EEFF] gap-6 iphone:p-10 fold:p-6 flex-col rounded-2xl'>
          <div className='max-w-[342px] w-full m-auto'>
            <div className='flex flex-col gap-6'>
              <p>
                <Typography
                  size='lg'
                  text='로그아웃 하시겠어요?'
                  weight='Bold'
                />
              </p>
              <p>
                <p>
                  <Typography
                    size='base'
                    text='SurveyIT는 계속 발전 중이에요.'
                    weight='Medium'
                    lineheight={26}
                    className='whitespace-pre-wrap '
                  />
                </p>
                <p>
                  <Typography
                    size='base'
                    text='곧 또 만나요!'
                    weight='Medium'
                    lineheight={26}
                    className='whitespace-pre-wrap '
                  />
                </p>
              </p>
            </div>
            <div className='flex items-center justify-center gap-2 mt-4 LoginButton'>
              {handleClose !== undefined && (
                <button
                  type='button'
                  onClick={goLogout}
                  className='flex w-[50%] h-[50px] bg-neutral-50 rounded-[400px] border-2 border-blue-600 flex-col justify-center items-center gap-2.5 '
                >
                  로그아웃
                </button>
              )}
              <button
                type='button'
                onClick={handleClose}
                className='flex grow w-[50%] h-[50px] bg-blue-600 rounded-[400px] flex-col justify-center items-center gap-2.5 text-[#FFFFFF]'
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default LogoutAlertModal;
