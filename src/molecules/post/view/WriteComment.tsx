import React, { useState } from 'react';

import { axiosBaseUrl } from '../../../api/axiosConfig';
import { getUserInfoApi } from '../../../api/userCheckApi';
import fillAccount from '../../../assets/account-fill.svg';
import arrowUpCircle from '../../../assets/arrow-up-circle.svg';
import Button from '../../../atoms/Button';
import Typography from '../../../stories/typography/Typography';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface TextareaInputs {
  comment: string;
}

interface CommentWithButtonProps {
  placeholder?: string;
  onClick?: () => void;
}

const WriteComment = ({ placeholder }: CommentWithButtonProps) => {
  const { num } = useParams() as { num: string };
  const { register, handleSubmit, reset } = useForm<TextareaInputs>();
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState(null);

  const postCommentMutation = useMutation<void, unknown, string>({
    mutationFn: (newComment) =>
      axiosBaseUrl.post(`posts/${num}/comments`, {
        content: newComment,
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

  // eslint-disable-next-line consistent-return
  const handleTextareaClick = async () => {
    const userInfoApi = await getUserInfoApi();
    if (!userInfoApi) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return null;
    }
    setUserInfo(userInfoApi);
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = async (data: TextareaInputs) => {
    if (!data.comment.trim()) {
      alert('댓글을 입력하세요.');
      return null;
    }

    const userInfoApi = await getUserInfoApi();
    if (!userInfoApi) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return null;
    }
    setUserInfo(userInfoApi);
    postCommentMutation.mutate(data.comment);
    reset();
  };

  return (
    <div className='flex items-start self-stretch w-full gap-2'>
      <img
        src={fillAccount}
        alt='계정 아이콘'
        className='p-2.5 gap-2.5 flex items-center justify-center'
      />
      <div className='w-[90%] md:w-full'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-end justify-end flex-1 gap-2'
        >
          <div className='flex py-[14px] px-[30px] border-2 self-stretch gap-2.5 items-center rounded-xl border-[#C1C5CC] bg-[#FAFAFA]'>
            <textarea
              {...register('comment')}
              className='flex-1 bg-inherit h-auto max-h-[200px] text-base placeholder:text-[#D7DBE2] placeholder:font-medium font-pretendard font-semibold outline-none leading-[26px] resize-none min-h-[26px] overflow-y-auto'
              placeholder={placeholder}
              rows={1}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onClick={handleTextareaClick}
              readOnly={!userInfo}
            />
          </div>
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
        </form>
      </div>
    </div>
  );
};

export default WriteComment;
