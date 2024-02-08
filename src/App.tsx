import Login from './pages/Login';

import { Routes, Route } from 'react-router-dom';
import { Header } from './stories/header/Header';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
