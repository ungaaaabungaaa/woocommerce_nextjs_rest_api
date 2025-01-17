"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Package, User } from "lucide-react";
import { ChevronLeft } from "lucide-react";

export default function ViewOrder() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  // how to use this one
  // <span className="font-semibold">{orderNumber}</span>

  const [mounted, setMounted] = useState(false);
  const [CustomerName, setCustomerName] = useState<string | null>(null);
  const [CustomerLastName, setCustomerLastName] = useState<string | null>(null);
  const [CustomerPhone, setCustomerPhone] = useState<string | null>(null);
  const [CustomerAddress, setCustomerAddress] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [FirebaseUID, setFirebaseUID] = useState<string | null>(null);
  const [authProvider, setAuthProvider] = useState<string>("");
  const [orders, setOrders] = useState<any[]>([]);

  const router = useRouter();

  const navigateTo = (path: any) => {
    router.push(path);
  };

  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        return;
      }
      const uid = user.uid;
      setFirebaseUID(uid);

      let provider = user.providerData[0]?.providerId || "Unknown";
      setAuthProvider(provider);
      if (provider === "password") {
        console.log(`IS EMAIL AUTH: ${provider}`);
      } else {
        console.log(`IS Socail MEDIA AUTH: ${provider}`);
      }

      try {
        const email = `${uid}@uid.com`;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom/v1/get-customer-id?email=${email}`
        );

        if (response.data.customer_id) {
          setCustomerId(response.data.customer_id);

          const customerData = await axios.get(
            `/api/retrieveCustomer?id=${response.data.customer_id}`
          );

          if (customerData.data) {
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

  const handleGoBack = () => {
    router.back(); // Navigates to the previous page
  };

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
        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => navigateTo("/auth/user")}
            href="/auth/user"
            className="rounded-full bg-white text-black dark:bg-black dark:text-white"
          >
            <Package className="mr-2 h-4 w-4" />
            Orders ({orders.length})
          </Button>
          <Button
            onClick={() => navigateTo("/auth/useraccount")}
            className="rounded-full bg-white text-black dark:bg-black dark:text-white"
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </Button>
        </div>
        <div className="flex items-center pt-4">
          <p
            onClick={handleGoBack}
            className=" h-4 text-sm text-gray-500 dark:text-gray-400  mt-2 cursor-pointer"
          >
            &lt; &nbsp; <span className="underline">Order History</span>
          </p>
        </div>
      </div>
    </div>
  );
}
