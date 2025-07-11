import { Transaction, Status } from '@/types';

export const transactions: Transaction[] = [
  { id: 1, userId: 1, amount: 500, date: '2024-07-01T12:00:00Z', status: Status.SUCCESS, recipient: 'John Doe' },
  { id: 2, userId: 2, amount: 200, date: '2024-07-02T12:00:00Z', status: Status.FAILED, recipient: 'Jane Admin' },

  { id: 3, userId: 3, amount: 1000, date: '2024-06-15T09:30:00Z', status: Status.SUCCESS, recipient: 'Super Admin' },
  { id: 4, userId: 4, amount: 150, date: '2024-06-20T14:00:00Z', status: Status.SUCCESS, recipient: 'Alice Smith' },

  { id: 5, userId: 5, amount: 250, date: '2024-06-25T08:00:00Z', status: Status.SUCCESS, recipient: 'Bob Johnson' },
  { id: 6, userId: 6, amount: 300, date: '2024-07-03T16:45:00Z', status: Status.SUCCESS, recipient: 'Emma Brown' },

  { id: 7, userId: 7, amount: 50, date: '2024-07-04T11:15:00Z', status: Status.FAILED, recipient: 'Liam Davis' },
  { id: 8, userId: 8, amount: 400, date: '2024-07-05T10:00:00Z', status: Status.SUCCESS, recipient: 'Olivia Wilson' },

  { id: 9, userId: 9, amount: 350, date: '2024-07-06T13:00:00Z', status: Status.SUCCESS, recipient: 'Noah Taylor' },
  { id: 10, userId: 10, amount: 600, date: '2024-07-07T14:30:00Z', status: Status.SUCCESS, recipient: 'Ava Anderson' },

  { id: 11, userId: 11, amount: 80, date: '2024-07-08T15:00:00Z', status: Status.SUCCESS, recipient: 'Sophia Lee' },
  { id: 12, userId: 12, amount: 120, date: '2024-07-09T09:00:00Z', status: Status.SUCCESS, recipient: 'James White' },

  { id: 13, userId: 13, amount: 700, date: '2024-07-10T12:00:00Z', status: Status.FAILED, recipient: 'Isabella Harris' },
  { id: 14, userId: 14, amount: 450, date: '2024-07-11T13:00:00Z', status: Status.SUCCESS, recipient: 'Michael Clark' },

  { id: 15, userId: 15, amount: 320, date: '2024-07-12T10:30:00Z', status: Status.SUCCESS, recipient: 'Mia Lewis' },
  { id: 16, userId: 16, amount: 270, date: '2024-07-13T14:00:00Z', status: Status.SUCCESS, recipient: 'William Walker' },

  { id: 17, userId: 17, amount: 90, date: '2024-07-14T15:45:00Z', status: Status.SUCCESS, recipient: 'Charlotte Young' },
  { id: 18, userId: 18, amount: 220, date: '2024-07-15T11:00:00Z', status: Status.SUCCESS, recipient: 'Daniel Hall' },

  { id: 19, userId: 19, amount: 500, date: '2024-07-16T16:30:00Z', status: Status.SUCCESS, recipient: 'Amelia Allen' },
  { id: 20, userId: 20, amount: 130, date: '2024-07-17T09:15:00Z', status: Status.FAILED, recipient: 'Henry King' },
];
