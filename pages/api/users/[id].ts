import { users } from '@/services/mocks/users';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  if (method === 'PATCH') {
    const userIndex = users.findIndex((u) => u.id === Number(id));
    if (userIndex !== -1) {
      users[userIndex].status = body.status;
      return res.status(200).json(users[userIndex]);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  }

  res.setHeader('Allow', ['PATCH']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
