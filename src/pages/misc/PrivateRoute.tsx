import { useEffect, useState } from 'react';

import { userCheckApi } from '../../api/userCheckApi';

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);

  useEffect(() => {
    const getAuthStatus = async () => {
      const getAuth = await userCheckApi();
      console.log(getAuth);
      setIsAuth(getAuth);
    };

    getAuthStatus();
  }, []);

  if (isAuth === null) {
    // 인증 상태 확인 중...
    return null; // 또는 다른 로딩 표시 컴포넌트
  }

  if (!isAuth) {
    alert('로그인이 필요한 서비스 입니다.');
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default PrivateRoute;
