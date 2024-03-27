import Like from './Like';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Like',
  component: Like,

  tags: ['autodocs'],
} satisfies Meta<typeof Like>;

export default meta;

export const Contained: StoryObj<typeof Like> = {
  args: {
    onClick: () => {},
    isLiked: false,
  },
};
