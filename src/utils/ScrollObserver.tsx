import React, { useEffect, useRef } from 'react';

interface ScrollObserverProps {
  onIntersection: () => void;
}

const ScrollObserver = ({ onIntersection }: ScrollObserverProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersection();
        }
      });
    };

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    const targetElement = document.getElementById('scroll-trigger');

    if (targetElement && observerRef.current) {
      observerRef.current.observe(targetElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onIntersection]);

  return <div id='scroll-trigger' style={{ height: '1px' }} />;
};

export default ScrollObserver;
