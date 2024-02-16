import Login from './pages/Login';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/login/new-user' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
