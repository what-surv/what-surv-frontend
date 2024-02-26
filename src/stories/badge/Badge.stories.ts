import { Badge } from './Badge';

import type { Meta, StoryObj } from '@storybook/react';

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
    children: '🔥Hot',
  },
};
