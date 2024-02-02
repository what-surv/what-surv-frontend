import { KakaoLogin } from './KakaoLogin';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Social/kakao',
  component: KakaoLogin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KakaoLogin>;

export default meta;

export const Kakao: StoryObj<typeof KakaoLogin> = {
  args: {
    size: 'default',
  },
};
