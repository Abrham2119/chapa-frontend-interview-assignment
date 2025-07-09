'use client';

import { useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Admin {
  id: string;
  name: string;
  email: string;
}

export default function Admins() {
  const user = useAppSelector((state) => state.auth);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

  useEffect(() => {
    if (user.role !== 'Super_Admin' && user.role !== 'User') return;

    fetch('/api/admins')
      .then((res) => res.json())
      .then((data) => setAdmins(data));
  }, [user]);

  const handleDeleteClick = (id: string) => {
    setSelectedAdminId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedAdminId) {
      setAdmins((prev) => prev.filter((admin) => admin.id !== selectedAdminId));
    }
    setShowConfirm(false);
    setSelectedAdminId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedAdminId(null);
  };

  return (
    <div className="mx-auto max-w-xl p-6 border-2 border-lime-500 rounded-2xl shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-lime-500 text-center">Admins</h2>

      <ul className="space-y-3">
        {admins.map((a) => (
          <li
            key={a.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-md w-full flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{a.email}</p>
            </div>
            <button onClick={() => handleDeleteClick(a.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800/80 p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Are you sure you want to delete this admin?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
