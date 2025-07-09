'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchStats } from '@/redux/slices/authSlice';

const Stats = () => {
  const dispatch = useAppDispatch();
  const { stats, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="text-2xl font-bold text-lime-500 mb-6 text-center">System Stats</h2>

      {status === 'loading' ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 border-2 border-lime-500 rounded-2xl p-5 shadow-md text-center">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Payments</h4>
            <p className="text-xl font-bold text-lime-500">${stats?.totalPayments || 0}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border-2 border-lime-500 rounded-2xl p-5 shadow-md text-center">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Active Users</h4>
            <p className="text-xl font-bold text-lime-500">{stats?.activeUsers || 0}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
