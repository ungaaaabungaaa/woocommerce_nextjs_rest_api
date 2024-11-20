"use client"

import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';

export default function RefundPage() {
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Random success or failure for demonstration
      if (Math.random() > 0.5) {
        setStatus('success');
        setMessage('Your refund request has been submitted successfully. We will process it within 3-5 business days.');
      } else {
        setStatus('error');
        setMessage('There was an error processing your refund request. Please ensure your order ID is correct and try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again later.');
    }

    // Handle notifications
    if (status === 'success') {
      console.log('Success:', message);
      alert(`Success: ${message}`);
    } else if (status === 'error') {
      console.log('Error:', message);
      alert(`Error: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Request a Refund</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your order ID and reason for the refund
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="order-id" className="sr-only">Order ID</label>
              <Input
                id="order-id"
                name="orderId"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reason" className="sr-only">Reason for Refund</label>
              <Textarea
                id="reason"
                name="reason"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Reason for refund"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Processing...' : 'Submit Refund Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
