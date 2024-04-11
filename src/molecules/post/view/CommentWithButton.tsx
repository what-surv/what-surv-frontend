import { useEffect, useState } from 'react';

import EditWithButton from './EditWithButton';
import ReplyWithButton from './ReplyWithButton';
import { profileData, UserTypes } from '../../../api/Posttypes';
import { getUserInfoApi } from '../../../api/userCheckApi';
import deleteIcon from '../../../assets/delete.svg';
import edit from '../../../assets/edit-line.svg';
import Comment from '../../../atoms/post/Comment';
import CommentButton from '../../../atoms/post/CommentButton';
import reply from '../../../stories/assets/ic_reply.svg';

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
  setIsReplyOpen: (isReply: boolean) => void;
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
  setIsReplyOpen,
  setIsEditOpen,
  CancelButtonOnClick,
  isReplyOpen,
  ReplyButtonClick,
  EditButtonClick,
  DeleteButtonClick,
}: CommentWithButtonProps) => {
  const [userInfo, setUserInfo] = useState<profileData | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoAPI = await getUserInfoApi();
      setUserInfo(userInfoAPI);
    };
    fetchUserInfo();
  }, []);

  console.log(user);

  const renderedContent =
    content === 'This comment has been removed'
      ? '댓글이 삭제되었습니다.'
      : content;
  return (
    <div className='flex pl-[30px] mb-5 flex-col gap-2.5 items-start justify-end self-stretch'>
      <Comment content={renderedContent} />
      <div className='flex comment-button-array'>
        {content && content !== 'This comment has been removed' && user && (
          <div className='flex gap-2.5'>
            <CommentButton onClick={() => ReplyButtonClick(id)}>
              <img src={reply} alt='답장 아이콘' />
            </CommentButton>
            {userInfo && user && userInfo.id === user.id && (
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
        )}
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
          setIsReplyOpen={setIsReplyOpen}
          CancelButtonOnClick={CancelButtonOnClick}
          parentId={id}
          placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.'
        />
      )}
    </div>
  );
};

export default CommentWithButton;
