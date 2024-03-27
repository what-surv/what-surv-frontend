import { useEffect, useState } from 'react';

import { userCheckApi } from '../../api/userCheckApi';
import LoginAlertModal from '../../organisms/LoginAlertModal';

import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState<null | boolean>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getAuthStatus = async () => {
      const getAuth = await userCheckApi();
      setIsAuth(getAuth);
    };

    getAuthStatus();
  }, []);

  if (isAuth === null) {
    return null; // 또는 다른 로딩 표시 컴포넌트
  }

  if (!isAuth) {
    return (
      <LoginAlertModal
        isOpen
        goLogin={() => {
          navigate('/login');
        }}
      />
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
