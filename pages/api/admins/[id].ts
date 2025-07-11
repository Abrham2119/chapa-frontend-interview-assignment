import { admins } from '@/services/mocks/admins';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (req.method === 'DELETE') {
    const index = admins.findIndex((admin) => admin.id === id);
    if (index === -1) return res.status(404).json({ error: 'Admin not found' });

    admins.splice(index, 1);
    return res.status(200).json({ id });
  }

  res.setHeader('Allow', ['DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
