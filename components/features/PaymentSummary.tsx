'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Column } from 'react-table';
import { User } from '@/types';
import Table from '../ui/table/Table';

interface PaymentSummary {
  userId: number;
  totalPayments: number;
}

const PaymentSummary = () => {
  const { users, transactions } = useAppSelector((state) => state.auth);

  const paymentData: PaymentSummary[] = useMemo(
    () =>
      users.map((user: User) => ({
        userId: user.id,
        totalPayments: transactions
          .filter((t) => t.userId === user.id)
          .reduce((sum, t) => sum + t.amount, 0),
      })),
    [users, transactions]
  );

  const columns: Column<PaymentSummary>[] = [
    { Header: 'User ID', accessor: 'userId' },
    { Header: 'Total Payments', accessor: 'totalPayments' },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Payment Summary</h3>
      <Table columns={columns} data={paymentData} />
    </div>
  );
};

export default PaymentSummary;