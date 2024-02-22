import React from 'react';

import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li>
          <button
            type='button'
            onClick={() => {
              navigate('/view/0');
            }}
          >
            asd
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Index;
