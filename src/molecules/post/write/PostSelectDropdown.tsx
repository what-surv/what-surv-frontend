import { useState } from 'react';

import close from '../../../stories/assets/close-circle.svg';
import { Dropdown } from '../../../stories/dropdown/Dropdown';
import Typography from '../../../stories/typography/Typography';

import '../../../index.css';

interface arrOptionProps {
  key: string;
  label: string;
}

interface PostSelectDropdownProps {
  title: string;
  options: arrOptionProps[];
  onDropdownChange?: (selectedOptions: string) => void;
  toggleDropdownValue?: (selectedOptions: string[]) => void;
  defaultValue: string;
  value: string[] | string;
  oneSelect: boolean;
}

const PostSelectDropdown = ({
  oneSelect,
  title,
  options,
  onDropdownChange,
  toggleDropdownValue,
  value,
  defaultValue,
}: PostSelectDropdownProps) => {
  const [dropdownState, setDropdownState] = useState<'activate' | 'default'>(
    'default'
  );

  const handleDropdownChange = (selectedOptions: string) => {
    if (onDropdownChange) {
      onDropdownChange(selectedOptions);
    }
    // Update dropdown state
    setDropdownState(selectedOptions === defaultValue ? 'default' : 'activate');
  };

  const handleCloseClick = (option: string) => {
    if (Array.isArray(value)) {
      const updatedValue = value.filter((item: string) => item !== option);

      if (updatedValue !== undefined && toggleDropdownValue) {
        toggleDropdownValue(updatedValue);
      }
      // Update dropdown state
      setDropdownState(updatedValue.length === 0 ? 'default' : 'activate');
    }
  };

  return (
    <div className='flex flex-col min-w-[149px] max-w-[485px] fold:w-full iphone:w-[50%] gap-1.5 md:gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <div className='flex gap-1.5'>
        <Dropdown
          isArrow
          state={dropdownState}
          menu={options}
          value={value}
          defaultValue={defaultValue}
          oneSelect={oneSelect}
          onDropdownChange={handleDropdownChange}
          toggleDropdownValue={toggleDropdownValue}
        />
        <div className='flex flex-wrap iphone:w-[calc(100%_-_117px)] overflow-x-auto'>
          <div>
            {!oneSelect && (
              <div className='flex gap-1.5'>
                {Array.isArray(value) &&
                  value.map((DropdownSelectValue: string) => (
                    <div
                      className='flex bg-[#FAFAFA] h-9 md:px-3 py-1 pl-3 pr-2 items-center rounded-[400px] gap-2
      border border-[#0051FF] text-sm font-semibold leading-[22px] text-[#393B41] whitespace-nowrap min-w-[80px] max-w-[150px]'
                      key={DropdownSelectValue}
                    >
                      {options.find(
                        (option) => option.key === DropdownSelectValue
                      )?.label || DropdownSelectValue}
                      <button
                        className='flex min-w-[18px] focus:outline-none'
                        type='button'
                        onClick={() => handleCloseClick(DropdownSelectValue)}
                      >
                        <img src={close} alt='close' />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSelectDropdown;
