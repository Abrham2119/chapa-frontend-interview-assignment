
import { users } from '@/services/mocks/users';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    return NextResponse.json({ email, role: user.role }, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
}
