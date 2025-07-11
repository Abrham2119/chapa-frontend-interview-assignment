import { transactions } from '@/services/mocks/transactions';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Status, Transaction } from '@/types';  

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = Number(req.query.userId);
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId query parameter' });
    }

    const filtered = transactions.filter((tx) => tx.userId === userId);
    return res.status(200).json({ balance: 1234.56, transactions: filtered });
  }

  if (req.method === 'POST') {
    const { userId, amount, recipient } = req.body;

    if (!userId || typeof amount !== 'number' || !recipient) {
      return res.status(400).json({ error: 'Invalid transaction data' });
    }

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      userId,
      amount,
      recipient,
      date: new Date().toISOString(),
      status: Status.SUCCESS, 
    };

    transactions.unshift(newTransaction);
    return res.status(200).json({ transaction: newTransaction });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
