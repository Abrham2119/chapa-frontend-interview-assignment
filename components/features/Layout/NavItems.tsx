'use client';
import Link from 'next/link';
import { Role } from '@/types';
import { 
  WalletIcon, 
  TransactionsIcon, 
  UsersIcon, 
  PaymentsIcon, 
  AdminsIcon, 
  StatsIcon 
} from './icons';
import { useAuth } from '@/hooks/useAuth';

type NavItem = {
  id: number;
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: Role[];
};

export function NavItems() {
  const { role } = useAuth();

  const navItems: NavItem[] = [
    {
      id: 1,
      href: '/dashboard/wallet',
      label: 'Wallet',
      icon: <WalletIcon />,
      roles: [Role.USER, Role.ADMIN, Role.SUPER_ADMIN]
    },
    {
      id: 2,
      href: '/dashboard/transactions',
      label: 'Transactions',
      icon: <TransactionsIcon />,
      roles: [Role.USER, Role.ADMIN, Role.SUPER_ADMIN]
    },
    {
      id: 3,
      href: '/dashboard/users',
      label: 'Users',
      icon: <UsersIcon />,
      roles: [Role.ADMIN, Role.SUPER_ADMIN]
    },
    {
      id: 4,
      href: '/dashboard/payments',
      label: 'Payments',
      icon: <PaymentsIcon />,
      roles: [Role.ADMIN, Role.SUPER_ADMIN]
    },
    {
      id: 5,
      href: '/dashboard/admins',
      label: 'Admins',
      icon: <AdminsIcon />,
      roles: [Role.SUPER_ADMIN]
    },
    {
      id: 6,
      href: '/dashboard/stats',
      label: 'Stats',
      icon: <StatsIcon />,
      roles: [Role.SUPER_ADMIN]
    }
  ];

  const filteredItems = navItems.filter(item => 
    role && item.roles.includes(role)
  );

  return (
    <ul className="py-10 space-y-2 font-medium">
      {filteredItems.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="flex items-center p-2 text-white rounded-lg hover:bg-lime-600 group"
          >
            {item.icon}
            <span className="ms-3">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}