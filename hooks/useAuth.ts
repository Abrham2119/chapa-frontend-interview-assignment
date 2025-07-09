import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { clearUser } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { role, isAuthenticated } = useAppSelector((state) => state.auth);

  const checkAuth = () => {
    if (!isAuthenticated) {
      router.push('/');
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove('user');
    router.push('/');
  };

  return {
    role,
    isAuthenticated,
    checkAuth,
    handleLogout
  };
};