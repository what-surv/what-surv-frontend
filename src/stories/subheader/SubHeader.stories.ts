import { SubHeader } from './SubHeader';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/SubHeader',
  component: SubHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SubHeader>;

export default meta;

export const Default: StoryObj<typeof SubHeader> = {
  args: {
    size: 'default',
    children: '로고',
  },
};

export const Full: StoryObj<typeof SubHeader> = {
  args: {
    size: 'full',
    children: '로고',
  },
};

export const Mobile: StoryObj<typeof SubHeader> = {
  args: {
    size: 'mobile',
    children: '로고',
  },
};
