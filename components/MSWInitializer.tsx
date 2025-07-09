'use client';

import { useEffect } from 'react';

const MSWInitializer = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      import('../msw/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
        });
      }).catch((err) => {
        console.error('Failed to load MSW browser:', err);
      });
    }
  }, []);

  return null;
};

export default MSWInitializer;