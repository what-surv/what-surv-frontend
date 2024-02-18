import { cva } from 'class-variance-authority';
import React, { useRef, useState, useEffect } from 'react';

import bottomArrow from '../assets/bottom_arraw.svg';
import bottomArrowPrimary from '../assets/bottom_arraw_primary.svg';
import close from '../assets/close.svg';
import topArrow from '../assets/top_arrow.svg';
import Typography from '../typography/Typography';

const DropdownVariants = cva(
  `
  text-sm border font-semibold self-stretch rounded-[400px] bg-[#FAFAFA]
`,
  {
    variants: {
      state: {
        activate: 'border-[#0051FF] text-[#393B41]',
        default: 'border-[#545760] text-[#545760]',
      },
      size: {
        default: 'px-4 py-1.5 gap-2',
        small: 'pl-3 pr-2 gap-1.5 py-1',
      },
    },
  }
);

interface DropdownProps {
  defaultValue: React.ReactNode | string;
  size: 'default' | 'small';
  state: 'activate' | 'default';
  isArrow: boolean;
  isClose: boolean;
  menu: string[];
  value: string[];
  onDropdownChange?: (selectedOption: string) => void;
}

export const Dropdown = ({
  defaultValue,
  isArrow,
  state,
  value,
  menu,
  onDropdownChange,
  ...props
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
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
    setSelectedOption(option);
    setIsOpen(false);
    setDropdownState('activate');
    if (onDropdownChange) {
      // Call onDropdownChange with selected option
      onDropdownChange(option);
    }
  };

  const handleCloseClick = () => {
    setIsOpen(false);
    setDropdownState('default');
  };

  return (
    <div className='relative'>
      <div className='flex'>
        <button
          className={`${DropdownVariants({ state: dropdownState, ...props })} flex`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          type='button'
        >
          <div className='flex items-center gap-2'>
            <Typography size='sm' text={selectedOption} weight='Semibold' />
            {isArrow &&
              dropdownState === 'activate' &&
              (!props.isClose ? (
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={handleCloseClick}
                >
                  <img src={close} alt='close' />
                </button>
              ) : (
                <img src={bottomArrowPrimary} alt='arrow' />
              ))}
            {(!isArrow || dropdownState !== 'activate') &&
              (isOpen ? (
                <img src={topArrow} alt='arrow' className='' />
              ) : (
                <img src={bottomArrow} alt='arrow' />
              ))}
          </div>
        </button>
        <div className='flex'>
          {value.map((item: string) => (
            <div className='flex'>{item}</div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownEl}
          className='absolute bg-[#FAFAFA] mt-1.5 border rounded-2xl border-[#818490] w-full p-0 overflow-hidden z-10'
        >
          {menu.map((item: string) => (
            <button
              key={item}
              className='flex w-full justify-center py-1.5 items-center gap-2.5 self-stretch hover:bg-[#CCDCFF]'
              onClick={() => handleOptionClick(item)}
              type='button'
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
