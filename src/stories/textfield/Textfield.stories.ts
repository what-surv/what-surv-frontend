import Textfield from './Textfield';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Textfield',
  component: Textfield,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textfield>;

export default meta;

export const Contained: StoryObj<typeof Textfield> = {
  args: {
    size: 'default',
    children: '로그인하기',
    state: 'contained',
    onClick: () => {},
  },
};

export const Outlined: StoryObj<typeof Textfield> = {
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
