import { PageIndicator } from './PageIndicator';

import type { Meta, StoryObj } from '@storybook/react';

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
    size: 'desktop',
  },
};

export const Mobile: StoryObj<typeof PageIndicator> = {
  args: {
    page: [
      { isActivate: true, pageNumber: 1 },
      { isActivate: false, pageNumber: 2 },
    ],
    size: 'mobile',
  },
};
