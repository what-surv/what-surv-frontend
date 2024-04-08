import { cva } from 'class-variance-authority';
import React, { useRef, useState, useEffect } from 'react';

import bottomArrow from '../assets/bottom_arraw.svg';
import bottomArrowPrimary from '../assets/bottom_arraw_primary.svg';
import topArrow from '../assets/top_arrow.svg';
import Typography from '../typography/Typography';

const DropdownVariants = cva(
  `
  border font-semibold rounded-[400px] bg-[#FAFAFA] flex whitespace-nowrap py-1.5 px-3 min-w-[78px]
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
  /** 드롭다운 컴포넌트 초기값 */
  defaultValue: React.ReactNode | string;
  /** 드롭다운 활성화 여부(기본 -> default / 활성화 -> Activate) */
  state: 'activate' | 'default';
  /** 드롭다운 컴포넌트에서 위아래 화살표 여부(있음 -> true / 없음 -> false) */
  isArrow: boolean;
  /** 드롭다운 메뉴  */
  menu: arrOptionProps[];
  /** 선택한 드롭다운 값을 담는 배열 */
  value?: string[] | string;
  /** 하나만 선택할 수 있는 드롭다운 여부(하나만 선택 가능 -> true / 아니면 -> false */
  oneSelect: boolean;
  /** 드롭다운 선택 시 값 전달해주는 함수 props */
  onDropdownChange: (selectedOption: string) => void;
  /** x 이미지 클릭했을 때 배열에서 값 삭제하는 함수  */
  toggleDropdownValue?: (deleteOption: string[]) => void;
}

/**
 * 드롭다운 컴포넌트
 */

export const Dropdown = ({
  defaultValue,
  isArrow,
  oneSelect,
  state,
  value,
  toggleDropdownValue,
  menu,
  onDropdownChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownEl = useRef<HTMLDivElement>(null);

  // 드롭다운 바깥 클릭 감지를 위한 이벤트 리스너
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

  const handleOptionClick = (option: arrOptionProps) => {
    setIsOpen(false);

    // 전체를 선택한 경우
    if (option.key === 'All') {
      onDropdownChange('All');
      if (toggleDropdownValue) {
        toggleDropdownValue(['All']);
      }
    } else if (Array.isArray(value)) {
      if (!value.includes(option.label) && !value.includes('All')) {
        const updatedValue = value.filter(
          (item: string) => item !== option.key
        );
        updatedValue.sort();
        if (updatedValue !== undefined && toggleDropdownValue) {
          toggleDropdownValue(updatedValue);
        }
        onDropdownChange(option.key);
      }
    } else {
      onDropdownChange(option.key);
    }
  };

  return (
    <div className='relative'>
      <button
        className={`${DropdownVariants({ state })} `}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        type='button'
      >
        <div className='flex items-center gap-1 md:gap-2'>
          <Typography
            size='sm'
            text={
              oneSelect && value
                ? menu.find((option) => option.key === value)?.label || value
                : defaultValue
            }
            weight='Semibold'
          />
          {isArrow && state === 'activate' ? (
            <img src={bottomArrowPrimary} alt='arrow' />
          ) : (
            ''
          )}
          {(!isArrow || state !== 'activate') &&
            (isOpen ? (
              <img src={topArrow} alt='arrow' />
            ) : (
              <img src={bottomArrow} alt='arrow' />
            ))}
        </div>
      </button>
      {isOpen && (
        <div
          ref={dropdownEl}
          className='absolute w-full max-w-[105px] z-50 bg-[#FAFAFA] mt-1.5 border rounded-2xl border-[#818490] p-0 overflow-hidden '
        >
          {menu.map((option: arrOptionProps) => (
            <button
              key={option.key}
              className='flex w-full justify-center py-1.5 items-center gap-2.5 self-stretch hover:bg-[#CCDCFF] transition-all duration-150 ease-out'
              onClick={() => handleOptionClick(option)}
              type='button'
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
