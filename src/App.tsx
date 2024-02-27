import Index from './pages/Index';
import Login from './pages/login/Login';
import PostWritePage from './pages/post/PostWritePage';
import View from './pages/View';
import { Header } from './stories/header/Header';
import { SubHeader } from './stories/subheader/SubHeader';

import { Routes, Route, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  return (
    <>
      <div>
        <Header>로고</Header>
        {location.pathname !== '/login' && (
          <SubHeader size='default'>로고</SubHeader>
        )}
      </div>
      <div className='w-full max-w-[1368px] m-auto pl-[24px] pr-[24px]'>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/write' element={<PostWritePage />} />
          <Route path='/login/new-user' element={<Login />} />
          <Route path='/login/success' element={<Login />} />
          <Route path='/login/failure' element={<Login />} />
          <Route path='/view/:num' element={<View />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
