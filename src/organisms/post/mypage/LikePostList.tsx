import React from 'react';

import { axiosBaseUrl } from '../../../api/axiosConfig';
import { GetMainData } from '../../../api/IndexApi';
import { LikeDelete, LikePost } from '../../../api/LikeApi';
import { profileTypes } from '../../../api/Posttypes';
import Nodata from '../../../pages/misc/Nodata';
import Card from '../../../stories/card/Card';
import Like from '../../../stories/like/Like';
import { formatDateString } from '../../../utils/dateUtils';
// import { getComment } from '../api/PostApi';

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';

// interface commentTypes {
//   id: string;
//   content: string;
//   user: UserTypes;
//   parent: parentProps;
// }

// interface parentProps {
//   id: string;
// }

const PAGE_SIZE = 10;

const LikePostList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery<profileTypes>({
    queryKey: ['getProfile'],
    queryFn: () => axiosBaseUrl.get(`auth/profile`),
  });

  // const {
  //   data: LikePosts,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ['isLikePost'],
  //   queryFn: () => axiosBaseUrl.get('users/me/likes'),
  // });

  const {
    data: LikePosts,
    isLoading,
    isFetching,
    fetchNextPage,
    refetch,
    hasNextPage,
    // refetch,
  } = useInfiniteQuery({
    queryKey: ['myLikePosts'],
    queryFn: async ({ pageParam = 1 }) => {
      // 2초 딜레이 추가
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      return axiosBaseUrl.get('users/me/likes', {
        params: { page: pageParam, limit: PAGE_SIZE },
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    initialPageParam: 1,
    staleTime: 10000, // 10초

    refetchOnWindowFocus: false,
  });

  const likedClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    liked: boolean
  ) => {
    e.stopPropagation();

    if (liked) {
      await LikeDelete(id);
    } else {
      await LikePost(id);
    }
    refetch();
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className='flex w-full gap-4 max-w-[1200px]'>
      {LikePosts?.pages[0].data.likes.length === 0 ? (
        <Nodata />
      ) : (
        <div className='flex flex-wrap gap-4'>
          <InfiniteScroll
            pageStart={1}
            hasMore={!isFetching && hasNextPage}
            loadMore={() => fetchNextPage()}
          >
            {LikePosts?.pages.map((likeArray, pageIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={pageIndex}>
                {likeArray?.data.likes.map((likePost: GetMainData) => (
                  <Card
                    key={likePost.id}
                    id={likePost.id}
                    nickname={profile?.data.nickname}
                    cardStyle='default'
                    createdAt={likePost.createdAt}
                    enddate={formatDateString(likePost.endDate)}
                    onClick={() => {
                      queryClient.invalidateQueries({
                        queryKey: ['getPost', likePost.id],
                      });
                      navigate(`view/${likePost.id}`);
                    }}
                    type='default'
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === 'Enter' || e.key === 'Space') {
                        navigate(`/view/${likePost.postId}`);
                      }
                    }}
                    viewCount={Number(likePost.viewCount)}
                    commentCount={likePost.commentCount}
                  >
                    <span className='absolute top-[25px] right-[21px]'>
                      <Like
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          likedClick(e, likePost.id, likePost.isLiked)
                        }
                        isLiked={likePost.isLiked}
                      />
                    </span>
                    {likePost.title}
                  </Card>
                ))}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default LikePostList;
