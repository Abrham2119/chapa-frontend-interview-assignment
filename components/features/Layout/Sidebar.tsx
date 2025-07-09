'use client';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { NavItems } from './NavItems';
import { useAuth } from '@/hooks/useAuth';

export function Sidebar() {
  const { handleLogout } = useAuth();

  return (
    <div className="hidden sm:flex">
      <div className="h-screen z-50 bg-lime-500 text-white px-5 overflow-y-auto w-64">
        <div className="w-full h-full">
          <div className="py-4">
            <Link href="/" className="flex items-center space-x-3">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Dashboard
              </span>
            </Link>
          </div>
          <div className="flex flex-col justify-between h-[85vh]">
            <NavItems />
            <div className="pb-4">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-white hover:bg-lime-600 rounded w-full"
              >
                <LogOut className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}