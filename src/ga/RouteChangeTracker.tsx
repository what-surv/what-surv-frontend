import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

import { useLocation } from 'react-router-dom';

/**
 * uri 변경 추적 컴포넌트
 * uri가 변경될 때마다 pageview 이벤트 전송
 */
const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize ReactGA once
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      // Send pageview event when the location changes
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }
  }, [initialized, location]);

  // For development environment
  useEffect(() => {
    // Initialize ReactGA and send pageview event
    ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return null;
};

export default RouteChangeTracker;
