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

// 여기에서 컨테이너 스타일을 정의합니다.
const CardContainerStyle = {
  width: '500px', // 원하는 너비로 조정하세요.
  padding: '20px', // 필요에 따라 패딩 등 추가 스타일을 적용할 수 있습니다.
  boxSizing: 'border-box', // 패딩이 너비에 포함되도록 설정
};

export const Main: StoryObj<typeof Card> = {
  args: {
    children: '제목입니다. 가나다라마바사아자차카타파하. 몇자까지 넣을까',
    enddate: '2024.01.01',
    onClick: () => {},
  },
};
