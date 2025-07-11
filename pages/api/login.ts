import { NextRequest, NextResponse } from 'next/server';

const users = [
  { email: 'john@gmail.com', password: 'userpass', role: 'User' },
  { email: 'admin@gmail.com', password: 'adminpass', role: 'Admin' },
  { email: 'super@gmail.com', password: 'superpass', role: 'Super_Admin' },
];

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    return NextResponse.json({ email: user.email, role: user.role }, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
}
