import { Role, Status, User } from '@/types';

export const admins: User[] = [
  { id: 2, name: 'Jane Admin', email: 'jane@example.com', role: Role.ADMIN, status: Status.ACTIVE },
  { id: 5, name: 'Bob Johnson', email: 'bob@example.com', role: Role.ADMIN, status: Status.ACTIVE },
  { id: 21, name: 'Sarah Miller', email: 'sarah@example.com', role: Role.ADMIN, status: Status.ACTIVE },
  { id: 22, name: 'Tom Wilson', email: 'tom@example.com', role: Role.ADMIN, status: Status.INACTIVE },
  { id: 23, name: 'Emily Davis', email: 'emily@example.com', role: Role.ADMIN, status: Status.ACTIVE },
];