import { stats } from '@/services/mocks/stats';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(stats, { status: 200 });
}
