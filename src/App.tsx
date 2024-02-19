import Login from './pages/Login';
import View from './pages/View';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/login/new-user' element={<Login />} />
        <Route path='/login/success' element={<Login />} />
        <Route path='/login/failure' element={<Login />} />
        <Route path='/view' element={<View />} />
      </Routes>
    </div>
  );
};

export default App;
