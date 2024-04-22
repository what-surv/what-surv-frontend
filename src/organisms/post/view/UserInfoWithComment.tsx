/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unused-prop-types */
import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

import { axiosBaseUrl } from '../../../api/axiosConfig';
import { getComment } from '../../../api/PostApi';
import { profileTypes, UserTypes } from '../../../api/Posttypes';
import { getUserInfoApi } from '../../../api/userCheckApi';
import CommentWithButton from '../../../molecules/post/view/CommentWithButton';
import UserInfo from '../../../molecules/post/view/UserInfo';
import { SuccessModalStore } from '../../../store/store';
import LoginAlertModal from '../../LoginAlertModal';
import PostSuccessModal from '../write/PostSuccessModal';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { data: comments } = useQuery<commentTypes[]>({
    queryKey: ['getComment', num],
    queryFn: () => getComment(num),
    enabled: true, // 컴포넌트가 마운트될 때 즉시 데이터 가져오기
  });

  const { data: profile } = useQuery<profileTypes>({
    queryKey: ['profile'],
    queryFn: () => axiosBaseUrl.get(`auth/profile`),
    retry: 0,
  });

  const [isReplyOpen, setIsReplyOpen] = useState(false); // 댓글 작성 영역 열림 여부 상태

  // LoginAlertModal을 제어하기 위한 상태
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false); // 수정 버튼 상태
  const [commentId, setCommentId] = useState<string>(''); // 수정할 댓글의 ID를 저장하는 상태

  // 수정 버튼 클릭 시 해당 댓글의 ID를 저장하고 수정 모드를 활성화
  const EditButtonClick = (id: string) => {
    setCommentId(id); // 수정할 댓글의 ID를 상태에 저장
    setIsEditOpen(true);
    setIsReplyOpen(false);
  };

  // eslint-disable-next-line consistent-return
  const ReplyButtonClick = async (id: string) => {
    try {
      const userInfo = await getUserInfoApi();
      if (userInfo === false) {
        setShowLoginAlert(true);
        return null;
      }

      setCommentId(id);
      setIsReplyOpen(true);
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 수정이나 답장에서 취소 버튼 클릭
  const CancelButtonOnClick = () => {
    setCommentId(''); // 수정할 댓글의 ID를 초기화
    setIsReplyOpen(false);
    setIsEditOpen(false);
  };

  const DeleteButtonClick = (id: string) => {
    setCommentId(id);
    setIsSuccessModalOpen(true);
  };

  const click = (id: string) => {
    DeleteCommentMutation.mutate(id);
    setCommentId('');
    setIsSuccessModalOpen(false);
  };
  // 댓글 삭제 Mutation
  const DeleteCommentMutation = useMutation<void, unknown, string>({
    mutationFn: (id) =>
      axiosBaseUrl.delete(`posts/${num}/comments/${id}`, {
        parentId: id,
      } as CustomAxiosRequestConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getComment', num],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (!comments) return null;

  const renderComments = (
    commentsArray: commentTypes[],
    parentId?: string,
    depth: number = 0
  ) =>
    commentsArray
      .filter((comment) => comment.parent?.id === parentId)
      .map(({ id, ...comment }) => (
        <div key={id} className={`${depth > 0 && depth > 1 ? `` : `ml-5`}`}>
          <UserInfo
            nickname={
              comment.user === null ? '탈퇴한 유저' : comment.user.nickname
            }
          />
          <CommentWithButton
            {...comment}
            id={id}
            userId={profile?.data.id}
            isEditOpen={isEditOpen}
            commentId={commentId}
            setIsEditOpen={setIsEditOpen}
            CancelButtonOnClick={CancelButtonOnClick}
            ReplyButtonClick={ReplyButtonClick}
            EditButtonClick={EditButtonClick}
            DeleteButtonClick={DeleteButtonClick}
            setIsReplyOpen={setIsReplyOpen}
            isReplyOpen={isReplyOpen}
          />
          {/* 댓글 컴포넌트 재귀식으로 호출 */}
          {renderComments(
            comments.filter((c) => c.parent?.id === id),
            id,
            depth + 1
          )}
        </div>
      ));

  return (
    <div>
      {renderComments(comments)}
      <div>
        <PostSuccessModal
          firstButtonOnClick={() => click(commentId)}
          SecondButtonOnClick={() => setIsSuccessModalOpen(false)}
          title='선택하신 댓글을 삭제하시겠어요?'
          content='삭제하면 이 글을 다시 볼 수 없게 돼요.'
          firstButtonText='삭제하기'
          SecondButtonText='취소'
          isLogo={false}
        />
      </div>
      <LoginAlertModal
        isOpen={showLoginAlert}
        handleClose={() => setShowLoginAlert(false)}
        goLogin={() => {
          navigate('/login');
        }}
      />
    </div>
  );
};

export default UserInfoWithComment;
