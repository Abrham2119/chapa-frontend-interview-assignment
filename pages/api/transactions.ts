import { NextRequest, NextResponse } from 'next/server';
import { Status, Transaction } from '@/types';
import { transactions } from '@/services/mocks/transactions';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const filtered = transactions
    .filter((tx) => tx.userId === Number(userId))
    .filter((tx) => tx.id && typeof tx.amount === 'number' && tx.date && tx.status && tx.recipient);

  return NextResponse.json({ balance: 1234.56, transactions: filtered }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { userId, amount, recipient } = await req.json();

  if (!userId || typeof amount !== 'number' || !recipient) {
    return NextResponse.json({ error: 'Invalid transaction data' }, { status: 400 });
  }

  const transaction: Transaction = {
    id: transactions.length + 1,
    userId,
    amount,
    date: new Date().toISOString(),
    status: Status.SUCCESS,
    recipient,
  };

  transactions.unshift(transaction);

  return NextResponse.json({ transaction }, { status: 200 });
}
