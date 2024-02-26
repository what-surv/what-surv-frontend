import { Dropdown } from './Dropdown';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Filter Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

export const Default: StoryObj<typeof Dropdown> = {
  args: {
    defaultValue: '정렬',
    state: 'default',
    isArrow: true,
    menu: [
      { key: 'recent', label: '최신순' },
      { key: 'popular', label: '인기순' },
      { key: 'job', label: '직종순' },
    ],
  },
};

export const Activate: StoryObj<typeof Dropdown> = {
  args: {
    state: 'activate',
    defaultValue: '정렬',
    isArrow: true,
    menu: [
      { key: 'recent', label: '최신순' },
      { key: 'popular', label: '인기순' },
      { key: 'job', label: '직종순' },
    ],
  },
};
