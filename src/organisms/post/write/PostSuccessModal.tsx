import React from 'react';

import modalCheck from '../../../assets/modal-check.svg';
import { SuccessModalStore } from '../../../store/store';
import Typography from '../../../stories/typography/Typography';

import ReactDOM from 'react-dom';

interface PostSuccessModalProps {
  firstButtonOnClick?: () => void;
  SecondButtonOnClick?: () => void;
  title?: string;
  content?: string;
  firstButtonText?: string;
  SecondButtonText?: string;
  isLogo: boolean;
}

const PostSuccessModal = ({
  firstButtonText,
  SecondButtonText,
  firstButtonOnClick,
  SecondButtonOnClick,
  title,
  isLogo,
  content,
}: PostSuccessModalProps) => {
  const { isSuccessModalOpen } = SuccessModalStore();
  const modalRoot = document.getElementById('success-modal') as HTMLElement;

  if (!isSuccessModalOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className='fixed top-0 left-0 flex items-center flex-shrink-0 justify-center w-full h-screen mx-auto bg-[#242424] opacity-70' />
      <div className='fixed top-0 left-0 z-50 flex items-center justify-center flex-shrink-0 w-full h-screen mx-auto'>
        <div className='flex w-[90%] justify-center items-center max-w-[504px] bg-[#E5EEFF] gap-6 md:gap-10 iphone:p-10 fold:p-6 flex-col rounded-2xl'>
          <Typography size='xl' text={title} weight='Bold' />
          <img
            src={modalCheck}
            alt='체크모양 아이콘'
            className={`${!isLogo ? ` hidden` : ``}`}
          />
          <Typography
            size='base'
            text={content}
            weight='Medium'
            lineheight={26}
            className='whitespace-pre-wrap'
          />
          <div className='flex items-center self-stretch justify-center gap-2'>
            <button
              type='button'
              onClick={
                firstButtonOnClick ? () => firstButtonOnClick() : undefined
              }
              className='rounded-[400px] bg-[#FAFAFA] text-[#242424] whitespace-nowrap flex items-center py-3 px-6 border-2 flex-col gap-2.5 flex-1 justify-center border-[#0051FF]'
            >
              {firstButtonText}
            </button>
            <button
              type='button'
              onClick={
                SecondButtonOnClick ? () => SecondButtonOnClick() : undefined
              }
              className='rounded-[400px] flex border-2 whitespace-nowrap  border-[#0051FF] text-white items-center py-3 px-6 bg-[#0051FF] flex-col gap-2.5 flex-1 justify-center'
            >
              {SecondButtonText}
            </button>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default PostSuccessModal;
