import Login from './pages/Login';
import PostWritePage from './pages/post/PostWritePage';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/write' element={<PostWritePage />} />
      </Routes>
    </div>
  );
};

export default App;
