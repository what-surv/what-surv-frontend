import { Pagination } from './Pagination';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

export const Desktop: StoryObj<typeof Pagination> = {
  args: {
    percent: 10,
    size: 'desktop',
  },
};
