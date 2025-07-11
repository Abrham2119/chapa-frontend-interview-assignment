import { NextRequest, NextResponse } from 'next/server';
import { Transaction, Status } from '@/types';

let transactions: Transaction[] = [];

export async function GET(req: NextRequest) {
  const userId = Number(req.nextUrl.searchParams.get('userId'));

  if (!userId || isNaN(userId) || userId <= 0) {
    return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 });
  }

  const filtered = transactions.filter((tx) => tx.userId === userId);
  const balance = filtered.reduce((acc, tx) => acc + tx.amount, 0);

  return NextResponse.json({ balance, transactions: filtered });
}

export async function POST(req: NextRequest) {
  const { userId, amount, recipient } = await req.json();

  if (
    !userId ||
    typeof userId !== 'number' ||
    typeof amount !== 'number' ||
    !recipient ||
    typeof recipient !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid transaction data' }, { status: 400 });
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

  const userTransactions = transactions.filter((tx) => tx.userId === userId);
  const updatedBalance = userTransactions.reduce((acc, tx) => acc + tx.amount, 0);

  return NextResponse.json({ transaction: newTransaction, balance: updatedBalance });
}
