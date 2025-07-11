import { admins } from '@/services/mocks/admins';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Role, Status, User } from '@/types'; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(admins);
  }

  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing name or email' });
    }

    const newAdmin: User = {
      id: admins.length + 1,
      name,
      email,
      role: Role.ADMIN,        
      status: Status.ACTIVE,  
    };

    admins.push(newAdmin);
    return res.status(200).json(newAdmin);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
