import React from 'react';

import EditWithButton from './EditWithButton';
import ReplyWithButton from './ReplyWithButton';
import { axiosBaseUrl } from '../../../api/axiosConfig';
import { profileTypes, UserTypes } from '../../../api/Posttypes';
import deleteIcon from '../../../assets/delete.svg';
import edit from '../../../assets/edit-line.svg';
import Comment from '../../../atoms/post/Comment';
import CommentButton from '../../../atoms/post/CommentButton';
import reply from '../../../stories/assets/ic_reply.svg';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface CommentWithButtonProps {
  content: string;
  id: string;
  commentId: string;
  isReplyOpen: boolean;
  isEditOpen: boolean;
  user: UserTypes;
  // parent: parentProps;
  ReplyButtonClick: (id: string) => void;
  EditButtonClick: (id: string) => void;
  DeleteButtonClick: (id: string) => void;
  CancelButtonOnClick: () => void;
  setIsEditOpen: (isEdit: boolean) => void;
}

// interface parentProps {
//   id: string;
// }

const CommentWithButton = ({
  content,
  id,
  user,
  // parent,
  isEditOpen,
  commentId,
  setIsEditOpen,
  CancelButtonOnClick,
  isReplyOpen,
  ReplyButtonClick,
  EditButtonClick,
  DeleteButtonClick,
}: CommentWithButtonProps) => {
  const { num } = useParams() as { num: string };
  const {
    data: profile,
    isError,
    error,
  } = useQuery<profileTypes>({
    queryKey: ['getProfile', num],
    queryFn: () => axiosBaseUrl.get(`auth/profile`),
    retry: 0,
  });

  if (isError) {
    console.error(error.message);
  }

  return (
    <div className='flex pl-[30px] mb-5 flex-col gap-2.5 items-start justify-end self-stretch'>
      <Comment content={content} />
      <div className='flex comment-button-array'>
        <div className='flex gap-2.5'>
          <CommentButton onClick={() => ReplyButtonClick(id)}>
            <img src={reply} alt='답장 아이콘' />
          </CommentButton>
          {profile?.data.id === user.id && (
            <>
              <CommentButton onClick={() => EditButtonClick(id)}>
                <img src={edit} alt='수정 아이콘' />
              </CommentButton>
              <CommentButton onClick={() => DeleteButtonClick(id)}>
                <img src={deleteIcon} alt='삭제 아이콘' />
              </CommentButton>
            </>
          )}
        </div>
      </div>
      {isEditOpen && commentId === id && (
        <EditWithButton
          value={content}
          commentId={id}
          setIsEditOpen={setIsEditOpen}
          CancelButtonOnClick={CancelButtonOnClick}
        />
      )}
      {isReplyOpen && commentId === id && (
        <ReplyWithButton
          CancelButtonOnClick={CancelButtonOnClick}
          parentId={id}
          placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.'
        />
      )}
    </div>
  );
};

export default CommentWithButton;
