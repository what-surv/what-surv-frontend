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

import { useQuery } from '@tanstack/react-query';
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

const LikeCardList = () => {
  // const { num } = useParams() as { num: string };
  const navigate = useNavigate();

  const { data: profile } = useQuery<profileTypes>({
    queryKey: ['getProfile'],
    queryFn: () => axiosBaseUrl.get(`auth/profile`),
  });

  const {
    data: LikePosts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['isLikePost'],
    queryFn: () => axiosBaseUrl.get('users/me/likes'),
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

  //   const { data: comments } = useQuery<commentTypes[]>({
  //     queryKey: ['getComment', num],
  //     queryFn: () => getComment(num),
  //     enabled: true, // 컴포넌트가 마운트될 때 즉시 데이터 가져오기
  //   });

  if (isLoading) {
    return null;
  }

  return (
    <div className='flex w-full gap-4 max-w-[1200px]'>
      {LikePosts?.data.likes.length === 0 ? (
        <Nodata />
      ) : (
        <div className='flex flex-wrap gap-4'>
          {LikePosts?.data.likes.map((likePost: GetMainData) => (
            <Card
              key={likePost.id}
              id={likePost.id}
              nickname={profile?.data.nickname}
              cardStyle='default'
              createdAt={likePost.createdAt}
              enddate={formatDateString(likePost.endDate)}
              onClick={() => navigate(`/view/${likePost.id}`)}
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
      )}
    </div>
  );
};

export default LikeCardList;
