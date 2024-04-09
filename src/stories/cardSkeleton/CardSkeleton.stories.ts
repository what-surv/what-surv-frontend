import CardSkeleton from './CardSkeleton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/CardSkeleton',
  component: CardSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CardSkeleton>;

export default meta;

export const Contained: StoryObj<typeof CardSkeleton> = {
  args: {
    type: 'default',
  },
};
