import React from 'react';

import { axiosBaseUrl } from '../../../api/axiosConfig';
import { GetMainData } from '../../../api/IndexApi';
// import { getComment } from '../api/PostApi';
import { LikeDelete, LikePost } from '../../../api/LikeApi';
import { profileTypes } from '../../../api/Posttypes';
import Card from '../../../stories/card/Card';
import Like from '../../../stories/like/Like';
import { formatDateString } from '../../../utils/dateUtils';

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

const MyPostsList = ({ isEdit }: { isEdit: boolean }) => {
  // const { num } = useParams() as { num: string };
  const navigate = useNavigate();

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

  if (isLoading) {
    return null;
  }

  return (
    <div className='flex w-full gap-4 max-w-[1200px]'>
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
    </div>
  );
};

export default MyPostsList;
