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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  parentId?: string;
}

const MyPostsList = ({ isEdit }: { isEdit: boolean }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null); // State to store selected post id

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
    refetch,
  } = useQuery({
    queryKey: ['myWritePosts'],
    queryFn: () => axiosBaseUrl.get('users/me/posts'),
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
        queryKey: ['deletePost'],
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
    e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
    setSelectedPostId(id.toString());
    handleEditButtonClick(action, id);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className='flex w-full flex-wrap gap-4 max-w-[1200px]'>
      {myWritePosts?.data.posts.length === 0 ? (
        <Nodata />
      ) : (
        <div className='flex flex-wrap gap-4'>
          {myWritePosts?.data.posts.map((myWritePost: GetMainData) => (
            <Card
              key={myWritePost.id}
              id={myWritePost.id}
              nickname={profile?.data.nickname}
              cardStyle='default'
              createdAt={myWritePost.createdAt}
              enddate={formatDateString(myWritePost.endDate)}
              onClick={() => navigate(`/view/${myWritePost.id}`)}
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
          <PostSuccessModal
            firstButtonOnClick={() => selectedPostId && click(selectedPostId)}
            SecondButtonOnClick={() => setIsSuccessModalOpen(false)}
            title='선택하신 글을 삭제하시겠어요?'
            content='삭제하면 이 글을 다시 볼 수 없게 돼요.'
            firstButtonText='삭제하기'
            SecondButtonText='취소'
            isLogo={false}
          />
        </div>
      )}
    </div>
  );
};

export default MyPostsList;
