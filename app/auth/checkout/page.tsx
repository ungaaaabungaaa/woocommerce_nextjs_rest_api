"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { Package, User } from "lucide-react";
import { Input } from "@nextui-org/input";
import MiniCart from "@/app/component/minicart";

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
    <div className="flex flex-col lg:flex-row-reverse lg:space-x-4 bg-black dark:bg-white">
      <div className="w-full h-auto lg:order-2 p-6 lg:p-12 flex align-middle justify-start flex-col">
        <h1 className="text-3xl font-bold text-white dark:text-black">
          Checkout Form
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          We Are Almost Done {CustomerName || "Guest"}
        </p>
        <h3 className="text-xl text-white dark:text-black mb-6">
          Shipping Information
        </h3>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white dark:text-black mb-1"
            >
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              isRequired
              placeholder="Enter your Email"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-white dark:text-black mb-1"
              >
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                isRequired
                placeholder="Enter your First Name"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-white dark:text-black mb-1"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                isRequired
                placeholder="Enter your Last Name"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-white dark:text-black mb-1"
              >
                Address
              </label>
              <Input
                id="address"
                name="address"
                type="text"
                isRequired
                placeholder="Lane 1, Street 1"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="apt"
                className="block text-sm font-medium text-white dark:text-black mb-1"
              >
                Apt, suite, etc.
              </label>
              <Input
                id="apt"
                name="apt"
                type="text"
                placeholder="Apartment, Studio, or floor"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-white dark:text-black mb-1"
              >
                City
              </label>
              <Input
                id="city"
                name="city"
                type="text"
                isRequired
                placeholder="Enter Your City"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-white dark:text-black mb-1"
              >
                Country
              </label>
              <Input
                id="country"
                name="country"
                type="text"
                isRequired
                placeholder="Enter Country"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="postCode"
                className="block text-sm font-medium text-white dark:text-black mb-1"
              >
                PostCode
              </label>
              <Input
                id="postCode"
                name="postCode"
                type="text"
                isRequired
                placeholder="12345"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-white dark:text-black mb-1"
              >
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                isRequired
                placeholder="+1 (555) 555-5555"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="w-full h-auto lg:order-1 p-6 lg:p-12 flex align-middle justify-center flex-col">
        <h2 className="text-2xl font-bold mb-6">Cart Items</h2>
        <MiniCart />
        <br />
      </div>
    </div>
  );
}

export default CheckoutCustomer;

// handle all the orders
// mini cart
