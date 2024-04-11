import Typography from '../stories/typography/Typography';

import ReactDOM from 'react-dom';

const WithdrawalModal = ({
  isOpen,
  handleClose,
  submit,
}: {
  isOpen?: boolean;
  handleClose: () => void;
  submit?: () => void;
}) => {
  const modalRoot = document.getElementById('confirm-modal') as HTMLElement;

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className='fixed top-0 left-0 z-50 flex items-center flex-shrink-0 justify-center w-full h-screen mx-auto bg-[#242424] opacity-70' />
      <div className='fixed top-0 left-0 z-50 flex items-center justify-center flex-shrink-0 w-full h-screen mx-auto'>
        <div className='flex text-center w-[90%] justify-center items-center max-w-[504px] bg-[#FBD6D4] gap-6 iphone:p-10 fold:p-6 flex-col rounded-2xl'>
          <div className='max-w-[342px] w-full m-auto'>
            <div className='flex flex-col gap-6'>
              <p>
                <Typography
                  size='lg'
                  text='정말 탈퇴하시겠어요?'
                  weight='Bold'
                />
              </p>

              <p className='text-left'>
                <Typography
                  size='base'
                  text='탈퇴하면 게시글, 댓글, 계정 정보를 
복구할 수 없게 됩니다. 
발전 중인 멋진 서베잇과 함께 할 수 없게 돼요!! 
그래도 떠나실 건가요?
                    '
                  weight='Medium'
                  lineheight={26}
                  className='whitespace-pre-wrap'
                />
              </p>
            </div>
            <div className='flex items-center justify-center gap-2 LoginButton'>
              {handleClose !== undefined && (
                <button
                  type='button'
                  onClick={submit}
                  className='flex w-[50%] h-[50px] bg-neutral-50 rounded-[400px] border-2 border-blue-600 flex-col justify-center items-center gap-2.5 '
                >
                  탈퇴하기
                </button>
              )}
              <button
                type='button'
                onClick={handleClose}
                className='flex grow w-[50%] h-[50px] bg-blue-600 rounded-[400px] flex-col justify-center items-center gap-2.5 text-[#FFFFFF]'
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default WithdrawalModal;
