// pages/api/login.ts

import { users } from '@/services/mocks/users'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      return res.status(200).json({ email: user.email, role: user.role })
    } else {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
