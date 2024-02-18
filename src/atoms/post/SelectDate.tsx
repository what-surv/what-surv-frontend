// import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';

import calendar from '../../assets/calendar.svg';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

interface DateTypes {
  date: Date;
}

const SelectDate = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(true);
  const { control } = useForm<DateTypes>({});

  const handleDateClick = () => {
    setShowDatePicker(true);
  };

  return (
    <div
      className='flex cursor-pointer px-4 py-1.5 border border-[#818490] rounded-[400px] gap-2 items-center bg-[#FAFAFA]'
      onClick={handleDateClick}
      aria-hidden='true'
    >
      {showDatePicker ? (
        <div className='relative flex items-center'>
          <Controller
            control={control}
            name='date'
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setShowDatePicker(false);
                }}
                dateFormat='yy.MM.dd'
                placeholderText='날짜 선택'
                className='text-sm outline-none cursor-pointer bg-inherit w-[57px] caret-transparent'
              />
            )}
          />
        </div>
      ) : null}
      <img src={calendar} alt='달력 아이콘' />
    </div>
  );
};

export default SelectDate;
