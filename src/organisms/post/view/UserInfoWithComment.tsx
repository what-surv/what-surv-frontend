/* eslint-disable react/no-unused-prop-types */
import { useState } from 'react';

import { getComment } from '../../../api/PostApi';
import CommentButton from '../../../atoms/post/CommentButton';
import ReplyWithButton from '../../../molecules/post/view/ReplyWithButton';
import UserInfo from '../../../molecules/post/view/UserInfo';
import reply from '../../../stories/assets/ic_reply.svg';
import Typography from '../../../stories/typography/Typography';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface commentTypes {
  id: string;
  content: string;
}

const UserInfoWithComment = () => {
  const { num } = useParams() as { num: string };
  const { data: comments } = useQuery<commentTypes[]>({
    queryKey: ['getComment', num],
    queryFn: () => getComment(num),
    enabled: true, // 컴포넌트가 마운트될 때 즉시 데이터 가져오기
  });

  const [isReplyOpen, setIsReplyOpen] = useState(false); // 댓글 작성 영역 열림 여부 상태

  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(
    null
  );

  // CommentButton 클릭 시 해당 댓글의 ID를 저장하여 ReplyWithButton 렌더링 여부 결정
  const handleCommentButtonClick = (commentId: string) => {
    setExpandedCommentId(commentId === expandedCommentId ? null : commentId); // 같은 댓글을 연속해서 클릭할 경우 토글

    setIsReplyOpen(true);
  };

  if (!comments) return null;

  console.log(comments);
  return (
    <div>
      {comments.map(({ content, id }: commentTypes) => (
        <div key={id} className=''>
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
              {expandedCommentId !== id && (
                <div>
                  {/* 해당 댓글의 ID와 현재 확장된 댓글의 ID를 비교하여 확장 여부를 결정 */}
                  <CommentButton onClick={() => handleCommentButtonClick(id)}>
                    <img src={reply} alt='답장 아이콘' />
                  </CommentButton>
                </div>
              )}
            </div>

            {/* 확장된 댓글에 대해서만 ReplyWithButton 렌더링 */}
            {isReplyOpen && expandedCommentId === id && (
              <ReplyWithButton placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.' />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserInfoWithComment;
