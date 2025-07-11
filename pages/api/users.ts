import { users } from '@/services/mocks/users';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(users, { status: 200 });
}
