import { NaverLogin } from './NaverLogin';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Social/naver',
  component: NaverLogin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NaverLogin>;

export default meta;

export const Full: StoryObj<typeof NaverLogin> = {
  args: {
    size: 'full',
    children: '네이버로 시작하기',
  },
};

export const Simple: StoryObj<typeof NaverLogin> = {
  args: {
    size: 'simple',
  },
};
