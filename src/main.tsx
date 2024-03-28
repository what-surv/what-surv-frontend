import './index.css';

import ReactGA from 'react-ga4';

import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactGA.initialize('G-LRGMTHCDDL');

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
