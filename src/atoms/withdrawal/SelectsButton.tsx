import React from 'react';

import Typography from '../../stories/typography/Typography';

interface Detail {
  id: number;
  label: string;
  selected: boolean;
}

interface SelectsButtonProps {
  label: string;
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  details?: Detail[];
  handleSelectDetail: (
    detailId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}
const SelectsButton = ({
  label,
  isSelected,
  onClick,
  details,
  handleSelectDetail,
}: SelectsButtonProps) => {
  return (
    <div>
      <button
        type='button'
        onClick={onClick}
        aria-label={label}
        className={`flex w-full h-[42px] items-center justify-center ${isSelected ? 'bg-[#CCDCFF] border border-[#80A8FF]' : 'bg-[#F9F9FB]'} rounded-xl`}
      >
        <Typography size='sm' weight='Medium' text={label} />
      </button>
      {details && isSelected && (
        <div className='flex flex-col gap-2 mt-[10px]'>
          {details.map((detail) => (
            <button
              key={detail.id}
              type='button'
              onClick={(event) => handleSelectDetail(detail.id, event)}
              aria-label={detail.label}
              className={`flex w-full h-[42px] items-center justify-center ${detail.selected ? 'bg-[#CCDCFF] ' : 'bg-[#F9F9FB]'} rounded-xl`}
            >
              <Typography
                size='sm'
                weight='Medium'
                text={detail.label}
                className='text-[#545760]'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectsButton;
