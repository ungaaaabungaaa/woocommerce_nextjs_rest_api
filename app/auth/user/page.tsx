"use client";
import React, { useState, useEffect } from "react";

import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import axios from "axios";

function page() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [CustomerName, setCustomerName] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [FirebaseUID, SetFirebaseUID] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const checkAuth = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.log("No user is currently signed in.");
          router.push("/");
          return;
        }
        const uid = user.uid;
        SetFirebaseUID(uid);
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
            }
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      });
    };

    checkAuth();
  }, [router]);

  // api get user orders

  return (
    <div className="min-h-screen bg-black dark:bg-white text-white dark:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-2xl font-semibold">Hi {CustomerName}</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Welcome back
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
