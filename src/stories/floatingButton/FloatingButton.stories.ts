import FloatingButton from './FloatingButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingButton>;

export default meta;

export const Outlined: StoryObj<typeof FloatingButton> = {
  args: {
    onClick: () => {},
  },
};
