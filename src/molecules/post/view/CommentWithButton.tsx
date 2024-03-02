import fillAccount from '../../../assets/account-fill.svg';
import arrowUpCircle from '../../../assets/arrow-up-circle.svg';
import Typography from '../../../stories/typography/Typography';

interface CommentWithButtonProps {
  placeholder?: string;
}

const CommentWithButton = ({ placeholder }: CommentWithButtonProps) => {
  return (
    <div className='flex items-start self-stretch w-full gap-2'>
      <img
        src={fillAccount}
        alt='계정 아이콘'
        className='p-2.5 gap-2.5 flex items-center justify-center'
      />
      <div className='flex flex-col items-end justify-end flex-1 gap-2'>
        <div className='flex py-[14px] px-[30px] border-2 self-stretch gap-2.5 items-center rounded-xl border-[#C1C5CC] bg-[#FAFAFA]'>
          <textarea
            className='flex-1 bg-inherit text-base placeholder:text-[#D7DBE2] placeholder:font-medium font-pretendard font-semibold outline-none leading-[26px]'
            placeholder={placeholder}
            rows={1}
            // {...(register && {
            //   ...register(name, {
            //     required: '이 값은 필수항목입니다.',
            //     maxLength: {
            //       value: 50,
            //       message: '50자 이내로 입력해주세요.',
            //     },
            //   }),
            //   onChange: handleChange,
            // })}
          />
        </div>
        <button
          type='button'
          className='px-5 text-center py-2 rounded-[400px] flex justify-center items-center gap-2 bg-[#0051FF]'
        >
          <img src={arrowUpCircle} alt='댓글 쓰기 아이콘' />
          <Typography
            lineheight={26}
            weight='Medium'
            size='base'
            text='댓글 쓰기'
            className='text-white'
          />
        </button>
      </div>
    </div>
  );
};

export default CommentWithButton;
