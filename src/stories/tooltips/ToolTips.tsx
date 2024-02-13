import React from 'react';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// const ToolTipVariants = cva(
//   `
//   relative inline-flex justify-center items-center text-white rounded-[400px] gap-3.5
//   `,
//   {
//     variants: {
//       direction: {
//         top: 'bottom-[calc(100%+10px)] left-[50%] transform -translate-x-1/2 -translate-y-full',
//         bottom:
//           'top-[calc(100%+10px)] left-[50%] transform -translate-x-1/2 translate-y-full',
//         left: 'right-[calc(100%+10px)] top-[50%] transform translate-x-full -translate-y-1/2',
//         right:
//           'left-[calc(100%+10px)] top-[50%] transform -translate-x-full -translate-y-1/2',
//       },
//       size: {
//         default: 'py-3 px-6 h-[50px]',
//         small: 'px-5 py-2 h-10',
//       },
//     },
//     defaultVariants: {
//       size: 'default',
//     },
//   }
// );

interface ToolTipProps {
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

// <div className={`${ToolTipVariants({ size })}`}>
export const ToolTips = ({ children, direction }: ToolTipProps) => {
  return (
    <div>
      <a href='#!' className='my-anchor-element'>
        ◕‿‿◕
      </a>
      <Tooltip anchorSelect='.my-anchor-element' place={direction}>
        {children}
      </Tooltip>
    </div>
  );
};
