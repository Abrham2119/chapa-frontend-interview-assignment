export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super_Admin'
}

export type RoleType = typeof Role[keyof typeof Role];

export const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;
export type StatusType = typeof Status[keyof typeof Status];


export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: StatusType;
}

export interface Transaction {
  id: number;
  userId: number;
  amount: number;
  date: string;
    status: StatusType;
    recipient: string;
 
}

export interface Stats {
    totalPayments?: number;
  activeUsers?: number;
  totalUsers?: number;
  totalTransactions?: number;

}

export interface AuthState {
  user: User | null;
  email: string | null;
  role: Role;
  isAuthenticated: boolean;
  users: User[];
  transactions: Transaction[];
  stats: Stats | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}