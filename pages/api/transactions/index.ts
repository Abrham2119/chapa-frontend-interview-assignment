
import type { NextApiRequest, NextApiResponse } from 'next';
import { transactions } from '@/services/mocks/transactions'; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = Number(req.query.userId);
    if (!userId) {
      return res.status(400).json({ error: 'Missing or invalid userId query parameter' });
    }

    const filteredTransactions = transactions.filter(tx => tx.userId === userId);
    const balance = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

    return res.status(200).json({ balance, transactions: filteredTransactions });
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
