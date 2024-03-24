import GenderButton from './GenderButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/loginpages/GenderButton',
  component: GenderButton,
  parameters: {
    layout: 'auto',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GenderButton>;

export default meta;

export const Default: StoryObj<typeof GenderButton> = {
  args: {
    onClick: () => {},
    text: '남자',
    state: false,
  },
};
