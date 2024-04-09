import React from 'react';

interface CardSkeletonProps {
  type: 'default' | 'hot';
}
const CardSkeleton = ({ type }: CardSkeletonProps) => {
  return (
    <div>
      {type === 'default' ? (
        <div className='CardSkeleton1 animate-pulse w-[340px] h-[255px] p-5 bg-neutral-50 rounded-2xl border border-neutral-300 flex-col justify-start items-start gap-9 inline-flex'>
          <div className='CardContents1 w-[80%] h-[136px] flex-col justify-start items-start gap-4 flex'>
            <div className='Contents w-full h-[30px] bg-gray-200 rounded-lg' />
            <div className='DueDate w-[124px] h-[22px] bg-gray-200 rounded-lg' />
            <div className='Text flex-col justify-start items-start gap-1 flex'>
              <div className='Rectangle3468540 w-full h-6 bg-gray-200 rounded-lg' />
              <div className='Rectangle3468541 w-[217px] h-6 bg-gray-200 rounded-lg' />
            </div>
          </div>
          <div className='CardContents2 w-full h-[43px] flex-col justify-start items-start gap-3.5 flex'>
            <div className='Devider w-full h-px bg-gray-300' />
            <div className='SubContent w-full h-7 bg-gray-200 rounded-lg' />
          </div>
        </div>
      ) : (
        <div className='CardSkeleton2 animate-pulse w-full h-44 p-5 bg-neutral-50 rounded-2xl border border-neutral-300 flex-col justify-start items-start gap-9 inline-flex'>
          <div className='CardContents h-[138px] flex-col justify-start items-start gap-4 flex'>
            <div className='Contents w-full h-[30px] bg-gray-200 rounded-lg' />
            <div className='DueDate w-[124px] h-6 bg-gray-200 rounded-lg' />
            <div className='Text flex-col justify-start items-start gap-1 flex'>
              <div className='Rectangle3468540 w-full h-6 bg-gray-200 rounded-lg' />
              <div className='Rectangle3468541 w-[217px] h-6 bg-gray-200 rounded-lg' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSkeleton;
