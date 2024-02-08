import { Header } from './Header';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

export const Default: StoryObj<typeof Header> = {
  args: {
    size: 'default',
    children: '로고',
  },
};

export const Full: StoryObj<typeof Header> = {
  args: {
    size: 'full',
    children: '로고',
  },
};

export const Mobile: StoryObj<typeof Header> = {
  name: 'Mobile Default',
  args: {
    size: 'mobile',
    children: '로고',
    isAccount: true,
    isArrow: false,
    isNotification: false,
  },
};

export const MobileArrow: StoryObj<typeof Header> = {
  name: 'Arrow With Noti & Account',
  args: {
    size: 'mobile',
    children: '로고',
    isAccount: true,
    isArrow: true,
    isNotification: true,
  },
};

export const ArrowWithLogo: StoryObj<typeof Header> = {
  name: 'Only Arrow',
  args: {
    size: 'mobile',
    children: '로고',
    isAccount: false,
    isArrow: true,
    isNotification: false,
  },
};

export const SearchWithNotification: StoryObj<typeof Header> = {
  name: 'Search With Noti',
  args: {
    size: 'mobile',
    isAccount: false,
    isArrow: true,
    isNotification: true,
    isSearch: true,
  },
};
