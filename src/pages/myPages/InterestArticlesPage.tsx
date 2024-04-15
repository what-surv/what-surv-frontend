import { useEffect, useState } from 'react';

import { requestLogout } from '../../api/loginApis';
import { userCheckApi } from '../../api/userCheckApi';
import PostListSelect from '../../molecules/PostListSelect';
import LogoutAlertModal from '../../organisms/LogoutAlertModal';
import LikePostList from '../../organisms/post/mypage/LikePostList';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';

import { useLocation, useNavigate } from 'react-router-dom';

interface ButtonInfo {
  label: string;
  url: string;
  key: string;
}

const buttonValues: ButtonInfo[] = [
  { label: '관심 표시한 글', url: '/users/me/likes', key: 'like' },
];

const InterestArticlesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // LogoutAlertModal을 제어하기 위한 상태
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  // 사용자 로그인 상태를 저장하기 위한 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  return (
    <div className='w-full'>
      <div className='w-full header'>
        {isLoggedIn ? (
          <div>
            <Appbar
              isAccount
              isLogo
              isFullLogo
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
      <div className='pt-4 md:pt-14 mx-auto w-[90%] md:w-[85%]'>
        <div className='w-[95%] md:min-w-[980px] full:max-w-[1416px] mx-auto'>
          <PostListSelect buttonValues={buttonValues} />
        </div>

        <div className='flex justify-center w-full'>
          <LikePostList />
        </div>
      </div>
      <LogoutAlertModal
        isOpen={showLogoutAlert}
        handleClose={() => setShowLogoutAlert(false)}
        goLogout={async () => {
          await requestLogout();
          setIsLoggedIn(false);
          setShowLogoutAlert(false);
          navigate('/');
        }}
      />
    </div>
  );
};

export default InterestArticlesPage;
