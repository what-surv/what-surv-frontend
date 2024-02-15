import { PageIndicator } from './PageIndicator';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Page Indicator',
  component: PageIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageIndicator>;

export default meta;

export const Desktop: StoryObj<typeof PageIndicator> = {
  args: {
    page: [
      { isActivate: true, pageNumber: 1 },
      { isActivate: false, pageNumber: 2 },
    ],
    environment: 'desktop',
  },
};

export const Mobile: StoryObj<typeof PageIndicator> = {
  args: {
    page: [
      { isActivate: true, pageNumber: 1 },
      { isActivate: false, pageNumber: 2 },
    ],
    environment: 'mobile',
  },
};
