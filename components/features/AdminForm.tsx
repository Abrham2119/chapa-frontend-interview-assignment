'use client';

import { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addAdmin } from '@/redux/slices/authSlice';
import EmailInputField from '../ui/InputField/EmailInputField';

const AdminForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(null);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = () => {
    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }
    dispatch(addAdmin({ name, email }));
    setName('');
    setEmail('');
    alert('Admin added successfully!');
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Add Admin</h3>
      <div className="flex gap-4">
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          className="p-2 border rounded-lg"
        />
        <EmailInputField
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Add Admin
        </button>
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default AdminForm;