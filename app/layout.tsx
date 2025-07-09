'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import MSWInitializer from '@/components/MSWInitializer';
import ReduxInitializer from '@/components/ReduxInitializer';
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