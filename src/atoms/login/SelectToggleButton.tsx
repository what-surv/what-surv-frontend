import React from 'react';

import Typography from '../../stories/typography/Typography';

interface SelectsButtonProps {
  label: string;
  isSelected: boolean;
  // eslint-disable-next-line no-undef
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const SelectToggleButton = ({
  label,
  isSelected,
  onClick,
}: SelectsButtonProps) => {
  return (
    <div>
      <button
        type='button'
        onClick={onClick}
        aria-label={label}
        className={`flex w-full h-[42px] items-center justify-center ${!isSelected ? 'bg-[#C1C5CC]' : 'bg-[#3283FF]'} rounded-xl transition-all duration-300 ease-in-out`}
      >
        <Typography
          size='sm'
          weight='Medium'
          text={label}
          className='text-[#FFFFFF]'
        />
      </button>
    </div>
  );
};

export default SelectToggleButton;
