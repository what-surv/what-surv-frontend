import { useEffect, useState } from 'react';

import CommingSoon from './misc/CommingSoon';
import { requestLogout } from '../api/loginApis';
import { userCheckApi } from '../api/userCheckApi';
import { Appbar } from '../stories/appbar/Appbar';
import { Tabbar } from '../stories/tabbar/Tabbar';

const Lite = () => {
  // 사용자 로그인 상태를 저장하기 위한 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserStatus = async () => {
      const userStatus = await userCheckApi();
      setIsLoggedIn(userStatus); // 비동기 호출의 결과로 로그인 상태 업데이트
    };

    fetchUserStatus();
  }, []);
  const logout = async () => {
    await requestLogout();
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Appbar isAccount isLogo isFullLogo logout={logout} />
        </div>
      ) : (
        <Appbar isLogo isFullLogo isLogin />
      )}
      <Tabbar isMobileVisible size='default' />
      <div className='max-w-[770px] w-full min-h-[calc(100vh_-_662px)] m-auto'>
        <CommingSoon />
      </div>
    </div>
  );
};

export default Lite;
