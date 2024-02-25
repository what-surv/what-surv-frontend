import { ProgressBar } from './ProgressBar';

import type { Meta, StoryObj } from '@storybook/react';

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
    size: 'desktop',
  },
};

export const Mobile: StoryObj<typeof ProgressBar> = {
  args: {
    percent: 50,
    size: 'mobile',
  },
};
