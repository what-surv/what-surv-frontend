import { axiosBaseUrl } from '../../../api/axiosConfig';
import fillAccount from '../../../assets/account-fill.svg';
import arrowUpCircle from '../../../assets/arrow-up-circle.svg';
import Typography from '../../../stories/typography/Typography';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface ReplyWithButtonProps {
  placeholder?: string;
  parentId: string;
  CancelButtonOnClick: (id: string) => void;
}

interface TextareaInputs {
  reply: string;
}

const ReplyWithButton = ({
  placeholder,
  CancelButtonOnClick,
  parentId,
}: ReplyWithButtonProps) => {
  const { num } = useParams() as { num: string };
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<TextareaInputs>();

  const postReplyMutation = useMutation<void, unknown, string>({
    mutationFn: (reply) =>
      axiosBaseUrl.post(`posts/${num}/comments`, {
        parentId,
        content: reply,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getReply', num],
      });
    },
    onError: () => {
      console.error('에러 발생');
    },
  });

  const onSubmit = (data: TextareaInputs) => {
    postReplyMutation.mutate(data.reply);
    reset();
  };

  return (
    <div className='flex items-start self-stretch w-full gap-2 pl-2.5'>
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
          <div className='flex h-full py-5 px-[30px] border-2 self-stretch gap-2.5 items-center rounded-xl border-[#C1C5CC] bg-[#FAFAFA]'>
            <textarea
              {...register('reply')}
              className='bg-inherit w-full text-base placeholder:text-[#D7DBE2] placeholder:font-medium font-pretendard font-semibold outline-none leading-[26px]'
              placeholder={placeholder}
              rows={3}
            />
          </div>
          <div className='flex gap-2'>
            <button
              type='button'
              className='px-5 text-black text-center py-2 rounded-[400px] flex justify-center items-center gap-2 bg-[#D7DBE2]'
              onClick={() => CancelButtonOnClick(parentId)}
            >
              <span className='sr-only'>text</span>
              <Typography
                lineheight={26}
                weight='Medium'
                size='base'
                text='취소'
                className='text-white'
              />
            </button>
            <button
              type='submit'
              className='px-5 text-center py-2 rounded-[400px] flex justify-center items-center gap-2 bg-[#0051FF]'
            >
              <img src={arrowUpCircle} alt='답글 쓰기 아이콘' />
              <Typography
                lineheight={26}
                weight='Medium'
                size='base'
                text='답글 쓰기'
                className='text-white'
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyWithButton;
