import React from 'react';

import Typography from '../../../stories/typography/Typography';

import ReactDOM from 'react-dom';

const ConfirmationModal = ({
  isOpen,
  handleClose,
  handleModalLeave,
}: {
  isOpen?: boolean;
  handleClose: () => void;
  handleModalLeave: () => void;
}) => {
  const modalRoot = document.getElementById('confirm-modal') as HTMLElement;

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className='fixed top-0 left-0 flex items-center flex-shrink-0 justify-center w-full h-screen mx-auto bg-[#242424] opacity-70' />
      <div className='fixed top-0 left-0 z-50 flex items-center justify-center flex-shrink-0 w-full h-screen mx-auto'>
        <div className='flex w-[90%] justify-center items-center max-w-[504px] bg-[#FBD6D4] gap-6 md:gap-10 iphone:p-10 fold:p-6 flex-col rounded-2xl'>
          <Typography
            size='xl'
            text='아직 작성 중인 게시글이 있어요!!!'
            weight='Bold'
          />
          <Typography
            size='base'
            text={`게시글 작성 중 뒤로가기를 실행하면 지금까지 작성한 내용은 저장되지 않아요.\n정말 뒤로 가시겠어요?`}
            weight='Medium'
            lineheight={26}
            className='whitespace-pre-wrap'
          />
          <div className='flex items-center self-stretch justify-center gap-2'>
            <button
              type='button'
              onClick={handleClose}
              className='rounded-[400px] text-[#242424] whitespace-nowrap flex items-center py-3 px-6 border-2 flex-col gap-2.5 flex-1 justify-center border-[#0051FF]'
            >
              취소
            </button>
            <button
              type='button'
              onClick={handleModalLeave}
              className='rounded-[400px] flex border-2 whitespace-nowrap  border-[#0051FF] text-white items-center py-3 px-6 bg-[#0051FF] flex-col gap-2.5 flex-1 justify-center'
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default ConfirmationModal;
