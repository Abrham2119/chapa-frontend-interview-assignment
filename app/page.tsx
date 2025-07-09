'use client';

import SigninPage from "@/components/features/Signin/SigninPage";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      const user = Cookies.get('user');
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          const role = parsedUser.role;
          if (role === 'User') {
            router.push('/dashboard/wallet');
          } else if (role === 'Admin') {
            router.push('/dashboard/users');
          } else if (role === 'Super_Admin') {
            router.push('/dashboard/admins');
          }
        } catch (e) {
          console.error('Failed to parse user cookie', e);
        }
      }
    }
  }, [router, pathname]);

  return <SigninPage />;
}