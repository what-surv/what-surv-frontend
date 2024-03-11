import { cva } from 'class-variance-authority';
import React from 'react';

import icComment from '../assets/ic_comment.svg';
import icEye from '../assets/ic_eye.svg';
import icUser from '../assets/ic_usersvg.svg';
import { Badge } from '../badge/Badge';
import Typography from '../typography/Typography';

const CardVariants = cva(
  `relative max-w-[342px] w-full border rounded-[16px] p-5 bg-[#FFF] transition-all duration-150 ease-out hover:scale-[1.02] z-10`,
  {
    variants: {
      size: {
        main: 'border-[#C1C5CC]',
        small: 'border-2 rounded border-[#80A8FF]',
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

  /** 게시글 ID */
  id: number;

  /** 유저 닉네임 */
  nickname: string;

  /** 게시글 작성 일  */
  createdAt: string;

  /** 마감일  */
  enddate?: string;

  /** 조회수 */
  viewCount: number;

  /** 댓글수 */
  commentCount: number;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

// 메인 페이지에서 사용하는 Card 컴포넌트

const Card = ({
  id,
  size,
  children,
  createdAt,
  enddate,
  nickname,
  viewCount,
  commentCount,
  onClick,
  onKeyDown,
  ...props
}: CardProps) => {
  // 현재 시간을 가져오기
  const currentTime: Date = new Date();

  // 게시글이 생성된 날짜를 Date 객체로 변환
  const postCreatedAt: Date = new Date(createdAt);

  // 게시글이 생성된 후 48시간 이내인지 확인
  const isPostNew: boolean =
    currentTime.getTime() - postCreatedAt.getTime() < 48 * 60 * 60 * 1000;
  return (
    <div
      onClick={onClick}
      className={`${CardVariants({ size, ...props })}`}
      onKeyDown={onKeyDown}
      role='button'
      tabIndex={id}
    >
      {size === 'main' ? (
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-3'>
            <Badge size='default' state='main'>
              설문조사
            </Badge>
            {isPostNew && (
              <Badge size='default' state='sub'>
                New
              </Badge>
            )}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <Badge size='default' state='main'>
              설문조사
            </Badge>
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
            weight='Medium'
          />
          <span className='w-[1px] h-[12px] bg-[#545760]' />
          <Typography
            className='text-[#676A72]'
            size='sm'
            text={enddate}
            weight='Medium'
          />
        </div>
        {size === 'small' && (
          <div className='flex items-center gap-2'>
            <p className='flex items-center'>
              <img src={icEye} alt='조회수 아이콘' />
            </p>
            <Typography size='sm' text={viewCount} weight='Regular' />
          </div>
        )}
      </div>
      <p className='text-left line-clamp-2 h-[52px]'>
        <Typography size='base' text={children} weight='Semibold' />
      </p>
      {size === 'main' && (
        <div className='flex justify-between mt-[14px] mt-9 pt-4 border-t border-[#D7DBE2]'>
          <div className='flex'>
            <p className='mr-[10px]'>
              <img src={icUser} alt='유저 이미지' />
            </p>
            <Typography text={nickname} size='base' weight='Semibold' />
          </div>
          <div className='flex items-center gap-2'>
            <p className='flex items-center'>
              <img src={icEye} alt='눈 아이콘' />
            </p>
            <Typography
              size='sm'
              text={viewCount}
              weight='Medium'
              className='text-[#808490]'
            />
            <p className='flex items-center'>
              <img src={icComment} alt='댓글 아이콘' />
            </p>
            <Typography
              size='sm'
              text={commentCount}
              weight='Medium'
              className='text-[#808490]'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
