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
    children: '정렬',
    state: 'default',
    isArrow: true,
    value: ['최신순', '인기순', '직종순'],
  },
};

export const Activate: StoryObj<typeof Dropdown> = {
  args: {
    state: 'activate',
    children: '정렬',
    isArrow: true,
    value: ['최신순', '인기순', '직종순'],
  },
};
