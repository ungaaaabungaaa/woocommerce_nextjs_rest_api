"use client"

import { useState, useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Package, Truck, Clock, DollarSign, HelpCircle, ShieldCheck } from 'lucide-react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/trackorder?id=${orderId}`
      );
      return response.data; // Adjust this based on the actual response structure
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch order details");
        toast.error("Failed to fetch order details", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrderDetails(null);

    try {
      const details = await fetchOrderDetails(orderNumber);
      setOrderDetails(details);
    } catch (err: any) {
      setError(err.message || "Failed to fetch order details. Please try again.");
      toast.error("Failed to fetch order details. Please try again", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <br />
      <ToastContainer />
      <div className="h-3/4 bg-black text-white">
        <main className="container mx-auto px-4 py-8">
          <Card className=" bg-black text-white max-w-2xl mx-auto">
            <CardHeader className="flex flex-col items-center space-y-4">
              <Package size={48} className="text-white" />
              <h1 className="text-3xl font-bold">Track Your Order</h1>
              <p className="text-center text-white">
                Enter your order number to see the details and status of your order.
              </p>
            </CardHeader>

            <Divider className="my-4" />

            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="order-number" className="block text-sm font-medium text-white">
                    Order Number
                  </label>
                  <Input
                    id="order-number"
                    name="orderNumber"
                    type="text"
                    isClearable
                    size="lg"
                    isRequired
                    className="mt-1 w-full bg-black text-white"
                    placeholder="Enter your Order Number"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-2/4 lg:w-1/4 bg-white text-black py-2 px-4 rounded-full hover:bg-black hover:text-white"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Track Order"}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-4 rounded bg-red-800">
                  {error}
                </div>
              )}

              {orderDetails && (
                <div className="mt-6 space-y-6">
                  <h2 className="text-2xl font-semibold">Order Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-6 h-6" />
                      <div>
                        <p className="text-gray-400">Order Number</p>
                        <p className="font-semibold">{orderDetails.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-6 h-6" />
                      <div>
                        <p className="text-gray-400">Order Date</p>
                        <p className="font-semibold">
                          {new Date(orderDetails.date_created).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="w-6 h-6" />
                      <div>
                        <p className="text-gray-400">Status</p>
                        <p className="font-semibold capitalize">{orderDetails.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-6 h-6" />
                      <div>
                        <p className="text-gray-400">Total</p>
                        <p className="font-semibold">${orderDetails.total}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Items</h3>
                    <ul className="space-y-2">
                      {orderDetails.line_items.map((item: any, index: number) => (
                        <li key={index} className="bg-white text-black p-3 rounded-lg flex justify-between">
                          <span>{item.name}</span>
                          <span>Qty: {item.quantity} - ${item.total}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
                    <p className="bg-white text-black p-3 rounded-lg">
                      {orderDetails.billing.first_name} {orderDetails.billing.last_name}<br />
                      {orderDetails.billing.address_1}<br />
                      {orderDetails.billing.city}, {orderDetails.billing.state} {orderDetails.billing.postcode}<br />
                      {orderDetails.billing.country}
                    </p>
                  </div>

                  <div className="bg-white text-black p-3 rounded-lg flex justify-between items-center">
                    <span className="font-semibold">Shipping Total</span>
                    <span>${orderDetails.shipping_total}</span>
                  </div>
                </div>
              )}
            </CardBody>

            <CardFooter>
              <div className="w-full space-y-4">
                <div className="flex items-center">
                  <ShieldCheck className="text-white mr-2" />
                  <p className="text-sm text-gray-300">Your order information is secure and protected.</p>
                </div>
                <div className="flex items-center">
                  <HelpCircle className="text-white mr-2" />
                  <p className="text-sm text-gray-300">
                    Need help? Contact our support team at{' '}
                    <a href="mailto:support@example.com" className="underline">
                      support@example.com
                    </a>
                  </p>
                </div>
              </div>
            </CardFooter>
            
          </Card>
          
        </main>
        
      </div>
      <br />
      <br />
    </>
  );
}
