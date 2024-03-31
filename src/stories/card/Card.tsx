import { cva } from 'class-variance-authority';
import React from 'react';

import icComment from '../assets/ic_comment.svg';
import icEye from '../assets/ic_eye.svg';
import icUser from '../assets/ic_usersvg.svg';
import { Badge } from '../badge/Badge';
import Typography from '../typography/Typography';

const CardVariants = cva(
  `card relative w-full border rounded-[16px] p-5 bg-[#FFF] transition-all duration-150 ease-out hover:scale-[1.02] z-10 overflow-hidden`
);

interface CardProps {
  children?: React.ReactNode;
  /** 카드 스타일  */
  cardStyle: 'default' | 'hot';

  /** 게시글 ID */
  id: number;

  /** 유저 닉네임 */
  nickname?: string;

  /** 게시글 작성 일  */
  createdAt: string;

  /** 마감일  */
  enddate?: string;

  /** 조회수 */
  viewCount: number;

  /** 카드 타입 edit, closed일 경우 커버씌워짐 */
  type: 'default' | 'edit' | 'closed';

  /** 댓글수 */
  commentCount?: number;

  /** 리서치타입 (배열형식) */
  researchTypes?: [string];

  onClick?: () => void;

  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;

  onEditButtonsClick?: (
    sort: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

// 메인 페이지에서 사용하는 Card 컴포넌트

const Card = ({
  id,
  cardStyle,
  children,
  createdAt,
  enddate,
  nickname,
  viewCount,
  commentCount,
  type,
  researchTypes,
  onClick,
  onKeyDown,
  onEditButtonsClick,
  ...props
}: CardProps) => {
  // 현재 시간 및 마감일과 오늘 날짜 비교를 위한 Date 객체 생성
  const currentTime: Date = new Date();
  currentTime.setHours(0, 0, 0, 0); // 현재 날짜의 시간을 00:00:00으로 설정
  const postCreatedAt: Date = new Date(createdAt);
  const postEndDate: Date = enddate ? new Date(enddate) : new Date();
  postEndDate.setHours(23, 59, 59, 999); // 마감일의 시간을 23:59:59으로 설정

  // 게시글이 생성된 후 48시간 이내인지 확인
  const isPostNew: boolean =
    currentTime.getTime() - postCreatedAt.getTime() < 48 * 60 * 60 * 1000;

  // 마감일이 오늘 날짜보다 같거나 늦은 경우 타입을 'closed'로 설정
  const currentType = postEndDate < currentTime && 'closed';
  return (
    <div
      onClick={onClick}
      className={`${CardVariants({ ...props })}`}
      onKeyDown={onKeyDown}
      role='button'
      tabIndex={id}
    >
      {cardStyle === 'default' ? (
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-3'>
            {researchTypes?.map((params) => (
              <Badge size='default' state='main'>
                {params}
              </Badge>
            ))}

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
            {researchTypes?.map((params) => (
              <Badge size='default' state='main'>
                {params}
              </Badge>
            ))}
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
        {cardStyle === 'hot' && (
          <div className='flex items-center gap-2'>
            <p className='flex items-center'>
              <img src={icEye} alt='조회수 아이콘' />
            </p>
            <Typography
              size='sm'
              text={viewCount}
              weight='Medium'
              className='text-[#808490]'
            />
          </div>
        )}
      </div>
      <p className='text-left line-clamp-2 h-[52px]'>
        <Typography size='base' text={children} weight='Semibold' />
      </p>
      {cardStyle === 'default' && (
        <div className='flex justify-between mt-3.5 pt-4 border-t border-[#D7DBE2]'>
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
      {type !== 'default' && (
        <div>
          <div
            className={`absolute flex w-[100%] h-[100%]  left-0 top-0 ${type === 'edit' ? 'bg-[#000000]' : 'bg-[#A6AAB2]'} opacity-40`}
          />
          {type === 'edit' && (
            <div className='absolute flex top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] z-100 gap-6'>
              {onEditButtonsClick && (
                <button
                  type='button'
                  className='flex w-[120px] h-[48px] items-center justify-center rounded-[400px] bg-[#FAFAFA]'
                  aria-label='삭제'
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    onEditButtonsClick('delete', e)
                  }
                >
                  <Typography size='base' weight='Medium' text='삭제' />
                </button>
              )}
              {onEditButtonsClick && (
                <button
                  type='button'
                  className='flex w-[120px] h-[48px] items-center justify-center rounded-[400px] bg-[#FAFAFA]'
                  aria-label='수정'
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    onEditButtonsClick('modify', e)
                  }
                >
                  <Typography size='base' weight='Medium' text='수정' />
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {currentType === 'closed' && (
        <div className='absolute flex w-[100%] h-[100%]  left-0 top-0 bg-[#000000] opacity-40'>
          <div className='absolute flex top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] z-100 gap-6'>
            <Typography
              size='xl2'
              weight='Bold'
              text='마감'
              className='text-[#808490] text-[64px]'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
