import Paper from '../../assets/ic-nodata.svg';
import Button from '../../atoms/Button';
import Typography from '../../stories/typography/Typography';

import { useNavigate } from 'react-router-dom';

const Nodata = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col max-w-[342px] w-full min-h-[600px] gap-9 justify-center items-center m-auto'>
      <div className='flex flex-col gap-3 items-center'>
        <img src={Paper} alt='종이 아이콘' className='w-[27px]' />
        <p>
          <Typography
            size='base'
            weight='Semibold'
            text='아직 데이터가 없습니다.'
            className='text-center text-[#393A41]'
          />
        </p>
        <div>
          <Typography
            size='sm'
            weight='Medium'
            text='등록된 게시글이 없습니다. 게시글을 추가하려면'
            className='block text-center text-[#676A72]'
          />
          <Typography
            size='sm'
            weight='Medium'
            text='아래 추가하기 버튼을 눌러주세요!'
            className='block text-center text-[#676A72]'
          />
        </div>
      </div>
      <Button
        onClick={() => {
          navigate('write');
        }}
        className='w-[156px] h-[52px] bg-[#3283FF] rounded-[400px]'
        type='button'
      >
        <Typography
          size='lg'
          weight='Semibold'
          text='글 작성하기'
          className='text-[#FFFFFF]'
        />
      </Button>
    </div>
  );
};

export default Nodata;
