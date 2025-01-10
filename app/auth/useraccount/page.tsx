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

function page() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [CustomerName, setCustomerName] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [FirebaseUID, setFirebaseUID] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]); // State to store customer orders

  const router = useRouter();

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
            setCustomerId(customerData.data.id);
            setCustomerName(customerData.data.first_name);

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
            href="/auth/user"
            className="rounded-full bg-white text-black dark:bg-black dark:text-white"
          >
            <Package className="mr-2 h-4 w-4" />
            Orders ({orders.length})
          </Button>
          <Button
            href="/auth/useraccount"
            className="rounded-full bg-white text-black dark:bg-black dark:text-white"
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </Button>
        </div>
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardHeader>Personal Details</CardHeader>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="grid gap-1">
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">test test</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  yousta1392@chamel.com
                </p>
              </div>
              <div className="space-y-2">
                <Button className="w-full sm:w-auto">UPDATE DETAILS</Button>
                <p className="text-xs text-muted-foreground">
                  You will be redirected to Diffrent Page
                </p>
              </div>
            </CardBody>
          </Card>
          <br></br>
          <br></br>

          <Card>
            <CardHeader>
              <h1>Password</h1>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">••••••••••••</p>
                </div>
                <div className="space-y-2">
                  <Button className="w-full sm:w-auto">UPDATE PASSWORD</Button>
                  <p className="text-xs text-muted-foreground">
                    You will be redirected to Diffrent Page
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default page;

// check the auth type and render the change password block
// get the details and display it
// navigate in bettween
