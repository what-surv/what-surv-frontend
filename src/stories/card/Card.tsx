import { cva } from 'class-variance-authority';
import React from 'react';

import icComment from '../assets/ic_comment.svg';
import icEye from '../assets/ic_eye.svg';
import icUser from '../assets/ic_usersvg.svg';
import { Badge } from '../badge/Badge';
import Like from '../like/Like';
import Typography from '../typography/Typography';

const CardVariants = cva(`max-w-[342px] w-full border rounded-[16px] p-5`, {
  variants: {
    size: {
      main: 'border-[#C1C5CC]',
      small: 'border-2 rounded border-[#80A8FF]',
    },
  },
  defaultVariants: {
    size: 'main',
  },
});

interface CardProps {
  children?: React.ReactNode;
  /** 사이즈  */
  size?: 'main' | 'small';
  /** 마감일  */
  enddate?: string;
  onClick: () => void;
}

/**
 * 메인 페이지에서 사용하는 Card 컴포넌트
 */

const Card = ({ size, children, enddate, onClick, ...props }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`${CardVariants({ size, ...props })}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          navigate('/view/0');
        }
      }}
      role='button'
      tabIndex={0}
    >
      {size === 'main' ? (
        <div className='flex w-full items-center justify-between'>
          <div className='flex gap-3'>
            <Badge size='default' state='main'>
              설문조사
            </Badge>
            <Badge size='default' state='sub'>
              New
            </Badge>
          </div>
          <Like onClickCallback={(state: boolean) => console.log(state)} />
        </div>
      ) : (
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <Badge size='default' state='main'>
              설문조사
            </Badge>
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
          <div>
            <Badge size='default' state='sub'>
              🔥Hot
            </Badge>
          </div>
        </div>
      )}

      <div className='flex justify-between'>
        <div className='flex items-center my-4 gap-[8px]'>
          <Typography
            className='text-[#676A72]'
            size='sm'
            text='마감일'
            weight='Regular'
          />
          <span className='w-[1px] h-[12px] bg-[#545760]' />
          <span className='text-[#676A72] text-sm'>{enddate}</span>
        </div>
        {size === 'small' && (
          <div className='flex items-center gap-2'>
            <p className='flex items-center'>
              <img src={icEye} alt='조회수 아이콘' />
            </p>
            <Typography size='sm' text='99' weight='Regular' />
          </div>
        )}
      </div>
      <p className='text-left line-clamp-2'>
        <Typography size='base' text={children} weight='Semibold' />
      </p>
      {size === 'main' && (
        <div className='flex justify-between mt-[14px] mt-9 pt-4 border-t border-[#D7DBE2]'>
          <div className='flex'>
            <p className='mr-[10px]'>
              <img src={icUser} alt='유저 이미지' />
            </p>
            <Typography text='작성자 닉네임' size='base' weight='Semibold' />
          </div>
          <div className='flex items-center gap-2'>
            <p className='flex items-center'>
              <img src={icEye} alt='눈 아이콘' />
            </p>
            <Typography size='sm' text='99' weight='Regular' />
            <p className='flex items-center'>
              <img src={icComment} alt='댓글 아이콘' />
            </p>
            <Typography size='sm' text='99' weight='Regular' />
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
      )}
    </div>
  );
};

export default Card;
