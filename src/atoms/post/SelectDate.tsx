// import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';

import calendar from '../../assets/calendar.svg';
import { WritePageStore } from '../../store/store';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const SelectDate = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(true);
  const [enddate, setEndDate] = useState<Date>();
  const { setEnddate } = WritePageStore();

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  return (
    <div
      className='flex cursor-pointer pl-3 pr-2 py-1 md:px-4 md:py-1.5 border border-[#818490] rounded-[400px] gap-1 md:gap-2 items-center bg-[#FAFAFA]'
      onClick={handleDateClick}
      aria-hidden='true'
    >
      {showDatePicker ? (
        <div className='relative flex items-center'>
          <DatePicker
            selected={enddate}
            onChange={(date: Date) => {
              setShowDatePicker(false);
              setEnddate(date);
              setEndDate(date);
            }}
            dateFormat='yy.MM.dd'
            placeholderText='날짜 선택'
            className='text-sm outline-none cursor-pointer bg-inherit w-[57px] caret-transparent'
          />
        </div>
      ) : null}
      <img src={calendar} alt='달력 아이콘' />
    </div>
  );
};

export default SelectDate;
