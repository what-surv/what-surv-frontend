import { KakaoLogin } from './KakaoLogin';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Social/kakao',
  component: KakaoLogin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KakaoLogin>;

export default meta;

export const Full: StoryObj<typeof KakaoLogin> = {
  args: {
    size: 'full',
    children: '카카오로 시작하기',
    onClick: () => {},
  },
};

export const Simple: StoryObj<typeof KakaoLogin> = {
  args: {
    size: 'simple',
  },
};
