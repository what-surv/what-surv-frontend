import React from 'react';

import bottom from '../assets/tooltip-bottom.svg';
import left from '../assets/tooltip-left.svg';
import right from '../assets/tooltip-right.svg';
import top from '../assets/tooltip-top.svg';

interface ToolTipsProps {
  children: React.ReactNode;
  /** 툴팁 화살표 방향 */
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * 툴팁 컴포넌트
 */

export const ToolTips = ({ children, direction }: ToolTipsProps) => {
  const renderTriangle = () => {
    switch (direction) {
      case 'top':
        return <img src={top} alt={`tooltip-${direction}`} />;
      case 'bottom':
        return (
          <img
            src={bottom}
            className='absolute bottom-0'
            alt={`tooltip-${direction}`}
          />
        );
      case 'left':
        return (
          <img
            src={left}
            className='absolute -left-[2px] top-[50%] -translate-y-1/2'
            alt={`tooltip-${direction}`}
          />
        );
      case 'right':
        return (
          <img
            src={right}
            className='absolute -right-0.5 top-[50%] -translate-y-1/2'
            alt={`tooltip-${direction}`}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className='flex flex-col items-center justify-end'>
      {renderTriangle()}
      <div
        className={`tooltip relative z-50 bg-[#545760] flex items-center justify-center rounded-lg px-[18px] py-2 gap-2.5 ${direction}`}
      >
        <div className='text-[#FAFAFA] -bottom-2.5 w-full'>{children}</div>
      </div>
    </div>
  );
};
