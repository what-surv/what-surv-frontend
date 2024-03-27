import CheckBox from './CheckBox';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default meta;

export const Outlined: StoryObj<typeof CheckBox> = {
  args: {
    id: '0',
    checked: false,
    onChange: () => {},
  },
};
