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
            <div className='flex flex-col items-start justify-start gap-1 Text'>
              <div className='w-full h-6 bg-gray-200 rounded-lg Rectangle3468540' />
              <div className='Rectangle3468541 w-[217px] h-6 bg-gray-200 rounded-lg' />
            </div>
          </div>
          <div className='CardContents2 w-full h-[43px] flex-col justify-start items-start gap-3.5 flex'>
            <div className='w-full h-px bg-gray-300 Devider' />
            <div className='w-full bg-gray-200 rounded-lg SubContent h-7' />
          </div>
        </div>
      ) : (
        <div className='inline-flex flex-col items-start justify-start w-full p-5 border CardSkeleton2 animate-pulse h-44 bg-neutral-50 rounded-2xl border-neutral-300 gap-9'>
          <div className='CardContents h-[138px] flex-col justify-start items-start gap-4 flex'>
            <div className='Contents w-full h-[30px] bg-gray-200 rounded-lg' />
            <div className='DueDate w-[124px] h-6 bg-gray-200 rounded-lg' />
            <div className='flex flex-col items-start justify-start gap-1 Text'>
              <div className='w-full h-6 bg-gray-200 rounded-lg Rectangle3468540' />
              <div className='Rectangle3468541 w-[217px] h-6 bg-gray-200 rounded-lg' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSkeleton;
