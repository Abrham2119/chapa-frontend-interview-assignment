import { NextRequest, NextResponse } from 'next/server';
import { Role, Status, User } from '@/types';
import { admins } from '@/services/mocks/admins';

export async function GET() {
  return NextResponse.json(admins, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();
  const admin: User = {
    id: admins.length + 1,
    name,
    email,
    role: Role.ADMIN,
    status: Status.ACTIVE,
  };
  admins.push(admin);
  return NextResponse.json(admin, { status: 200 });
}
