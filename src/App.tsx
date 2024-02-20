import Index from './pages/Index';
import Login from './pages/Login';
import PostWritePage from './pages/post/PostWritePage';
import View from './pages/View';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/main' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/write' element={<PostWritePage />} />
        <Route path='/login/new-user' element={<Login />} />
        <Route path='/login/success' element={<Login />} />
        <Route path='/login/failure' element={<Login />} />
        <Route path='/view/:num' element={<View />} />
      </Routes>
    </div>
  );
};

export default App;
