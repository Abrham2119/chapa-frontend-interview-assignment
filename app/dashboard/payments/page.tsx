'use client';

import PaymentSummary from "@/components/features/PaymentSummary";


const Payments = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Payments</h2>
      <PaymentSummary />
    </div>
  );
};

export default Payments;