import { cva } from 'class-variance-authority';
import React, { useState, useRef, useEffect } from 'react';

import bottomArrow from '../assets/bottom_arraw.svg';
import bottomArrowPrimary from '../assets/bottom_arraw_primary.svg';
import close from '../assets/close.svg';

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

interface ButtonProps {
  children: React.ReactNode;
  size: 'default' | 'small';
  state: 'activate' | 'default';
  isArrow: boolean;
  isClose: boolean;
  value: string[];
}

export const Dropdown = ({
  children,
  isArrow,
  state,
  value,
  ...props
}: ButtonProps) => {
  const [selectedOption, setSelectedOption] = useState(children);
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

  const handleOptionClick = (option: React.ReactNode) => {
    setSelectedOption(option);
    setIsOpen(false);
    setDropdownState('activate');
  };

  const handleCloseClick = () => {
    setIsOpen(false);
    setSelectedOption(children);
    setDropdownState('default');
  };

  return (
    <div className='relative'>
      <button
        className={`${DropdownVariants({ state: dropdownState, ...props })}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        type='button'
      >
        <div className='flex items-center gap-2'>
          <span>{selectedOption}</span>
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
          {(!isArrow || dropdownState !== 'activate') && (
            <img src={bottomArrow} alt='arrow' />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          ref={dropdownEl}
          className='mt-1.5 border border-[#545760] rounded-2xl  w-inherit p-0 overflow-hidden'
        >
          {value.map((item: string) => (
            <button
              className='flex w-full justify-center py-1.5 items-center gap-2.5 self-stretch hover:bg-[#CCDCFF]'
              onClick={() => handleOptionClick(item)}
              type='button'
            >
              <span className='text-sm font-semibold text-[#545760]'>
                {item}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};