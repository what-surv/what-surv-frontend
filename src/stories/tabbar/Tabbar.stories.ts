import { Tabbar } from './Tabbar';

import type { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Tabbar',
  component: Tabbar,
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
      },
    }),
  },
  tags: ['autodocs'],
  decorators: [withRouter],
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
