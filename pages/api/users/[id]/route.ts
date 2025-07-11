import { NextRequest, NextResponse } from 'next/server';
import { StatusType } from '@/types';
import { users } from '@/services/mocks/users';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await req.json();
  const user = users.find((u) => u.id === Number(params.id));

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  user.status = status as StatusType;
  return NextResponse.json(user, { status: 200 });
}
