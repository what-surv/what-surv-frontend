import icPagingActive from '../../assets/ic-paging-active.svg';
import icPagingDisable from '../../assets/ic-paging-disable.svg';
import icPagingLastFirstActive from '../../assets/ic-paging-last-first-active.svg';
import icPagingLastFirstDisable from '../../assets/ic-paging-last-first-disable.svg';
import Typography from '../../typography/Typography';

interface PaginationProps {
  pageClick: (page: number) => void;

  currentPage: number;

  totalPage: number;
}

export const Pagination = ({
  pageClick,

  totalPage,
  currentPage,
}: PaginationProps) => {
  const blockSize = 6; // 보여줄 block 갯수
  const startBlock = Math.floor((currentPage - 1) / blockSize) * blockSize + 1;
  const endBlock = Math.min(totalPage, startBlock + blockSize - 1);

  const visibleBlocks = Array.from(
    { length: endBlock - startBlock + 1 },
    (_, index) => startBlock + index
  );

  return (
    <div className='flex justify-center mt-[80px]'>
      <div className='flex justify-center gap-[6px]'>
        <button
          type='button'
          className='flex w-[26px] h-[26px] sm:w-8 sm:h-8 items-center justify-center'
          onClick={() => pageClick(1)}
          aria-label='첫 페이지로 이동'
          disabled={currentPage === 1}
        >
          {currentPage !== 1 ? (
            <img
              src={icPagingLastFirstActive}
              alt='첫 페이지로 이동 아이콘'
              className='rotate-180'
            />
          ) : (
            <img src={icPagingLastFirstDisable} alt='첫 페이지로 이동 아이콘' />
          )}
        </button>

        <button
          type='button'
          className='flex w-[26px] h-[26px] sm:w-8 sm:h-8 items-center justify-center'
          onClick={() => pageClick(currentPage - 1)}
          aria-label='이전 페이지로 이동'
          disabled={currentPage === 1}
        >
          {currentPage !== 1 ? (
            <img
              src={icPagingActive}
              alt='이전 페이지로 이동 아이콘'
              className='rotate-180'
            />
          ) : (
            <img src={icPagingDisable} alt='이전 페이지로 이동 아이콘' />
          )}
        </button>
        {visibleBlocks.map((page) => (
          <button
            type='button'
            className={`flex w-[26px] h-[26px] sm:w-8 sm:h-8 items-center justify-center rounded-full ${
              page === currentPage ? 'bg-[#3283FF] text-white' : ''
            }`}
            key={page}
            onClick={() => pageClick(page)}
            aria-label={`${page}째 버튼`}
          >
            <Typography size='sm' weight='Medium' text={page} />
          </button>
        ))}

        <button
          type='button'
          className='flex w-[26px] h-[26px] sm:w-8 sm:h-8 items-center justify-center'
          onClick={() => pageClick(currentPage + 1)}
          aria-label='다음페이지 이동'
          disabled={totalPage === currentPage}
        >
          {totalPage !== currentPage ? (
            <img src={icPagingActive} alt='다음페이지 이동 아이콘' />
          ) : (
            <img
              src={icPagingDisable}
              alt='다음페이지 이동 아이콘'
              className='rotate-180'
            />
          )}
        </button>

        <button
          type='button'
          className='flex w-[26px] h-[26px] sm:w-8 sm:h-8 items-center justify-center'
          onClick={() => pageClick(totalPage)}
          aria-label='끝페이지로 이동'
          disabled={totalPage === currentPage}
        >
          {totalPage !== currentPage ? (
            <img
              src={icPagingLastFirstActive}
              alt='맨끝 페이지로 이동하는 아이콘'
            />
          ) : (
            <img
              src={icPagingLastFirstDisable}
              alt='맨 끝페이지로 이동하는 아이콘'
              className='rotate-180'
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
