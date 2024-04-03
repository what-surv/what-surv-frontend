import ko from 'date-fns/locale/ko';
import { useState } from 'react';

import calendar from '../../assets/calendar.svg';
import { WritePageStore } from '../../store/store';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

// eslint-disable-next-line import/order
import { Locale } from 'date-fns';

const SelectDate = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { setEnddate, enddate } = WritePageStore();

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  const today = new Date();

  const isFutureDate = (date: Date) => {
    return date >= today;
  };

  const handleDateChange = (date: Date) => {
    if (!isFutureDate(date)) {
      alert('오늘 이후의 날짜만 선택할 수 있습니다.');
      return;
    }

    setEnddate(date);
    setShowDatePicker(false);
  };

  return (
    <div
      className={`flex cursor-pointer ${enddate ? `border-[#0051FF]` : `border-[#818490]`} pl-3 pr-2 py-1 md:px-4 md:py-1.5 border  rounded-[400px] gap-1 md:gap-2 items-center bg-[#FAFAFA]`}
      aria-hidden
      onClick={handleDateClick}
    >
      <div className='relative flex items-center'>
        <DatePicker
          selected={enddate as Date}
          onChange={handleDateChange}
          locale={ko as unknown as Locale}
          dateFormat='yy.MM.dd'
          placeholderText='날짜 선택'
          className='text-sm outline-none cursor-pointer bg-inherit w-[58px] caret-transparent`'
          filterDate={isFutureDate}
          open={showDatePicker}
          onClickOutside={() => setShowDatePicker(false)}
        />
      </div>
      <img
        src={calendar}
        alt='달력 아이콘'
        onClick={handleDateClick}
        aria-hidden
        className='cursor-pointer'
      />
    </div>
  );
};

export default SelectDate;
