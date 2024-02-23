import Like from './Like';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Like',
  component: Like,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Like>;

export default meta;

export const Contained: StoryObj<typeof Like> = {
  args: {
    onClickCallback: () => {},
  },
};
