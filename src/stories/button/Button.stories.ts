import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

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
    onClick: () => {},
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
