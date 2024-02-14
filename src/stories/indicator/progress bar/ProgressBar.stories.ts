import { ProgressBar } from './ProgressBar';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;

export const Desktop: StoryObj<typeof ProgressBar> = {
  args: {
    percent: 10,
    environment: 'desktop',
  },
};

export const Mobile: StoryObj<typeof ProgressBar> = {
  args: {
    percent: 50,
    environment: 'mobile',
  },
};
