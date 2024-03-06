/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unused-prop-types */
import { useState } from 'react';

import { axiosBaseUrl } from '../../../api/axiosConfig';
import { getComment } from '../../../api/PostApi';
import { profileTypes, UserTypes } from '../../../api/Posttypes';
import deleteIcon from '../../../assets/delete.svg';
import edit from '../../../assets/edit-line.svg';
import CommentButton from '../../../atoms/post/CommentButton';
import CommentWithButton from '../../../molecules/post/view/CommentWithButton';
import ReplyWithButton from '../../../molecules/post/view/ReplyWithButton';
import UserInfo from '../../../molecules/post/view/UserInfo';
import reply from '../../../stories/assets/ic_reply.svg';
import Typography from '../../../stories/typography/Typography';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface commentTypes {
  id: string;
  content: string;
  user: UserTypes;
}

const UserInfoWithComment = () => {
  const { num } = useParams() as { num: string };
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
  const [isEditOpen, setIsEditOpen] = useState(false); // 댓글 작성 영역 열림 여부 상태
  const [editCommentId, setEditCommentId] = useState<string | null>(null); // CommentWithButton 컴포넌트의 렌더링 여부 상태

  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(
    null
  );

  // CommentButton 클릭 시 해당 댓글의 ID를 저장하여 ReplyWithButton 렌더링 여부 결정
  const ReplyButtonClick = (commentId: string) => {
    setExpandedCommentId(commentId === expandedCommentId ? null : commentId); // 같은 댓글을 연속해서 클릭할 경우 토글

    setIsReplyOpen(!isReplyOpen);
  };

  const handleEditButtonClick = (commentId: string) => {
    setEditCommentId(commentId); // 수정할 댓글의 ID를 상태에 저장
    setIsEditOpen(!isEditOpen);
  };

  if (!comments) return null;
  console.log(comments);

  return (
    <div>
      {comments.map(({ content, id, user }: commentTypes) => (
        <div key={id}>
          <UserInfo />
          <div className='flex pl-[30px] mb-5 flex-col gap-2.5 items-start justify-end self-stretch'>
            <div className='flex flex-col rounded-lg items-start justify-center gap-4 py-5 px-7 bg-[#E5EEFF]'>
              <Typography
                text={content}
                size='base'
                weight='Semibold'
                lineheight={26}
                className='text-[#242424]'
              />
            </div>

            <div className='flex comment-button-array'>
              <div className='flex gap-2.5'>
                <CommentButton onClick={() => ReplyButtonClick(id)}>
                  <img src={reply} alt='답장 아이콘' />
                </CommentButton>

                {/* 수정 버튼 클릭 여부를 확인하여 해당 댓글에만 수정 버튼을 숨기거나 보여줌 */}
                {profile?.data.id === user.id && (
                  <div className='flex gap-2.5'>
                    <CommentButton onClick={() => handleEditButtonClick(id)}>
                      <img src={edit} alt='수정 아이콘' />
                    </CommentButton>
                    <CommentButton onClick={() => setIsReplyOpen(true)}>
                      <img src={deleteIcon} alt='삭제 아이콘' />
                    </CommentButton>
                  </div>
                )}
              </div>
            </div>
            {/* 수정 버튼 클릭 여부를 확인하여 해당 댓글에만 CommentWithButton을 렌더링 */}
            {isEditOpen && editCommentId === id && <CommentWithButton />}

            {isReplyOpen && expandedCommentId === id && (
              <ReplyWithButton
                parentId={id}
                placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.'
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserInfoWithComment;
