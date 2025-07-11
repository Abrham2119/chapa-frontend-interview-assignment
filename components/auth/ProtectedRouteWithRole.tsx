'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Role } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cookie = Cookies.get('user');

    if (!cookie) {
      router.replace('/');
      return;
    }   
    try { 
      setIsAuthorized(true);
    } catch (err) {
      console.error('Invalid cookie format:', err);
      router.replace('/unauthorized');
    } finally {
      setIsChecking(false);
    }
  }, [allowedRoles, router]);

  if (isChecking) return <p className="text-center py-6">Verifying access...</p>;
  if (!isAuthorized) return null;

  return <>{children}</>;
}
