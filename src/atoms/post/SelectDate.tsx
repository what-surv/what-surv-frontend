import calendar from '../../assets/calendar.svg';
import Typography from '../../stories/typography/Typography';

const SelectDate = () => {
  return (
    <div className='flex px-4 py-1.5 border border-[#818490] rounded-[400px] gap-2 items-center bg-[#FAFAFA]'>
      <Typography size='sm' text='날짜 선택' weight='Semibold' />
      <img src={calendar} alt='딜략 아이콘' />
    </div>
  );
};

export default SelectDate;
