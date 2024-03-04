import React from 'react';

import { GetData } from '../../api/IndexApi';
import { testLogin, getPost } from '../../api/PostApi';
import CommentWithButton from '../../molecules/post/view/CommentWithButton';
import PostContentView from '../../organisms/post/view/PostContentView';
import UserInfoWithComment from '../../organisms/post/view/UserInfoWithComment';
import { Appbar } from '../../stories/appbar/Appbar';
import icComment from '../../stories/assets/ic_comment.svg';
import icEye from '../../stories/assets/ic_eye.svg';
import icUser from '../../stories/assets/ic_usersvg.svg';
import Like from '../../stories/like/Like';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Typography from '../../stories/typography/Typography';

import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

const PostViewPage = () => {
  const { num } = useParams() as { num: string };
  const navigate = useNavigate();
  const isArrowClick = () => {
    navigate(-1);
  };

  const { data: postDetails } = useQuery<GetData>({
    queryKey: ['getPost', num],
    queryFn: () => getPost(num),
  });

  if (!postDetails) return null;

  return (
    <div className='w-full mx-auto pb-[150px]'>
      {/* header 영역 */}
      <div className='w-full'>
        <Appbar isArrow onArrowClick={isArrowClick} isSearch isLogo isAccount />
        <Tabbar />
      </div>
      <div className='flex flex-col items-end gap-8 max-w-[1034px] w-[90%] mx-auto'>
        <div className='flex flex-col items-start self-stretch gap-6'>
          <div className='flex self-stretch mt-[30px]'>
            <Typography
              text={postDetails?.title}
              size='xl'
              weight='Semibold'
              lineheight={28}
              className='text-[#242424]'
            />
          </div>
          <button type='button' onClick={testLogin}>
            test button
          </button>
          <div className='flex justify-between items-center gap-3.5 self-stretch border-[#D7DBE2] border-t pt-[14px]'>
            <div className='flex gap-2.5 items-start'>
              <img src={icUser} alt='유저 이미지' />
              <Typography
                text={postDetails?.author.nickname}
                size='sm'
                weight='Medium'
                lineheight={22}
              />
            </div>
            <div className='flex items-center gap-1.5'>
              <div className='flex items-center gap-1'>
                <img src={icEye} alt='눈 아이콘' />
                <Typography
                  text={postDetails?.viewCount}
                  size='sm'
                  weight='Medium'
                  lineheight={22}
                  className='text-[#818490]'
                />
              </div>
              <div className='flex items-center gap-1'>
                <img src={icComment} alt='댓글 아이콘' />
                <Typography
                  text='99'
                  size='sm'
                  weight='Medium'
                  lineheight={22}
                  className='text-[#818490]'
                />
              </div>
            </div>
          </div>
        </div>
        <PostContentView />
        {/* 글 */}
        <div className='px-4 py-6 bg-[#FFFFFF] w-full rounded-[8px]'>
          {postDetails?.content}
        </div>

        {/* 관심 */}
        <div className='flex gap-3.5 w-full self-stretch flex-col items-start'>
          <div className='flex items-center self-stretch justify-end gap-1'>
            <Typography
              text='관심있어요!'
              size='base'
              lineheight={26}
              weight='Medium'
              className='text-[#818490]'
            />
            <div className='p-2.5 flex items-center justify-center gap-2.5'>
              <Like />
            </div>
          </div>
          <div className='h-[1px] self-stretch bg-[#A6AAB2]' />

          {/* //관심 */}

          <div className='h-[26px] self-stretch'>
            <Typography
              text='댓글'
              size='base'
              lineheight={26}
              weight='Medium'
              className='text-[#242424]'
            />
          </div>
          <CommentWithButton placeholder='댓글을 입력해보세요!' />
          <div className='w-full'>
            <UserInfoWithComment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostViewPage;
