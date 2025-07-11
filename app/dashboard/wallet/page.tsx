'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

export default function Wallet() {
  const user = useAppSelector((state) => state.auth);
  const [balance, setBalance] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user.role) {
      router.push('/');
      return;
    }

    const allowedRoles = ['User', 'Admin', 'Super_Admin'];
    if (!allowedRoles.includes(user.role)) {
      router.push('/dashboard'); 
      return;
    }

   fetch(`/api/transactions?userId=${user.user?.id ?? ''}`)
      .then((res) => res.json())
      .then((data) => setBalance(data.balance));
  }, [user, router]);

  if (!balance) return <div>Loading...</div>;

  return (
   <div className="mx-auto max-w-md p-6 border-2 border-lime-500 rounded-2xl shadow-md bg-white   text-gray-800  ">
      <h2 className="text-2xl font-bold mb-4 text-lime-500">Wallet</h2>
      <p className="text-lg font-medium">Balance: <span className="font-bold">${balance.toFixed(2)}</span></p>
    </div>
  );
}
