'use client';

import UserList from "@/components/features/UserList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users</h2>            
      <UserList />
      <ToastContainer />
    </div>
  );
};

export default Users;