import { cva } from 'class-variance-authority';
import React from 'react';

import chat from '../assets/chat.svg';
import eyeLine from '../assets/eye-line.svg';
import primaryAccount from '../assets/primary-account.svg';
import { Badge } from '../badge/Badge';
import Like from '../like/Like';
import Typography from '../typography/Typography';

const CardVariants = cva(
  `flex p-5 border gap-8 flex-col items-start bg-[#FAFAFA] rounded-2xl`,
  {
    variants: {
      size: {
        main: 'border-[#C1C5CC]',
        small: 'h-[178px] border-2 rounded border-[#80A8FF]',
      },
    },
    defaultVariants: {
      size: 'main',
    },
  }
);

interface CardProps {
  children?: React.ReactNode;
  /** 사이즈  */
  size?: 'main' | 'small';
  /** 마감일  */
  enddate?: string;
}

/**
 * 메인 페이지에서 사용하는 Card 컴포넌트
 */

const Card = ({ size, children, enddate, ...props }: CardProps) => {
  return (
    <div className={`${CardVariants({ size, ...props })}`}>
      <button type='button' className='block w-full'>
        {size === 'small' ? (
          <div className='flex items-start justify-between'>
            <div className='flex items-start justify-between'>
              <Badge size='default' state='main'>
                설문조사
              </Badge>
            </div>
            <div>
              <Badge size='default' state='sub'>
                🔥 Hot
              </Badge>
            </div>
          </div>
        ) : (
          <div className='flex max-w-[302px] justify-between items-center'>
            <div className='flex items-start gap-3'>
              <Badge size='default' state='main'>
                설문조사
              </Badge>
              <Badge size='default' state='sub'>
                New
              </Badge>
            </div>
            <Like onClickCallback={(state: boolean) => console.log(state)} />
          </div>
        )}

        <div className='flex items-start p-0 justify-between my-4 gap-[8px] max-w-[302px]'>
          <div className='flex items-center gap-2'>
            <span className='text-[#676A72] text-sm'>마감일</span>
            <span className='w-[1px] h-[12px] bg-[#545760]' />
            <span className='text-[#676A72] text-sm'>{enddate}</span>
          </div>
          <div className='flex items-center gap-1 text-left '>
            <img src={eyeLine} alt='눈 아이콘' />
            <Typography size='sm' text='99' weight='Regular' />
          </div>
        </div>
        <div className='max-w-[302px] text-left'>
          <Typography size='base' text={children} weight='Semibold' />
        </div>
      </button>
      {size === 'main' ? (
        <div className='max-w-[300px] flex gap-3.5 items-start flex-col'>
          <div className='w-full h-[1px] bg-[#D7DBE2]' />
          <div className='flex items-center w-full gap-3'>
            <img src={primaryAccount} alt='계정 로고 아이콘' />
            <div className='w-[150px] flex'>
              <Typography text='작성자 닉네임' size='base' weight='Semibold' />
            </div>
            <div className='flex gap-1.5 items-center'>
              <div className='flex items-center gap-1 '>
                <img src={eyeLine} alt='눈 아이콘' />
                <div className='flex items-center'>
                  <Typography size='sm' text='99' weight='Regular' />
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <img src={chat} alt='댓글 아이콘' />
                <Typography size='sm' text='99' weight='Regular' />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
