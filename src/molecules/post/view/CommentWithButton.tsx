import fillAccount from '../../../assets/account-fill.svg';

const CommentWithButton = () => {
  return (
    <div className='flex items-start self-stretch w-full gap-2'>
      <img
        src={fillAccount}
        alt='계정 아이콘'
        className='p-2.5 gap-2.5 flex items-center justify-center'
      />
    </div>
  );
};

export default CommentWithButton;
