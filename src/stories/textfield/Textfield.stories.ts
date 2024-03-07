import Textfield from './Textfield';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Textfield',
  component: Textfield,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textfield>;

export default meta;

export const Contained: StoryObj<typeof Textfield> = {
  args: {
    onClick: () => {},
    onChange: () => {},
    state: 'default',
  },
};
