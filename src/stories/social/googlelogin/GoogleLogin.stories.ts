import { GoogleLogin } from './GoogleLogin';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Social/google',
  component: GoogleLogin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GoogleLogin>;

export default meta;

export const Google: StoryObj<typeof GoogleLogin> = {
  args: {
    size: 'default',
  },
};
