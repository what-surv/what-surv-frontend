import style from './floatingStyle.module.css';
import floating from '../assets/ic-floating.svg';
import Typography from '../typography/Typography';

interface FloatingProps {
  onClick: () => void;
}
const FloatingButton = ({ onClick }: FloatingProps) => {
  return (
    <button
      type='button'
      aria-label='글 작성하기'
      onClick={onClick}
      className={style.floatingButton}
    >
      <div className={style.textBox}>
        <Typography size='lg' weight='Semibold' text='글 작성하기' />
      </div>

      <div className='relative flex items-center justify-center w-[50px] h-[50px]'>
        <img src={floating} alt='글쓰기 아이콘' className='relative ' />
      </div>
    </button>
  );
};

export default FloatingButton;
