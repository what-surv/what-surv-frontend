import React, { useEffect, useState } from 'react';

import { GetData } from '../../api/IndexApi';
import { LikeDelete, LikePost } from '../../api/LikeApi';
import { requestLogout } from '../../api/loginApis';
import { getPost, getComment } from '../../api/PostApi';
import { UserTypes } from '../../api/Posttypes';
import { userCheckApi } from '../../api/userCheckApi';
import WriteComment from '../../molecules/post/view/WriteComment';
import LoginAlertModal from '../../organisms/LoginAlertModal';
import LogoutAlertModal from '../../organisms/LogoutAlertModal';
import PostContentView from '../../organisms/post/view/PostContentView';
import UserInfoWithComment from '../../organisms/post/view/UserInfoWithComment';
import { Appbar } from '../../stories/appbar/Appbar';
import icComment from '../../stories/assets/ic_comment.svg';
import icEye from '../../stories/assets/ic_eye.svg';
import icUser from '../../stories/assets/ic_usersvg.svg';
import Like from '../../stories/like/Like';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Typography from '../../stories/typography/Typography';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Viewer } from '@toast-ui/react-editor';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface commentTypes {
  id: string;
  content: string;
  user: UserTypes;
  parent: parentProps;
}

interface parentProps {
  id: string;
}

const PostViewPage = () => {
  const { num } = useParams() as { num: string };
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  // LoginAlertModal을 제어하기 위한 상태
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  // LogoutAlertModal을 제어하기 위한 상태
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  // 사용자 로그인 상태를 저장하기 위한 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isArrowClick = () => {
    navigate(-1);
  };

  const { data: postDetails, refetch } = useQuery<GetData>({
    queryKey: ['getPost', num],
    queryFn: () => getPost(num),
  });

  const { data: comments } = useQuery<commentTypes[]>({
    queryKey: ['getComment', num],
    queryFn: () => getComment(num),
    enabled: true,
  });

  useEffect(() => {
    // 뷰 페이지에서 돌아올 때마다 'postList' 쿼리를 리패치합니다.
    queryClient.invalidateQueries({
      queryKey: ['postList'],
    });
    refetch();
  }, []);

  useEffect(() => {
    if (location.state?.quit) {
      setIsLoggedIn(false);
    } else {
      const fetchUserStatus = async () => {
        const userStatus = await userCheckApi();
        setIsLoggedIn(userStatus);
      };

      fetchUserStatus();
    }
  }, []);

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
      if (error instanceof Error && error.message === 'Unauthorized') {
        setShowLoginAlert(true);
      }
    }
  };

  if (!postDetails) return null;

  return (
    <div className='w-full mx-auto pb-[150px]'>
      {/* header 영역 */}
      <div className='w-full'>
        {isLoggedIn ? (
          <div>
            <Appbar
              isArrow
              onArrowClick={isArrowClick}
              isLogo
              isAccount
              logout={() => {
                setShowLogoutAlert(true);
              }}
            />
          </div>
        ) : (
          <Appbar isLogo isFullLogo isLogin />
        )}
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
          <div className='flex justify-between items-center gap-3.5 self-stretch border-[#D7DBE2] border-t pt-[14px]'>
            <div className='flex gap-2.5 items-start'>
              <img src={icUser} alt='유저 이미지' />
              <Typography
                text={
                  postDetails.author === null
                    ? `탈퇴한 회원`
                    : postDetails.author.nickname
                }
                size='sm'
                weight='Medium'
                lineheight={22}
              />
            </div>
            <div className='flex items-center gap-1.5'>
              <div className='flex items-center gap-1'>
                <img src={icEye} alt='눈 아이콘' />
                <Typography
                  text={postDetails.viewCount}
                  size='sm'
                  weight='Medium'
                  lineheight={22}
                  className='text-[#818490]'
                />
              </div>
              <div className='flex items-center gap-1'>
                <img src={icComment} alt='댓글 아이콘' />
                <Typography
                  text={comments?.length}
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
        <div className='px-4 py-6 bg-[#FFFFFF] w-full rounded-[8px] min-h-[300px]'>
          <Viewer
            initialValue={postDetails.content}
            previewStyle='vertical'
            height='auto'
            initialEditType='wysiwyg'
            useCommandShortcut
            usageStatistics={false}
          />
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
              <Like
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  likedClick(e, Number(num), postDetails.userLike)
                }
                isLiked={!!postDetails.userLike}
              />
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
          <WriteComment placeholder='댓글을 입력해보세요!' />
          <div className='w-full'>
            <UserInfoWithComment />
          </div>
        </div>
      </div>
      <LoginAlertModal
        isOpen={showLoginAlert}
        handleClose={() => setShowLoginAlert(false)}
        goLogin={() => {
          navigate('/login');
        }}
      />
      <LogoutAlertModal
        isOpen={showLogoutAlert}
        handleClose={() => setShowLogoutAlert(false)}
        goLogout={async () => {
          await requestLogout();
          setIsLoggedIn(false);
          setShowLogoutAlert(false);
        }}
      />
    </div>
  );
};

export default PostViewPage;
