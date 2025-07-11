'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUsers, toggleUserStatus, removeAdmin } from '@/redux/slices/authSlice';
import { Column } from 'react-table';
import { User, Status, Role } from '@/types';
import Table from '@/components/ui/table/Table';
import { toast } from 'react-toastify';

interface UserListProps {
  isAdminList?: boolean;
}

const UserList = ({ isAdminList = false }: UserListProps) => {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE;
    dispatch(toggleUserStatus({ userId: user.id, status: newStatus }))
      .unwrap()
      .then(() => {
        toast.success(`User ${newStatus === Status.ACTIVE ? 'activated' : 'deactivated'} successfully`);
      })
      .catch(() => {
        toast.error('Failed to update user status');
      });
  };

  const handleRemoveAdmin = (userId: number) => {
    dispatch(removeAdmin(userId))
      .unwrap()
      .then(() => {
        toast.success('Admin removed successfully');
      })
      .catch(() => {
        toast.error('Failed to remove admin');
      });
  };

  const columns: Column<User>[] = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    {
      Header: 'Role',
      accessor: 'role',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    ...(isAdminList
      ? [
          {
            Header: 'Actions',
            Cell: ({ row }: { row: { original: User } }) => (
              <button
                onClick={() => handleRemoveAdmin(row.original.id)}
                className="p-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            ),
          },
        ]
      : [
          {
            Header: 'Actions',
            Cell: ({ row }: { row: { original: User } }) => (
              <button
                onClick={() => handleToggleStatus(row.original)}
                className="p-1 bg-blue-500 text-white rounded"
              >
                {row.original.status === Status.ACTIVE ? 'Deactivate' : 'Activate'}
              </button>
            ),
          },
        ]),
  ];
  const data = users.filter((u) => u.role === Role.USER);
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">{isAdminList ? 'Admin Management' : 'User Management'}</h3>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
  );
};

export default UserList;
