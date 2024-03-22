import Footer from './Footer';

import type { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Footer',
  component: Footer,
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
} satisfies Meta<typeof Footer>;

export default meta;

export const Outlined: StoryObj<typeof Footer> = {
  args: {
    test: '1',
  },
};
