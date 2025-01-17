"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { Package, User } from "lucide-react";

function CheckoutCustomer() {
  const [mounted, setMounted] = useState(false);
  const [CustomerName, setCustomerName] = useState<string | null>(null);
  const [CustomerLastName, setCustomerLastName] = useState<string | null>(null);
  const [CustomerPhone, setCustomerPhone] = useState<string | null>(null);
  const [CustomerAddress, setCustomerAddress] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [FirebaseUID, setFirebaseUID] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [authProvider, setAuthProvider] = useState<string>("");

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
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [router]);

  return (
    <div className="min-h-screen bg-black dark:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-black">
            Checkout Form
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            We Are Almost Done {CustomerName || "Guest"}
          </p>
          <h3 className="text-xl text-white dark:text-black mb-6">
            Shipping Information
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCustomer;

// checkout implemenation
// thank you page and no backbutton disable
// handle all the orders
// mini cart
