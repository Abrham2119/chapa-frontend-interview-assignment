'use client';

import { useState, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { initiateTransaction } from '@/redux/slices/authSlice';

let sequentialUserId = 1;

const TransactionForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state.auth);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setError(null);
  };

  const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
    setError(null);
  };

  const validateForm = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid positive number for amount');
      return false;
    }
    if (!recipient.trim()) {
      setError('Please enter a valid recipient');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowModal(true); // Show confirmation modal
    }
  };

  const confirmTransaction = () => {
    const amountNum = parseFloat(amount);
    const currentUserId = user?.id || sequentialUserId++;
    
    dispatch(
      initiateTransaction({
        userId: currentUserId,
        amount: amountNum,
        recipient,
      })
    );

    setAmount('');
    setRecipient('');
    setShowModal(false);
    alert(`Transaction initiated successfully${!user?.id ? ` with userId: ${currentUserId}` : ''}!`);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Initiate Transaction</h3>
      <div className="flex gap-4">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={recipient}
          onChange={handleRecipientChange}
          placeholder="Recipient"
          className="p-2 border rounded-lg"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-lime-500 text-white rounded-lg cursor-pointer hover:bg-lime-600"
          type="button"
        >
          Submit
        </button>
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you want to initiate this transaction?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
                onClick={confirmTransaction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
