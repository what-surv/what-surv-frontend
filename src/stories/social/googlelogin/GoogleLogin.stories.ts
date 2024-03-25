import { GoogleLogin } from './GoogleLogin';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Social/google',
  component: GoogleLogin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GoogleLogin>;

export default meta;

export const Full: StoryObj<typeof GoogleLogin> = {
  args: {
    size: 'full',
    children: '구글로 시작하기',
    onClick: () => {},
  },
};

export const Simple: StoryObj<typeof GoogleLogin> = {
  args: {
    size: 'simple',
  },
};
