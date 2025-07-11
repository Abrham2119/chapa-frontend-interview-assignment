// pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next'

const users = [
  { email: 'john@gmail.com', password: 'userpass', role: 'User' },
  { email: 'admin@gmail.com', password: 'adminpass', role: 'Admin' },
  { email: 'super@gmail.com', password: 'superpass', role: 'Super_Admin' },
]

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
