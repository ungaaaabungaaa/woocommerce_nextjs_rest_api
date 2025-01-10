"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { Package, User } from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

function UserAccount() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [CustomerName, setCustomerName] = useState<string | null>(null);
  const [CustomerLastName, setCustomerLastName] = useState<string | null>(null);
  const [CustomerPhone, setCustomerPhone] = useState<string | null>(null);
  const [CustomerAddress, setCustomerAddress] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [FirebaseUID, setFirebaseUID] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]); // State to store customer orders

  const router = useRouter();

  const navigateTo = (path: any) => {
    router.push(path);
  };

  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No user is currently signed in.");
        router.push("/");
        return;
      }
      const uid = user.uid;
      setFirebaseUID(uid);

      try {
        const email = `${uid}@uid.com`;
        const response = await axios.get(
          `https://clothvillage.com/wp-json/custom/v1/get-customer-id?email=${email}`
        );

        if (response.data.customer_id) {
          setCustomerId(response.data.customer_id);

          const customerData = await axios.get(
            `/api/retrieveCustomer?id=${response.data.customer_id}`
          );

          if (customerData.data) {
            console.log(customerData.data);
            setCustomerId(customerData.data.id);
            setCustomerName(customerData.data.first_name);
            setCustomerLastName(customerData.data.last_name);
            setCustomerPhone(customerData.data.billing.phone);
            setCustomerAddress(customerData.data.billing.address_1);

            if (customerData.data.id) {
              getOrders(customerData.data.id);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [router]);

  async function getOrders(CustomerID: string) {
    try {
      if (!CustomerID) {
        console.log("CustomerID is required");
        return;
      }

      const response = await axios.get("/api/getcustomerorders", {
        params: { customer_id: CustomerID },
      });

      if (Array.isArray(response.data)) {
        setOrders(response.data); // Set the orders state
        console.log("API Response", response.data);
      } else {
        console.log("Invalid response data");
      }
    } catch (error: any) {
      console.error("Error fetching customer orders:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black dark:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-black">
            Hi {CustomerName || "Guest"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Welcome back
          </p>
        </div>
        <div className="mb-8 flex gap-4 mt-4">
          <Button
            onClick={() => navigateTo("/auth/user")}
            href="/auth/user"
            className="rounded-full bg-white text-black dark:bg-black dark:text-white"
          >
            <Package className="mr-2 h-4 w-4" />
            Orders ({orders.length})
          </Button>
          <Button className="rounded-full bg-white text-black dark:bg-black dark:text-white">
            <User className="mr-2 h-4 w-4" />
            Account
          </Button>
        </div>
        <div className="mt-6">
          <div className="rounded-lg border border-gray-700 dark:border-gray-200 p-8 bg-black dark:bg-white">
            <div className="">
              <h2 className="text-2xl font-semibold text-white dark:text-gray-900">
                Personal Details
              </h2>
              <p className="text-white dark:text-gray-900 mt-4">
                First Name : {CustomerName}
              </p>
              <p className="text-white dark:text-gray-900">
                Last Name : {CustomerLastName}
              </p>
              <p className="text-white dark:text-gray-900">
                Phone : {CustomerPhone}
              </p>
              <p className="text-white dark:text-gray-900">
                Address : {CustomerAddress}
              </p>
              <br></br>
              <Button className="bg-white rounded-full text-black  dark:bg-black dark:text-white">
                Update Details
              </Button>
              <p className="text-xs text-muted-foreground mt-4 mb-4">
                You will be redirected to Diffrent Page
              </p>
            </div>
          </div>
          <br></br>
          <br></br>

          <div className="rounded-lg border border-gray-700 dark:border-gray-200 p-8 bg-black dark:bg-white">
            <div className="">
              <h2 className="text-2xl font-semibold text-white dark:text-gray-900">
                Password
              </h2>
              <p className="text-white dark:text-gray-900 mt-4">Password</p>
              <p className="text-white dark:text-gray-900">••••••••••••</p>
              <br></br>
              <Button className="bg-white rounded-full text-black  dark:bg-black dark:text-white">
                UPDATE PASSWORD
              </Button>
              <p className="text-xs text-muted-foreground mt-4 mb-4">
                You will be redirected to Diffrent Page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;

// check the auth type and display the password reset block
// check the auth type and update the href link
