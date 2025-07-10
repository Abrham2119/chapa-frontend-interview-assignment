'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MSWInitializer from '@/components/MSWInitializer';
import ReduxInitializer from '@/components/ReduxInitializer';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ReduxInitializer>
            <MSWInitializer />
            {children}
          </ReduxInitializer>
        </Provider>
      </body>
    </html>
  );
}