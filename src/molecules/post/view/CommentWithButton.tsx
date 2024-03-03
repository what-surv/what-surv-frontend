import { PostComment } from '../../../api/PostApi';
import fillAccount from '../../../assets/account-fill.svg';
import arrowUpCircle from '../../../assets/arrow-up-circle.svg';
import Typography from '../../../stories/typography/Typography';

import { useForm } from 'react-hook-form';

interface TextareaInputs {
  comment: string;
}

interface CommentWithButtonProps {
  placeholder?: string;
  onClick?: () => void;
}

const CommentWithButton = ({ placeholder }: CommentWithButtonProps) => {
  const { register, handleSubmit } = useForm<TextareaInputs>();

  const onSubmit = (data: TextareaInputs) => {
    PostComment(1, data.comment);
  };
  return (
    <div className='flex items-start self-stretch w-full gap-2'>
      <img
        src={fillAccount}
        alt='계정 아이콘'
        className='p-2.5 gap-2.5 flex items-center justify-center'
      />
      <div className='w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-end justify-end flex-1 gap-2'
        >
          <div className='flex py-[14px] px-[30px] border-2 self-stretch gap-2.5 items-center rounded-xl border-[#C1C5CC] bg-[#FAFAFA]'>
            <textarea
              {...register('comment')}
              className='flex-1 bg-inherit text-base placeholder:text-[#D7DBE2] placeholder:font-medium font-pretendard font-semibold outline-none leading-[26px]'
              placeholder={placeholder}
              rows={1}
            />
          </div>
          <button
            type='submit'
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
        </form>
      </div>
    </div>
  );
};

export default CommentWithButton;
