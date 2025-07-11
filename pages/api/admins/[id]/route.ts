import { admins } from '@/services/mocks/admins';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const index = admins.findIndex((admin) => admin.id === Number(params.id));
  if (index === -1) {
    return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
  }

  admins.splice(index, 1);
  return NextResponse.json({ message: 'Deleted', id: params.id }, { status: 200 });
}
