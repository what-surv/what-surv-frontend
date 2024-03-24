import BirthDayWriteInput from './BirthDayWriteInput';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/loginpages/BirthDayWriteBox',
  component: BirthDayWriteInput,
  parameters: {
    layout: 'auto',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BirthDayWriteInput>;

export default meta;

export const Default: StoryObj<typeof BirthDayWriteInput> = {
  args: {
    onChange: () => {},
    onFocus: () => {},
    state: false,
    value: '',
    id: '1',
  },
};
