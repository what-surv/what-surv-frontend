import Typography from './Typography';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;

// export const Xxlarge: Story = {
//   args: {
//     weight: 'bold',
//     scale: 'Small',
//     size: 32,
//     typeface: 'pretendard',
//     lineheight: 44,
//   },
// };

// export const Xlarge: Story = {
//   args: {
//     weight: 'Semibold',
//     scale: 'Small',
//     size: 'xs',
//     typeface: 'pretendard',
//     lineheight: 44,
//   },
// };

export const Large: StoryObj<typeof Typography> = {
  args: {
    weight: 'Medium',
    size: 'base',
    text: '리서치 참여자 모집이 힘든 당신을 위해. 왓썹 what surv',
  },
};

export const Medium: StoryObj<typeof Typography> = {
  args: {
    weight: 'Medium',
    size: 'sm',
    text: '리서치 참여자 모집이 힘든 당신을 위해. 왓썹 what surv',
  },
};

export const Small: StoryObj<typeof Typography> = {
  args: {
    weight: 'Bold',
    size: 'xs',
    text: '리서치 참여자 모집이 힘든 당신을 위해. 왓썹 what surv',
  },
};

// export const XSmall: Story = {
//   args: {
//     weight: 'normal',
//     scale: 'Small',
//     size: 12,
//     typeface: 'pretendard',
//     lineheight: 44,
//   },
// };
