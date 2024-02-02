import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

export const Large: StoryObj<typeof Button> = {
  args: {
    size: 'small',
  },
};

export const Small: StoryObj<typeof Button> = {
  args: {
    size: 'small',
  },
};
