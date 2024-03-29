import { AxiosRequestConfig } from 'axios';
import React, { useState } from 'react';

import { axiosBaseUrl } from '../../../api/axiosConfig';
import { GetMainData } from '../../../api/IndexApi';
// import { getComment } from '../api/PostApi';
import { LikeDelete, LikePost } from '../../../api/LikeApi';
import { profileTypes } from '../../../api/Posttypes';
import Nodata from '../../../pages/misc/Nodata';
import { SuccessModalStore } from '../../../store/store';
import Card from '../../../stories/card/Card';
import Like from '../../../stories/like/Like';
import { formatDateString } from '../../../utils/dateUtils';
import PostSuccessModal from '../write/PostSuccessModal';

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10; // Define your page size here

// interface commentTypes {
//   id: string;
//   content: string;
//   user: UserTypes;
//   parent: parentProps;
// }

// interface parentProps {
//   id: string;
// }

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  parentId?: string;
}

const MyPostsList = ({ isEdit }: { isEdit: boolean }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setIsSuccessModalOpen } = SuccessModalStore();

  const { data: profile } = useQuery<profileTypes>({
    queryKey: ['getProfile'],
    queryFn: () => axiosBaseUrl.get(`auth/profile`),
  });

  const {
    data: myWritePosts,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    // refetch,
  } = useInfiniteQuery({
    queryKey: ['myWritePosts'],
    queryFn: async ({ pageParam = 1 }) => {
      // 2초 딜레이 추가
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      return axiosBaseUrl.get('users/me/posts', {
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
    // refetch();
  };

  const handleEditButtonClick = (action: string, postId: number) => {
    if (action === 'delete') {
      setIsSuccessModalOpen(true);
    } else if (action === 'modify') {
      navigate(`/edit/${postId}`);
    }
  };
  const click = (id: string) => {
    deletePostMutation.mutate(id);
    setIsSuccessModalOpen(false);
  };

  const deletePostMutation = useMutation<void, unknown, string>({
    mutationFn: (id) =>
      axiosBaseUrl.delete(`posts/${id}`, {
        parentId: id,
      } as CustomAxiosRequestConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myWritePosts'],
      });
    },
    onError: () => {
      console.error('에러 발생');
    },
  });

  const handleCardEditButtonClick = (
    action: string,
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    setSelectedPostId(id.toString());
    handleEditButtonClick(action, id);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className='flex w-full flex-wrap gap-4 max-w-[1200px]'>
      {myWritePosts?.pages[0].data.posts.length === 0 ? (
        <Nodata />
      ) : (
        <div className='flex flex-wrap'>
          <InfiniteScroll
            pageStart={1}
            hasMore={!isFetching && hasNextPage}
            loadMore={() => fetchNextPage()}
          >
            {myWritePosts?.pages.map((page, pageIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={pageIndex} className='flex flex-col gap-3'>
                {page.data.posts.map((myWritePost: GetMainData) => (
                  <Card
                    key={myWritePost.id}
                    id={myWritePost.id}
                    nickname={profile?.data.nickname}
                    cardStyle='default'
                    createdAt={myWritePost.createdAt}
                    enddate={formatDateString(myWritePost.endDate)}
                    onClick={() => {
                      queryClient.invalidateQueries({
                        queryKey: ['getPost', myWritePost.id],
                      });
                      navigate(`/view/${myWritePost.id}`);
                    }}
                    type={isEdit ? 'edit' : 'default'}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === 'Enter' || e.key === 'Space') {
                        navigate(`/view/${myWritePost.postId}`);
                      }
                    }}
                    viewCount={Number(myWritePost.viewCount)}
                    commentCount={myWritePost.commentCount}
                    onEditButtonsClick={(
                      action: string,
                      e: React.MouseEvent<HTMLButtonElement>
                    ) => handleCardEditButtonClick(action, e, myWritePost.id)}
                  >
                    <span className='absolute top-[25px] right-[21px]'>
                      <Like
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          likedClick(e, myWritePost.id, myWritePost.isLiked)
                        }
                        isLiked={myWritePost.isLiked}
                      />
                    </span>
                    {myWritePost.title}
                  </Card>
                ))}
              </div>
            ))}
            <PostSuccessModal
              firstButtonOnClick={() => selectedPostId && click(selectedPostId)}
              SecondButtonOnClick={() => setIsSuccessModalOpen(false)}
              title='선택하신 글을 삭제하시겠어요?'
              content='삭제하면 이 글을 다시 볼 수 없게 돼요.'
              firstButtonText='삭제하기'
              SecondButtonText='취소'
              isLogo={false}
            />
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default MyPostsList;
