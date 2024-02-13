// import React from 'react';

// import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';

// // const ToolTipVariants = cva(
// //   `
// //   relative inline-flex justify-center items-center text-white rounded-[400px] gap-3.5
// //   `,
// //   {
// //     variants: {
// //       direction: {
// //         top: 'bottom-[calc(100%+10px)] left-[50%] transform -translate-x-1/2 -translate-y-full',
// //         bottom:
// //           'top-[calc(100%+10px)] left-[50%] transform -translate-x-1/2 translate-y-full',
// //         left: 'right-[calc(100%+10px)] top-[50%] transform translate-x-full -translate-y-1/2',
// //         right:
// //           'left-[calc(100%+10px)] top-[50%] transform -translate-x-full -translate-y-1/2',
// //       },
// //       size: {
// //         default: 'py-3 px-6 h-[50px]',
// //         small: 'px-5 py-2 h-10',
// //       },
// //     },
// //     defaultVariants: {
// //       size: 'default',
// //     },
// //   }
// // );

// interface ToolTipProps {
//   children: React.ReactNode;
//   direction?: 'top' | 'bottom' | 'left' | 'right';
// }

// // <div className={`${ToolTipVariants({ size })}`}>
// export const ToolTips = ({ children, direction }: ToolTipProps) => {
//   return (
//     <div className='my-anchor-element'>
//       <Tooltip
//         anchorSelect='.my-anchor-element'
//         className='bg-[#545760] text-sm font-medium leading-[22px] rounded-lg'
//         place={direction}
//       >
//         {children}
//       </Tooltip>
//       ㅇㅇ
//     </div>
//   );
// };

import React from 'react';
import './Tooltip.css';

import bottom from '../assets/tooltip-bottom.svg';
import left from '../assets/tooltip-left.svg';
import right from '../assets/tooltip-right.svg';
import top from '../assets/tooltip-top.svg';

interface ToolTipsProps {
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

export const ToolTips = ({ children, direction }: ToolTipsProps) => {
  const renderTriangle = () => {
    switch (direction) {
      case 'top':
        return <img src={top} alt={`tooltip-${direction}`} />;
      case 'bottom':
        return <img src={bottom} alt={`tooltip-${direction}`} />;
      case 'left':
        return <img src={left} alt={`tooltip-${direction}`} />;
      case 'right':
        return <img src={right} alt={`tooltip-${direction}`} />;
      default:
        return null;
    }
  };
  return (
    <div className='flex flex-col justify-end items-center'>
      {renderTriangle()}
      <div
        className={`tooltip z-50 bg-[#545760] flex items-center justify-center rounded-lg px-[18px] py-2 gap-2.5 ${direction}`}
      >
        <div className='text-[#FAFAFA] w-full'>{children}</div>
      </div>
    </div>
  );
};
