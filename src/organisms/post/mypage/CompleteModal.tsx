import Typography from '../../../stories/typography/Typography';

import ReactDOM from 'react-dom';

interface CompleteModalProps {
  onClick?: () => void;
  title?: string;
  content?: string;
  buttonText?: string;
  isOpen: boolean;
}

const CompleteModal = ({
  buttonText,
  title,
  isOpen,
  onClick,
  content,
}: CompleteModalProps) => {
  const modalRoot = document.getElementById('success-modal') as HTMLElement;

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className='fixed top-0 left-0 flex items-center flex-shrink-0 justify-center w-full h-screen mx-auto bg-[#242424] opacity-70' />
      <div className='fixed top-0 left-0 z-50 flex items-center justify-center flex-shrink-0 w-full h-screen mx-auto'>
        <div className='flex w-[90%] justify-center items-center max-w-[504px] bg-[#E5EEFF] gap-6 md:gap-10 iphone:p-10 fold:p-6 flex-col rounded-2xl'>
          <Typography size='xl' text={title} weight='Bold' />
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
              onClick={onClick}
              className='rounded-[400px] bg-[#0051FF] text-white whitespace-nowrap flex items-center py-3 px-6 border-2 flex-col gap-2.5 flex-1 justify-center border-[#0051FF]'
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default CompleteModal;
