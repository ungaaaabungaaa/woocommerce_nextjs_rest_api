'use client';

import { useParams } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';

export default function ThankYouPage() {
  const params = useParams();
  
  // Extract parameters from the params object
  const paramArray = params.params as string[];
  const [invoiceNumber, name, ...addressParts] = paramArray || [];
  const address = addressParts.join(', ');

  console.log('Invoice Number:', invoiceNumber);
  console.log('Name:', name);
  console.log('Address:', address);

  return (
    <>
      <br />
      <br />
      <br />
      {/* Main content */}
      <div className="min-h-screen text-white bg-black flex items-center justify-center p-4 relative z-10">
        <Card className="w-full max-w-2xl bg-black text-white">
          <CardHeader className="text-center flex align-middle justify-center flex-col">
            <div className="mx-auto mb-4 w-50 h-1/6 flex items-center justify-center">
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">Thank You for Your Order!</h2>
            <p className="text-gray-400">
              Your payment has been confirmed and your order is now being processed.
            </p>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Order Details</h3>
              <p>Invoice Number: {invoiceNumber || 'Not provided'}</p>
              <p>Name: {name || 'Not provided'}</p>
              <p>Shipping Address: {address || 'Not provided'}</p>
            </div>
            <div className="space-y-4">
              <p className="text-center text-gray-400">
                We&apos;ve sent a confirmation email with all the details of your order.
                If you have any questions, please don&apos;t hesitate to contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}