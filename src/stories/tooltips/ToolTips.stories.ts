import { ToolTips } from './ToolTips';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Tooltips',
  component: ToolTips,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolTips>;

export default meta;

export const Top: StoryObj<typeof ToolTips> = {
  args: {
    direction: 'top',
    children: '최근 로그인',
  },
};

export const Bottom: StoryObj<typeof ToolTips> = {
  args: {
    direction: 'bottom',
    children: '최근 로그인',
  },
};
export const Left: StoryObj<typeof ToolTips> = {
  args: {
    direction: 'left',
    children: '최근 로그인',
  },
};
export const Right: StoryObj<typeof ToolTips> = {
  args: {
    direction: 'right',
    children: '최근 로그인',
  },
};

// export const SearchWithNotification: StoryObj<typeof Header> = {
//   name: 'Search With Noti',
//   args: {
//     size: 'mobile',
//     isAccount: false,
//     isArrow: true,
//     isNotification: true,
//     isSearch: true,
//   },
// };
