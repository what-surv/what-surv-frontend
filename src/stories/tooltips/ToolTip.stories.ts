import { ToolTips } from './ToolTip';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ToolTip',
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
