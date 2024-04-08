import outlineAccount from '../../../assets/account-outline.svg';
import Typography from '../../../stories/typography/Typography';

const UserInfo = ({ nickname }: { nickname: string | null }) => {
  const displayName = nickname || '탈퇴한 유저';

  return (
    <div className='flex items-center self-stretch gap-1'>
      <img src={outlineAccount} alt='계정 로고' className='p-2.5' />
      <Typography
        text={displayName}
        size='sm'
        weight='Semibold'
        lineheight={22}
      />
    </div>
  );
};

export default UserInfo;
