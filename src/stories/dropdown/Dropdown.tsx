import { cva } from 'class-variance-authority';
import React, { useRef, useState, useEffect } from 'react';

import bottomArrow from '../assets/bottom_arraw.svg';
import bottomArrowPrimary from '../assets/bottom_arraw_primary.svg';
import close from '../assets/close-circle.svg';
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
  /** 드롭다운 컴포넌트 초기값 */
  defaultValue: React.ReactNode | string;
  /** 드롭다운 활성화 여부(기본 -> default / 활성화 -> Activate) */
  state: 'activate' | 'default';
  /** 드롭다운 컴포넌트에서 위아래 화살표 여부(있음 -> true / 없음 -> false) */
  isArrow: boolean;
  /** 드롭다운 메뉴  */
  menu: arrOptionProps[];
  /** 선택한 드롭다운 값을 담는 배열 */
  value?: string[];
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
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState<string>('');
  const [ages, setAges] = useState<string[]>([]);
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

  const handleOptionClick = (option: arrOptionProps) => {
    setIsOpen(false);
    setIsSelected(option.label);
    setDropdownState('activate');
    if (option.key === 'All') {
      setAges(['전체']);
      onDropdownChange('All');
    } else if (
      !ages.includes(option.label) &&
      !ages.includes('전체') &&
      !value?.includes('All')
    ) {
      setAges((prevAges) => [...prevAges, option.label]);
      onDropdownChange(option.key);
    }
  };

  const handleCloseClick = (option: string) => {
    // const updatedValue = value?.filter((item: string) => item !== option);
    const updatedAge = ages.filter((item: string) => item !== option);
    setAges(updatedAge);
    if (updatedAge.length === 0) {
      setDropdownState('default');
    }

    if (updatedAge !== undefined && toggleDropdownValue) {
      const removedKeys = updatedAge
        .map(
          (removedLabel) =>
            menu.find((item) => item.label === removedLabel)?.key
        )
        .filter((key) => key !== undefined) as string[];
      toggleDropdownValue(removedKeys);
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
        <div className='flex gap-1.5'>
          {!oneSelect && (
            <div className='flex gap-1.5'>
              {ages.map((DropdownSelectValue: string) => (
                <div
                  className='flex  bg-[#FAFAFA] h-9 md:py-1.5 md:px-4 py-1 pl-3 pr-2 items-center rounded-[400px] gap-2
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
      </div>

      {isOpen && (
        <div
          ref={dropdownEl}
          className='absolute max-w-[105px] z-50 bg-[#FAFAFA] mt-1.5 border rounded-2xl border-[#818490] w-full p-0 overflow-hidden'
        >
          {menu.map((arrOptions: arrOptionProps) => (
            <button
              key={arrOptions.key}
              className='flex z-50 w-full justify-center py-1.5 items-center gap-2.5 self-stretch hover:bg-[#CCDCFF]'
              onClick={() => handleOptionClick(arrOptions)}
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
