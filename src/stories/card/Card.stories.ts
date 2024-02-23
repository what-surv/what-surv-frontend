import Card from './Card';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

export const Top: StoryObj<typeof Card> = {
  args: {
    direction: 'tt',
    children: 'tt',
  },
};

export const Bottom: StoryObj<typeof Card> = {
  args: {
    direction: 'bottom',
    children: 'tt',
  },
};
