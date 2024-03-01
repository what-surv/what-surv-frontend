import { Tabbar } from './Tabbar';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tabbar',
  component: Tabbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabbar>;

export default meta;

export const Default: StoryObj<typeof Tabbar> = {
  args: {
    size: 'default',
    isMobileVisible: true,
  },
};

export const Full: StoryObj<typeof Tabbar> = {
  args: {
    size: 'full',
  },
};

export const Mobile: StoryObj<typeof Tabbar> = {
  args: {
    size: 'mobile',
    isMobileVisible: false,
  },
};
