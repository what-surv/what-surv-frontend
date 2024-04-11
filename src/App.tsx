import React, { Suspense } from 'react';
import ReactGA from 'react-ga4';

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
// import PostWritePage from './pages/post/PostWritePage';
import Footer from './stories/footer/Footer';

import { Routes, Route, useLocation } from 'react-router-dom';

const PostWritePage = React.lazy(() => import('./pages/post/PostWritePage'));

ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

const App = () => {
  const location = useLocation();

  return (
    <>
      <div className='pb-[100px] md:pb-[200px]'>
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
            <Route
              path='/write'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PostWritePage />
                </Suspense>
              }
            />
            <Route path='/edit/:postId' element={<PostEditPage />} />
            <Route path='/me/setting' element={<Setting />} />
            <Route path='/me/likes' element={<InterestArticlesPage />} />
            <Route path='/me/posts' element={<MyWritePostPage />} />
            <Route path='/withdrawal' element={<Withdrawal />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      {(location.pathname === '/' || location.pathname === '/lite') && (
        <Footer />
      )}
    </>
  );
};

export default App;
