/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unused-prop-types */
import { AxiosRequestConfig } from 'axios';
import React, { useState } from 'react';

import { axiosBaseUrl } from '../../../api/axiosConfig';
import { getComment } from '../../../api/PostApi';
import { profileTypes, UserTypes } from '../../../api/Posttypes';
import deleteIcon from '../../../assets/delete.svg';
import edit from '../../../assets/edit-line.svg';
import Comment from '../../../atoms/post/Comment';
import CommentButton from '../../../atoms/post/CommentButton';
import EditWithButton from '../../../molecules/post/view/EditWithButton';
import ReplyWithButton from '../../../molecules/post/view/ReplyWithButton';
import UserInfo from '../../../molecules/post/view/UserInfo';
import { SuccessModalStore } from '../../../store/store';
import reply from '../../../stories/assets/ic_reply.svg';
import PostSuccessModal from '../write/PostSuccessModal';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface commentTypes {
  id: string;
  content: string;
  user: UserTypes;
  parent: parentProps;
}

interface parentProps {
  id: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  parentId?: string;
}

const UserInfoWithComment = () => {
  const { num } = useParams() as { num: string };
  const { setIsSuccessModalOpen } = SuccessModalStore();
  const queryClient = useQueryClient();
  const { data: comments } = useQuery<commentTypes[]>({
    queryKey: ['getComment', num],
    queryFn: () => getComment(num),
    enabled: true, // 컴포넌트가 마운트될 때 즉시 데이터 가져오기
  });

  const { data: profile } = useQuery<profileTypes>({
    queryKey: ['getProfile', num],
    queryFn: () => axiosBaseUrl.get(`auth/profile`),
  });

  const [isReplyOpen, setIsReplyOpen] = useState(false); // 댓글 작성 영역 열림 여부 상태

  const [isEditOpen, setIsEditOpen] = useState(false); // 수정 버튼 상태
  const [CommentId, setCommentId] = useState<string>(''); // 수정할 댓글의 ID를 저장하는 상태

  const [isButtonArray, setIsButtonArray] = useState(true);

  // 수정 버튼 클릭 시 해당 댓글의 ID를 저장하고 수정 모드를 활성화
  const EditButtonClick = (commentId: string) => {
    setCommentId(commentId); // 수정할 댓글의 ID를 상태에 저장
    setIsEditOpen(true);
    setIsReplyOpen(false);
  };

  const ReplyButtonClick = (commentId: string) => {
    setCommentId(commentId);
    setIsReplyOpen(true);
    setIsEditOpen(false);
  };

  // 수정이나 답장에서 취소 버튼 클릭
  const CancelButtonOnClick = () => {
    setCommentId(''); // 수정할 댓글의 ID를 초기화
    setIsReplyOpen(false);
    setIsEditOpen(false);
    setIsButtonArray(true);
  };

  const DeleteButtonClick = (commentId: string) => {
    setCommentId(commentId);
    setIsSuccessModalOpen(true);
  };

  const click = (commentId: string) => {
    DeleteCommentMutation.mutate(commentId);
    setCommentId('');
    setIsSuccessModalOpen(false);
  };

  const DeleteCommentMutation = useMutation<void, unknown, string>({
    mutationFn: (commentId) =>
      axiosBaseUrl.delete(`posts/${num}/comments/${commentId}`, {
        parentId: commentId,
      } as CustomAxiosRequestConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getComment', num],
      });
    },
    onError: () => {
      console.error('에러 발생');
    },
  });

  if (!comments) return null;

  console.log(comments);

  return (
    <div>
      {comments.map(({ content, id, user, parent }: commentTypes) => (
        <div key={id}>
          <UserInfo />
          <div className='flex pl-[30px] mb-5 flex-col gap-2.5 items-start justify-end self-stretch'>
            {/* 수정할 댓글의 ID가 일치하면 입력 필드로 변경 */}
            {isEditOpen && CommentId === id ? (
              <EditWithButton
                value={content}
                commentId={id}
                setIsEditOpen={setIsEditOpen}
                CancelButtonOnClick={CancelButtonOnClick}
              />
            ) : (
              <div>
                {parent?.id &&
                comments.find((comment) => comment.id === parent.id) ? (
                  <ReplyWithButton
                    CancelButtonOnClick={CancelButtonOnClick}
                    parentId={id}
                    placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.'
                  />
                ) : (
                  <Comment content={content} />
                )}
              </div>
            )}
            <div className='flex comment-button-array'>
              {isButtonArray && CommentId !== id ? (
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
              ) : (
                ''
              )}
            </div>

            {isReplyOpen && CommentId === id ? (
              <ReplyWithButton
                CancelButtonOnClick={CancelButtonOnClick}
                parentId={id}
                placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.'
              />
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
      <PostSuccessModal
        firstButtonOnClick={() => click(CommentId)}
        SecondButtonOnClick={() => setIsSuccessModalOpen(false)}
        title='선택하신 글을 삭제하시겠어요?'
        content='삭제하면 이 글을 다시 볼 수 없게 돼요.'
        firstButtonText='삭제하기'
        SecondButtonText='취소'
        isLogo={false}
      />
    </div>
  );
};

export default UserInfoWithComment;
