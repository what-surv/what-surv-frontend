import { cva } from 'class-variance-authority';
import React, { useRef, useState, useEffect } from 'react';

import bottomArrow from '../assets/bottom_arraw.svg';
import bottomArrowPrimary from '../assets/bottom_arraw_primary.svg';
import close from '../assets/close.svg';
import topArrow from '../assets/top_arrow.svg';
import Typography from '../typography/Typography';

const DropdownVariants = cva(
  `
  text-sm border font-semibold self-stretch rounded-[400px] bg-[#FAFAFA] min-w-[79px]
`,
  {
    variants: {
      state: {
        activate: 'border-[#0051FF] text-[#393B41]',
        default: 'border-[#545760] text-[#545760]',
      },
    },
  }
);

interface arrOptionProps {
  key: string;
  label: string;
}

interface DropdownProps {
  defaultValue: React.ReactNode | string;
  state: 'activate' | 'default';
  isArrow: boolean;
  menu: arrOptionProps[];
  value?: string[];
  oneSelect: boolean;
  onDropdownChange: (selectedOption: string) => void;
  toggleDropdownValue?: (deleteOption: string[]) => void;
}

export const Dropdown = ({
  defaultValue,
  isArrow,
  oneSelect,
  state,
  value,
  toggleDropdownValue,
  menu,
  onDropdownChange,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState<string>('');
  const [dropdownState, setDropdownState] = useState<'activate' | 'default'>(
    state
  );
  const dropdownEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownEl.current &&
        !dropdownEl.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    setIsSelected(option);
    setDropdownState('activate');
    if (onDropdownChange) {
      onDropdownChange(option);
    }
  };

  const handleCloseClick = (option: string) => {
    setIsOpen(false);
    setDropdownState('default');
    const updatedValue = value?.filter((item: string) => item !== option);

    if (updatedValue !== undefined && toggleDropdownValue) {
      toggleDropdownValue(updatedValue);
      console.log(updatedValue);
    }
  };

  return (
    <div className='relative'>
      <div className='flex gap-1.5 min-w-[80px]'>
        <button
          className={`${DropdownVariants({ state: dropdownState, ...props })} flex py-1 pl-3 pr-2 md:py-1.5 md:px-3 min-w-[80px]`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          type='button'
        >
          <div className='flex items-center gap-2'>
            <Typography
              size='sm'
              text={oneSelect && isSelected.length ? isSelected : defaultValue}
              weight='Semibold'
            />
            {isArrow && dropdownState === 'activate' ? (
              <img src={bottomArrowPrimary} alt='arrow' />
            ) : (
              ''
            )}
            {(!isArrow || dropdownState !== 'activate') &&
              (isOpen ? (
                <img src={topArrow} alt='arrow' className='' />
              ) : (
                <img src={bottomArrow} alt='arrow' />
              ))}
          </div>
        </button>
        {!oneSelect && (
          <div className='flex gap-1.5'>
            {value?.map((DropdownSelectValue: string) => (
              <div
                className='flex bg-[#FAFAFA] h-9 md:py-1.5 md:px-4 py-1 pl-3 pr-2 items-center rounded-[400px] gap-2
         border border-[#0051FF] text-sm font-semibold leading-[22px] text-[#393B41] min-w-[79px]'
                key={DropdownSelectValue}
              >
                {DropdownSelectValue}
                <button
                  className='focus:outline-none'
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

      {isOpen && (
        <div
          ref={dropdownEl}
          className='absolute bg-[#FAFAFA] mt-1.5 border rounded-2xl border-[#818490] w-full p-0 overflow-hidden z-10'
        >
          {menu.map((arrOptions: arrOptionProps) => (
            <button
              key={arrOptions.key}
              className='flex w-full justify-center py-1.5 items-center gap-2.5 self-stretch hover:bg-[#CCDCFF]'
              onClick={() => handleOptionClick(arrOptions.label)}
              type='button'
            >
              {arrOptions.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
