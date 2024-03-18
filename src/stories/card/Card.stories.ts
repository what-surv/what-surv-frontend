import Card from './Card';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

export const Main: StoryObj<typeof Card> = {
  args: {
    children: '제목입니다. 가나다라마바사아자차카타파하. 몇자까지 넣을까',
    enddate: '2024.01.01',
    onClick: () => {},
  },
};
