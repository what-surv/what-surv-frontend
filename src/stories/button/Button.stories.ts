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

export const Contained: StoryObj<typeof Button> = {
  args: {
    size: 'default',
    children: '로그인하기',
    state: 'contained',
  },
};

export const Outlined: StoryObj<typeof Button> = {
  args: {
    size: 'default',
    state: 'outlined',
    children: '로그인하기',
    disabled: false,
    hover: false,
    pressed: false,
    focused: false,
    enabled: true,
  },
};
