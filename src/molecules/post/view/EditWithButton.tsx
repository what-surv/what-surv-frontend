import { axiosBaseUrl } from '../../../api/axiosConfig';
import fillAccount from '../../../assets/account-fill.svg';
import arrowUpCircle from '../../../assets/arrow-up-circle.svg';
import Button from '../../../atoms/Button';
import Typography from '../../../stories/typography/Typography';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface TextareaInputs {
  edit: string;
}

interface EditWithButtonProps {
  onClick?: () => void;
  value: string;
  commentId: string;
  setIsEditOpen: (isEdit: boolean) => void;
  CancelButtonOnClick: () => void;
}

const EditWithButton = ({
  commentId,
  CancelButtonOnClick,
  setIsEditOpen,
  value,
}: EditWithButtonProps) => {
  const { num } = useParams() as { num: string };
  const { register, handleSubmit } = useForm<TextareaInputs>();
  const queryClient = useQueryClient();
  const { onChange } = register('edit');

  const postCommentMutation = useMutation<void, unknown, string>({
    mutationFn: (editComment) =>
      axiosBaseUrl.put(`posts/${num}/comments/${commentId}`, {
        content: editComment,
        parentId: commentId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getComment', num],
      });
    },
    onError: () => {
      console.error('에러 발생');
    },
  });

  const onSubmit = (data: TextareaInputs) => {
    postCommentMutation.mutate(data.edit);

    setIsEditOpen(false);
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
          <div className='flex py-[14px] px-[30px] border-2 self-stretch gap-2.5 items-center rounded-xl border-[#6697FF] bg-[#FAFAFA]'>
            <textarea
              {...register('edit', {
                required: '댓글을 입력해주세요.',
              })}
              defaultValue={value}
              className='flex-1 bg-inherit text-base placeholder:text-[#D7DBE2] placeholder:font-medium font-pretendard font-semibold outline-none leading-[26px]'
              onChange={onChange}
            />
          </div>
          <div className='flex gap-2'>
            <button
              type='button'
              className='px-5 text-black text-center py-2 rounded-[400px] flex justify-center items-center gap-2 bg-[#D7DBE2]'
              onClick={() => CancelButtonOnClick()}
            >
              <span className='sr-only'>text</span>
              <Typography
                lineheight={26}
                weight='Medium'
                size='base'
                text='취소'
                className='text-[#242424]'
              />
            </button>
            <Button
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
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWithButton;
