import CommentButton from '../../../atoms/post/CommentButton';
import UserInfo from '../../../molecules/post/view/UserInfo';
import reply from '../../../stories/assets/ic_reply.svg';
import Typography from '../../../stories/typography/Typography';

const UserInfoWithComment = () => {
  return (
    <div>
      <UserInfo />
      <div className='flex pl-[30px] flex-col gap-2.5 items-start justify-end self-stretch'>
        <div className='flex flex-col items-start justify-center gap-4 py-5 px-7 bg-[#E5EEFF]'>
          <Typography
            text='오프라인 장소는 어디서 진행되나요!'
            size='base'
            weight='Semibold'
            lineheight={26}
            className='text-[#242424]'
          />
        </div>
        <div className='flex comment-button-array'>
          <CommentButton>
            <img src={reply} alt='답장 아이콘' />
          </CommentButton>
        </div>
      </div>
    </div>
  );
};

export default UserInfoWithComment;
