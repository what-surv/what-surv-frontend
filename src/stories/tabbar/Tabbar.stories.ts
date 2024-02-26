import { Tabbar } from './Tabbar';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tabbar',
  component: Tabbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabbar>;

export default meta;

export const Default: StoryObj<typeof Tabbar> = {
  args: {
    size: 'default',
    children: '로고',
  },
};

export const Full: StoryObj<typeof Tabbar> = {
  args: {
    size: 'full',
    children: '로고',
  },
};

export const Mobile: StoryObj<typeof Tabbar> = {
  args: {
    size: 'mobile',
    children: '로고',
  },
};
