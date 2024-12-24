"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { HelpCircle, RefreshCcw, ShieldCheck } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API function to request refund (using POST request)
const requestrefund = async (orderId: string, reason: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/refund?orderId=${orderId}`
    );
    return response.data; // Adjust this based on the actual response structure
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Refund Not Avaible On Cash On Delivery Orders"
    );
  }
};

export default function RefundPage() {
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Call the real API instead of the simulation
      const response = await requestrefund(orderId, reason);

      // Handle the response from the API
      setStatus("success");
      setMessage(
        "Your refund request has been submitted successfully. We will process it within 3-5 business days."
      );
      toast.success(
        "our refund request has been submitted successfully. We will process it within 3-5 business days.",
        {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        }
      );
    } catch (error: any) {
      setStatus("error");
      setMessage(
        error.message || "An unexpected error occurred. Please try again later."
      );
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white dark:bg-white dark:text-black">
        <ToastContainer />
        <main className="container mx-auto px-4 py-8">
          <Card
            shadow="none"
            className="bg-black text-white max-w-2xl mx-auto dark:bg-white dark:text-black"
          >
            <CardHeader className="flex flex-col items-center space-y-4">
              <RefreshCcw size={48} className="text-white dark:text-black" />
              <h1 className="text-3xl font-bold">Request a Refund</h1>
              <p className="text-center text-white dark:text-black">
                We&apos;re sorry you&apos;re not satisfied with your purchase.
                Please fill out the form below to request a refund.
              </p>
            </CardHeader>

            <Divider className="my-4" />

            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="order-id"
                    className="block text-sm font-medium text-white dark:text-black"
                  >
                    Order ID
                  </label>
                  <Input
                    id="order-id"
                    name="orderId"
                    type="text"
                    isClearable
                    size="lg"
                    isRequired
                    className="mt-1 w-full bg-black text-white dark:bg-white dark:text-black"
                    placeholder="Enter your Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-white dark:text-black"
                  >
                    Reason for Refund
                  </label>
                  <Textarea
                    id="reason"
                    name="reason"
                    className="mt-1 w-full bg-black text-white dark:bg-white dark:text-black"
                    placeholder="Please provide a detailed reason for your refund request"
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-2/4 lg:w-1/4 bg-white text-black py-2 px-4 rounded-full dark:bg-black dark:text-white"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Processing..." : "Request Refund"}
                </Button>
              </form>

              {message && (
                <div
                  className={`mt-4 p-4 rounded ${status === "success" ? "bg-green-800" : "bg-red-800"}`}
                >
                  {message}
                </div>
              )}
            </CardBody>

            <CardFooter>
              <div className="w-full space-y-4">
                <div className="flex items-center">
                  <ShieldCheck className="text-white dark:text-black mr-2" />
                  <p className="text-sm text-gray-300 dark:text-black">
                    Your refund request is secure and will be processed
                    promptly.
                  </p>
                </div>
                <div className="flex items-center">
                  <HelpCircle className="text-white dark:text-black mr-2" />
                  <p className="text-sm text-gray-300 dark:text-black">
                    Need help? Contact our support team at{" "}
                    <a href="mailto:support@example.com">support@example.com</a>
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
