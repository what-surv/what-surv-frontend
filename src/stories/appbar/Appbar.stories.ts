import { Appbar } from './Appbar';

import type { Meta, StoryObj } from '@storybook/react';
import {
  withRouter,
  reactRouterParameters,
} from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Components/Appbar',
  component: Appbar,
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
} satisfies Meta<typeof Appbar>;

export default meta;

export const Default: StoryObj<typeof Appbar> = {
  args: {
    isLogo: true,
    isAccount: true,
  },
};

export const Mobile: StoryObj<typeof Appbar> = {
  name: 'MainPage Mobile Default',
  args: {
    size: 'mobile',
    isAccount: true,
    isSearch: true,
    isLogo: true,
    isFullLogo: true,
  },
};

export const MobileArrow: StoryObj<typeof Appbar> = {
  name: 'Logo With Account',
  args: {
    isAccount: true,
    children: '게시글 작성하기',
    isTextCenter: true,
    size: 'mobile',
    isLogo: true,
  },
};

export const ArrowWithLogo: StoryObj<typeof Appbar> = {
  name: 'Only Arrow with Logo',
  args: {
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

export const TextCenterWithClose: StoryObj<typeof Appbar> = {
  name: 'Text-Center With Close',
  args: {
    children: '회원 탈퇴',
    isClose: true,
    isTextCenter: true,
    isLogo: true,
    isAccount: true,
    isSearch: true,
  },
};
