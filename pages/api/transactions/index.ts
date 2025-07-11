import type { NextApiRequest, NextApiResponse } from 'next';
import { transactions } from '@/services/mocks/transactions'; 
import { Status, Transaction } from '@/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = Number(req.query.userId);

    if (!userId || isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Missing or invalid userId query parameter' });
    }

    const filtered = transactions.filter((tx) => tx.userId === userId);
    const balance = filtered.reduce((acc, tx) => acc + tx.amount, 0);

    return res.status(200).json({ balance, transactions: filtered });
  }

  if (req.method === 'POST') {
    const { userId, amount, recipient } = req.body;

    if (
      !userId || 
      typeof userId !== 'number' ||
      typeof amount !== 'number' || 
      !recipient || 
      typeof recipient !== 'string'
    ) {
      return res.status(400).json({ error: 'Invalid transaction data' });
    }

    const maxId = transactions.reduce((max, tx) => (tx.id > max ? tx.id : max), 0);
    const newTransaction: Transaction = {
      id: maxId + 1,
      userId,
      amount,
      recipient,
      date: new Date().toISOString(),
      status: Status.SUCCESS,
    };

    transactions.unshift(newTransaction);

    const userTransactions = transactions.filter((tx) => tx.userId === userId);
    const updatedBalance = userTransactions.reduce((acc, tx) => acc + tx.amount, 0);

    return res.status(200).json({ transaction: newTransaction, balance: updatedBalance });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(Method ${req.method} Not Allowed);
} 