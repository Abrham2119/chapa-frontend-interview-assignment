'use client';

import TransactionForm from '@/components/forms/TransactionForm';
import Table from '@/components/ui/table/Table';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTransactions } from '@/redux/slices/authSlice';
import { Transaction } from '@/types';
import { useEffect } from 'react';
import { Column } from 'react-table';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const { user, transactions, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {  
      dispatch(fetchTransactions(user.id));
    }
  }, [dispatch, user?.id]);


  const columns: Column<Transaction>[] = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Amount', accessor: 'amount' },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ value }: { value: string }) => new Date(value).toLocaleDateString(),
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
      <TransactionForm />
      <h3 className="text-xl font-semibold mb-2">Recent Transactions</h3>


      {status === 'loading' ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <Table 
        columns={columns} 
        data={transactions} 
      />
      )}
    </div>
  );
};

export default Transactions;