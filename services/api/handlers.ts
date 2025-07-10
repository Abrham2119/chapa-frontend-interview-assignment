import { http, HttpResponse, DefaultBodyType } from 'msw';
import { users } from '../mocks/users';
import { transactions } from '../mocks/transactions';
import { admins } from '../mocks/admins';
import { stats } from '../mocks/stats';
import { Role, Status, StatusType, User, Transaction } from '@/types';

export const handlers = [
  http.post<never, { email: string; password: string }, DefaultBodyType>('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      return HttpResponse.json({ email, role: user.role }, { status: 200 });
    }
    return HttpResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }),

  http.get('/api/users', () => {
    return HttpResponse.json(users, { status: 200 });
  }),

  http.patch<{ id: string }, { status: string }, DefaultBodyType>('/api/users/:id', async ({ request, params }) => {
    const { id } = params;
    const { status } = await request.json();
    const user = users.find((u) => u.id === Number(id));
    if (user) {
      user.status = status as StatusType;
      return HttpResponse.json(user, { status: 200 });
    }
    return HttpResponse.json({ error: 'User not found' }, { status: 404 });
  }),

http.get('/api/transactions', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    console.log('GET /api/transactions userId:', userId);
    const filteredTransactions = transactions
      .filter((tx) => tx && tx.userId === Number(userId))
      .filter((tx) => tx.id && typeof tx.amount === 'number' && tx.date && tx.status && tx.recipient);
    return HttpResponse.json(
      { balance: 1234.56, transactions: filteredTransactions },
      { status: 200 }
    );
  }),
http.post<never, { amount: number; recipient: string; userId: number }, DefaultBodyType>(
    '/api/transactions',
    async ({ request }) => {
      const { userId, amount, recipient } = await request.json();
      if (!userId || typeof amount !== 'number' || !recipient) {
        return HttpResponse.json({ error: 'Invalid transaction data' }, { status: 400 });
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
      return HttpResponse.json({ transaction }, { status: 200 });
    }
  ),

  http.get('/api/admins', () => {
    return HttpResponse.json(admins, { status: 200 });
  }),

  http.post<never, { name: string; email: string }, DefaultBodyType>('/api/admins', async ({ request }) => {
    const { name, email } = await request.json();
    const admin: User = {
      id: users.length + 1,
      name,
      email,
      role: Role.ADMIN,
      status: Status.ACTIVE,
    };
    admins.push(admin);
    return HttpResponse.json(admin, { status: 200 });
  }),

  http.delete<{ id: string }, DefaultBodyType, DefaultBodyType>('/api/admins/:id', ({ params }) => {
    const { id } = params;
    const index = admins.findIndex((a) => a.id === Number(id));
    if (index !== -1) {
      admins.splice(index, 1);
      return HttpResponse.json(id, { status: 200 });
    }
    return HttpResponse.json({ error: 'Admin not found' }, { status: 404 });
  }),

  http.get('/api/stats', () => {
    return HttpResponse.json(stats, { status: 200 });
  }),
];