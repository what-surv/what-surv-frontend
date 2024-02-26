import { Appbar } from './Appbar';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Appbar',
  component: Appbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Appbar>;

export default meta;

export const Default: StoryObj<typeof Appbar> = {
  args: {
    children: '',
    isLogo: true,
  },
};

export const Full: StoryObj<typeof Appbar> = {
  args: {
    children: '',
    size: 'full',
  },
};

export const Mobile: StoryObj<typeof Appbar> = {
  name: 'Mobile Default',
  args: {
    children: '로고',
    size: 'mobile',
    isAccount: true,
    isArrow: false,
    isNotification: false,
  },
};

export const MobileArrow: StoryObj<typeof Appbar> = {
  name: 'Logo With Account',
  args: {
    isAccount: true,
    size: 'mobile',
    isLogo: true,
  },
};

export const ArrowWithLogo: StoryObj<typeof Appbar> = {
  name: 'Only Arrow with Logo',
  args: {
    children: '',
    isAccount: false,
    isArrow: true,
    isNotification: false,
    isLogo: true,
  },
};

export const SearchWithNotification: StoryObj<typeof Appbar> = {
  name: 'Search With Noti',
  args: {
    isAccount: false,
    size: 'mobile',
    isArrow: true,
    isNotification: true,
    isSearch: true,
  },
};
