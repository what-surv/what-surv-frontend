import { Dropdown } from './Dropdown';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
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
      { key: 'all', label: '전체' },
      { key: 'all', label: '전체' },
      { key: 'all', label: '전체' },
    ],
  },
};

export const Activate: StoryObj<typeof Dropdown> = {
  args: {
    state: 'activate',
    defaultValue: '정렬',
    isArrow: true,
    menu: [
      { key: 'all', label: '전체' },
      { key: 'all', label: '전체' },
      { key: 'all', label: '전체' },
    ],
  },
};
