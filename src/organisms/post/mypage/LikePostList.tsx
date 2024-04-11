import React from 'react';

import { axiosBaseUrl } from '../../../api/axiosConfig';
import { GetMainData } from '../../../api/IndexApi';
import { LikeDelete, LikePost } from '../../../api/LikeApi';
import Nodata from '../../../pages/misc/Nodata';
import Card from '../../../stories/card/Card';
import Like from '../../../stories/like/Like';
import { formatDateString } from '../../../utils/dateUtils';
// import { getComment } from '../api/PostApi';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
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

const PAGE_SIZE = 12;

const LikePostList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: LikePosts,
    isLoading,
    isFetching,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['myLikePosts'],
    queryFn: async ({ pageParam = 1 }) => {
      return axiosBaseUrl.get('users/me/likes', {
        params: { page: pageParam, limit: PAGE_SIZE },
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.posts.length < PAGE_SIZE) return null; // 마지막 페이지 도달
      return allPages.length + 1; // 다음 페이지
    },

    initialPageParam: 1,
    staleTime: 10000, // 10초
  });

  const likedClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    liked: { id: number }
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
      console.error(error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className='flex justify-center'>
      {LikePosts?.pages[0].data.posts.length === 0 ? (
        <Nodata />
      ) : (
        <InfiniteScroll
          pageStart={1}
          hasMore={!isFetching && hasNextPage}
          loadMore={() => fetchNextPage()}
        >
          <div className='grid grid-cols-1 gap-4 mx-auto card:grid-cols-2 justifiy-center slg:grid-cols-3 full:grid-cols-4'>
            {LikePosts?.pages.map((likeArray, pageIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={pageIndex}>
                {likeArray?.data.posts.map((likePost: GetMainData) => (
                  <div className='w-[342px]'>
                    <Card
                      key={likePost.id}
                      id={likePost.id}
                      nickname={likePost.author.nickname}
                      cardStyle='default'
                      createdAt={likePost.createdAt}
                      enddate={formatDateString(likePost.endDate)}
                      researchTypes={likePost.researchTypes}
                      onClick={() => {
                        queryClient.invalidateQueries({
                          queryKey: ['getPost', likePost.id],
                        });
                        navigate(`/view/${likePost.id}`);
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
                            likedClick(e, likePost.id, likePost.userLike)
                          }
                          isLiked={!!likePost.userLike}
                        />
                      </span>
                      {likePost.title}
                    </Card>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default LikePostList;
