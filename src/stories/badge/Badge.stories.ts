import { Badge } from './Badge';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

export const Contained: StoryObj<typeof Badge> = {
  args: {
    size: 'default',
    children: '설문조사',
    state: 'main',
  },
};

export const Outlined: StoryObj<typeof Badge> = {
  args: {
    size: 'default',
    state: 'sub',
    children: '🔥 Hot',
  },
};
