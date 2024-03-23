import Index from './pages/Index';
import Lite from './pages/Lite';
import Login from './pages/login/Login';
import MarketingConsent from './pages/misc/MarketingConsent';
import NotFoundPage from './pages/misc/NotFoundPage';
import PrivacyPolicyPage from './pages/misc/PrivacyPolicyPage';
import PrivateRoute from './pages/misc/PrivateRoute';
import TermsofServicePage from './pages/misc/TermsofServicePage';
import Withdrawal from './pages/misc/Withdrawal';
import InterestArticlesPage from './pages/myPages/InterestArticlesPage';
import MyWritePostPage from './pages/myPages/MyWritePostPage';
import Setting from './pages/myPages/Setting';
import PostEditPage from './pages/post/PostEditPage';
import PostViewPage from './pages/post/PostViewPage';
import PostWritePage from './pages/post/PostWritePage';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  // const location = useLocation();
  return (
    <>
      {/* <div>
        <Appbar>로고</Appbar>
        {location.pathname !== '/login' && <Tabbar size='default'>로고</Tabbar>}
      </div> */}
      <div className='w-full max-w-[1368px]bg-[#FAFAFA]'>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />

          <Route path='/login/new-user' element={<Login />} />
          <Route path='/login/success' element={<Login />} />
          <Route path='/login/failure' element={<Login />} />
          <Route path='/view/:num' element={<PostViewPage />} />

          <Route path='/marketingConsent' element={<MarketingConsent />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicyPage />} />
          <Route path='/termsOfService' element={<TermsofServicePage />} />
          <Route path='/lite' element={<Lite />} />
          <Route element={<PrivateRoute />}>
            <Route path='/write' element={<PostWritePage />} />
            <Route path='/edit/:postId' element={<PostEditPage />} />
            <Route path='/me/setting' element={<Setting />} />
            <Route path='/me/likes' element={<InterestArticlesPage />} />
            <Route path='/me/posts' element={<MyWritePostPage />} />
            <Route path='/withdrawal' element={<Withdrawal />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
