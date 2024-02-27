import React from 'react';

import modalCheck from '../../assets/modal-check.svg';
import Typography from '../../stories/typography/Typography';

import ReactDOM from 'react-dom';

const PostSuccessModal = ({
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
        <div className='flex w-[90%] justify-center items-center max-w-[504px] bg-[#E5EEFF] gap-6 md:gap-10 iphone:p-10 fold:p-6 flex-col rounded-2xl'>
          <Typography
            size='xl'
            text='게시물 등록이 완료되었습니다!!'
            weight='Bold'
          />
          <img src={modalCheck} alt='체크모양 아이콘' />
          <Typography
            size='base'
            text={`내가 작성한 글 목록에서 언제든지 내용을 수정할 수 있어요.\n메인에 등록된 게시물을 확인해보세요!`}
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
              수정하기
            </button>
            <button
              type='button'
              onClick={handleModalLeave}
              className='rounded-[400px] flex border-2 whitespace-nowrap  border-[#0051FF] text-white items-center py-3 px-6 bg-[#0051FF] flex-col gap-2.5 flex-1 justify-center'
            >
              홈으로
            </button>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default PostSuccessModal;
