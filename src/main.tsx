import React from 'react';
import './index.css';

import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* // <React.StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </QueryClientProvider>
);
