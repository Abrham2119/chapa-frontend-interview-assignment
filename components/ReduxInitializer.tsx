'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/slices/authSlice';

export default function ReduxInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.email && parsedUser.role) {
          dispatch(setUser(parsedUser));
        }
      } catch (e) {
        console.error('Failed to parse user from cookie', e);
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}