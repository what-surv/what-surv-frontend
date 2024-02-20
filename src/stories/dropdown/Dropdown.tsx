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

interface arrOptionProps {
  key: string;
  label: string;
}

interface DropdownProps {
  defaultValue: React.ReactNode | string;
  size: 'default' | 'small';
  state: 'activate' | 'default';
  isArrow: boolean;
  menu: arrOptionProps[];
  value: string[] | string;
  oneSelect: boolean;
  onDropdownChange?: (selectedOption: string) => void;
}

export const Dropdown = ({
  defaultValue,
  isArrow,
  oneSelect,
  state,
  value,
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
    if (onDropdownChange) {
      // Remove the selected option from the value array
      const updatedValue = value.filter((item) => item !== option);
      // Call the onDropdownChange function with the updated value array
      onDropdownChange(updatedValue);
    }
    console.log(value);
  };

  return (
    <div className='relative'>
      <div className='flex gap-1.5'>
        <button
          className={`${DropdownVariants({ state: dropdownState, ...props })} flex`}
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
            {value.map((item: string) => (
              <div
                className='flex bg-[#FAFAFA] h-9 py-1.5 px-4 items-center rounded-[400px] gap-2
         border border-[#0051FF] text-sm font-semibold leading-[22px] text-[#393B41]'
                key={item}
              >
                {item}
                <button
                  className='focus:outline-none'
                  type='button'
                  onClick={() => handleCloseClick(item)}
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
          {menu.map((item: arrOptionProps) => (
            <button
              key={item.key}
              className='flex w-full justify-center py-1.5 items-center gap-2.5 self-stretch hover:bg-[#CCDCFF]'
              onClick={() => handleOptionClick(item.label)}
              type='button'
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
