import { Transaction, Status } from '@/types';

export const transactions: Transaction[] = [
  {
    id: 1,
    userId: 1,
    amount: 500,
    date: '2024-07-01T12:00:00Z',
    status: Status.SUCCESS,
    recipient: 'John Doe',
  },
  {
    id: 2,
    userId: 2,
    amount: 200,
    date: '2024-07-02T12:00:00Z',
    status: Status.FAILED,
    recipient: 'Jane Doe',
  },
];
