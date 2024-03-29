import React, { useEffect, useState } from 'react';

import { GetMainData, getMainList } from '../api/IndexApi';
import { LikeDelete, LikePost } from '../api/LikeApi';
import Nodata from '../pages/misc/Nodata';
import Card from '../stories/card/Card';
import CardSkeleton from '../stories/cardSkeleton/CardSkeleton';
import { Pagination } from '../stories/indicator/pagination/Pagination';
import Like from '../stories/like/Like';
import { formatDateString } from '../utils/dateUtils';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface CardListProps {
  currentPage: number;
  selectedValues: Record<string, string>;
  checkDeviceReturnLimit: () => number;
  handlePageChange: (page: number) => void;
  setShowLoginAlert: (value: boolean) => void;
}

const CardList = ({
  currentPage,
  selectedValues,
  checkDeviceReturnLimit,
  handlePageChange,
  setShowLoginAlert,
}: CardListProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // queryClient 인스턴스에 접근
  const [showLoader, setShowLoader] = useState(true);

  const { data, refetch, isLoading } = useQuery<GetMainData>({
    queryKey: ['postList', currentPage, selectedValues],
    queryFn: () =>
      getMainList({
        page: currentPage,
        limit: checkDeviceReturnLimit(),
        ...selectedValues,
      }),
  });

  useEffect(() => {
    // 로딩 상태를 true로 설정하여 로딩 인디케이터를 활성화
    setShowLoader(true);

    const delay = setTimeout(() => {
      setShowLoader(false);
    }, 1300);

    return () => clearTimeout(delay);
  }, [currentPage, selectedValues]);

  const likedClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    liked: boolean
  ) => {
    e.stopPropagation();
    try {
      if (liked) {
        await LikeDelete(id);
      } else {
        await LikePost(id);
      }
      refetch();
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        setShowLoginAlert(true);
      }
    }
  };

  if (showLoader || isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
        {Array.from({ length: checkDeviceReturnLimit() }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CardSkeleton key={index} type='default' />
        ))}
      </div>
    );
  }

  return (
    <div className=''>
      {data?.data.length === 0 && <Nodata />}
      <div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
          {data?.data.map((params: GetMainData) => {
            const {
              postId,
              authorNickname,
              title,
              createdAt,
              endDate,
              viewCount,
              commentCount,
              isLiked,
            } = params;

            return (
              <Card
                key={postId}
                id={postId}
                nickname={authorNickname}
                cardStyle='default'
                createdAt={createdAt}
                enddate={formatDateString(endDate)}
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: ['getPost', postId],
                  });
                  navigate(`view/${postId}`);
                }}
                type='default'
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === 'Enter' || e.key === 'Space') {
                    queryClient.invalidateQueries({
                      queryKey: ['getPost', postId],
                    });
                    navigate(`/view/${postId}`);
                  }
                }}
                viewCount={Number(viewCount)}
                commentCount={commentCount}
              >
                <span className='absolute top-[25px] right-[21px]'>
                  <Like
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      likedClick(e, postId, isLiked)
                    }
                    isLiked={isLiked}
                  />
                </span>
                {title}
              </Card>
            );
          })}
        </div>
        {data && (
          <Pagination
            pageClick={handlePageChange}
            totalPage={data.totalPages}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default CardList;
