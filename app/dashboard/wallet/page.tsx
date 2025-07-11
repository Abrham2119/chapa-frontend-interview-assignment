'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

export default function Wallet() {
  const { role, user } = useAppSelector((state) => state.auth);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.push('/');
      return;
    }

    const allowedRoles = ['User', 'Admin', 'Super_Admin'];
    if (!allowedRoles.includes(role)) {
      router.push('/dashboard');
      return;
    }

    const fetchBalance = async () => {
      try {
        const res = await fetch(`/api/transactions?userId=${user?.id ?? ''}`);
        const data = await res.json();
        if (data && typeof data.balance === 'number') {
          setBalance(data.balance);
        } else {
          setBalance(0);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [role, user, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <p className="text-gray-600">Loading wallet...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-6 border-2 border-lime-500 rounded-2xl shadow-md bg-white text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-lime-500">Wallet</h2>
      <p className="text-lg font-medium">
        Balance: <span className="font-bold">${balance.toFixed(2)}</span>
      </p>
    </div>
  );
}
