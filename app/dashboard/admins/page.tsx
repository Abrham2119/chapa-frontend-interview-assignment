'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { addAdmin, fetchUsers, removeAdmin } from '@/redux/slices/authSlice';
import { User, Role } from '@/types';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';   

export default function Admins() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.auth.users);
  const role = useAppSelector((state) => state.auth.role);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const admins = users.filter((user) => user.role === Role.ADMIN);
  const nonAdmins = users.filter((user) => user.role === Role.USER);

  const handleDeleteClick = (id: number) => {
    setSelectedAdminId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedAdminId !== null) {
      dispatch(removeAdmin(selectedAdminId))
        .unwrap()
        .then(() => toast.success('Admin removed successfully'))
        .catch(() => toast.error('Failed to remove admin'));
    }
    setShowConfirm(false);
    setSelectedAdminId(null);
  };

  const handleAddAdmin = (user: User) => {
    dispatch(addAdmin({ name: user.name, email: user.email }))
      .unwrap()
      .then(() => toast.success('Admin added successfully'))
      .catch(() => toast.error('Failed to add admin'));
    setShowAddModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="mx-auto max-w-xl p-6 border-2 border-lime-500 rounded-2xl shadow-md bg-white text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-lime-500 text-center">Admins</h2>

      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
      >
        <Plus className="inline mr-1" size={16} />
        Add Admin
      </button>

      <ul className="space-y-3">
        {admins.map((admin) => (
          <li
            key={admin.id}
            className="p-4 border border-gray-200 rounded-md w-full flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{admin.name}</p>
              <p className="text-sm text-gray-600">{admin.email}</p>
            </div>
            <button
              onClick={() => handleDeleteClick(admin.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4 text-gray-800">
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
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-center text-lime-600">Add Admin</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {nonAdmins.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center p-2 border rounded-md"
                >
                  <div>
                    <p>{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleAddAdmin(user)}
                    className="text-lime-600 hover:underline"
                  >
                    Make Admin
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAddModal(false)}
              className="mt-4 w-full bg-gray-300 text-gray-800 rounded py-2 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
