import { useState } from 'react';

import CommentButton from '../../../atoms/post/CommentButton';
import ReplyWithButton from '../../../molecules/post/view/ReplyWithButton';
import UserInfo from '../../../molecules/post/view/UserInfo';
import reply from '../../../stories/assets/ic_reply.svg';
import Typography from '../../../stories/typography/Typography';

const UserInfoWithComment = () => {
  const [isReplyOpen, setIsReplyOpen] = useState(false); // 댓글 작성 영역 열림 여부 상태

  // CommentButton 클릭 시 ReplyWithButton 렌더링 함수
  const handleCommentButtonClick = () => {
    setIsReplyOpen(true);
  };
  return (
    <div>
      <UserInfo />
      <div className='flex pl-[30px] flex-col gap-2.5 items-start justify-end self-stretch'>
        <div className='flex flex-col rounded-lg items-start justify-center gap-4 py-5 px-7 bg-[#E5EEFF]'>
          <Typography
            text='오프라인 장소는 어디서 진행되나요!'
            size='base'
            weight='Semibold'
            lineheight={26}
            className='text-[#242424]'
          />
        </div>
        <div className='flex comment-button-array'>
          {!isReplyOpen && (
            <CommentButton onClick={handleCommentButtonClick}>
              <img src={reply} alt='답장 아이콘' />
            </CommentButton>
          )}
        </div>

        {isReplyOpen && (
          <ReplyWithButton placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.' />
        )}
      </div>
    </div>
  );
};

export default UserInfoWithComment;
