'use client';

import dynamic from 'next/dynamic';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';

// Dynamic import for LottieAnimation
const LottieAnimation = dynamic(() => import('../component/LottieAnimation'), { ssr: false });

export default function ThankYouPage() {
  const invoiceNumber = "INV-001";
  const name = "John Doe";
  const address = "123 Main St, Anytown, AN 12345";

  return (
    <>
      {/* Main content */}
      <div className="min-h-screen text-white bg-black flex items-center justify-center p-4 relative z-10">
        <Card className="w-full max-w-2xl bg-black text-white">
          <CardHeader className="text-center flex align-middle justify-center flex-col">
            <div className="mx-auto mb-4 w-50 h-1/6 flex items-center justify-center">
              <LottieAnimation />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">Thank You for Your Order!</h2>
            <p className="text-gray-400">
              Your payment has been confirmed and your order is now being processed.
            </p>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Order Details</h3>
              <p>Invoice Number: {invoiceNumber}</p>
              <p>Name: {name}</p>
              <p>Shipping Address: {address}</p>
            </div>
            <div className="space-y-4">
              <p className="text-center text-gray-400">
                We&apos;ve sent a confirmation email with all the details of your order.
                If you have any questions, please don&apos;t hesitate to contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  View Order Status
                </Button>
                <Button className="bg-white text-black hover:bg-black hover:text-white">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
