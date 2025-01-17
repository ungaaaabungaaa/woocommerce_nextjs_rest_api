"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Package, User } from "lucide-react";
import type { OrderDetails } from "@/types/order";
import { OrderTracking } from "@/app/component/order-tracking";
import { OrderStatus } from "@/app/component/order-status";

export default function ViewOrder() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [orderStatus, setOrderStatus] = useState("Processing Order");
  const [mounted, setMounted] = useState(false);
  const [CustomerName, setCustomerName] = useState<string | null>(null);
  const [CustomerLastName, setCustomerLastName] = useState<string | null>(null);
  const [CustomerPhone, setCustomerPhone] = useState<string | null>(null);
  const [CustomerAddress, setCustomerAddress] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [FirebaseUID, setFirebaseUID] = useState<string | null>(null);
  const [authProvider, setAuthProvider] = useState<string>("");
  const [orders, setOrders] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

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

            if (customerData.data.id && orderNumber) {
              getOrders(customerData.data.id);
              const orderData = await getOrdersDetails(orderNumber);
              if (orderData) {
                // Transform API response to match OrderDetails type
                setOrderStatus(orderData.status);
                console.log("Order Data", orderData.status);
                const formattedOrder: OrderDetails = {
                  id: orderData.id,
                  status: orderData.status,
                  date_created: orderData.date_created,
                  total: orderData.total,
                  currency_symbol: orderData.currency_symbol,
                  billing: {
                    first_name: orderData.billing.first_name,
                    last_name: orderData.billing.last_name,
                    address_1: orderData.billing.address_1,
                    address_2: orderData.billing.address_2,
                    city: orderData.billing.city,
                    state: orderData.billing.state,
                    postcode: orderData.billing.postcode,
                    country: orderData.billing.country,
                    phone: orderData.billing.phone,
                  },
                  shipping: {
                    first_name: orderData.shipping.first_name,
                    last_name: orderData.shipping.last_name,
                    address_1: orderData.shipping.address_1,
                    address_2: orderData.shipping.address_2,
                    city: orderData.shipping.city,
                    state: orderData.shipping.state,
                    postcode: orderData.shipping.postcode,
                    country: orderData.shipping.country,
                    phone: orderData.shipping.phone,
                  },
                  line_items: orderData.line_items.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: {
                      src: item.image?.src || "",
                    },
                  })),
                  payment_method: orderData.payment_method,
                  transaction_id: orderData.transaction_id,
                };
                setOrderDetails(formattedOrder);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    });

    return () => unsubscribe();
  }, [router, orderNumber]);

  const handleGoBack = () => {
    router.back();
  };

  async function getOrdersDetails(OrderID: string) {
    try {
      if (!OrderID) {
        console.log("OrderID is required");
        return null;
      }

      const response = await axios.get("/api/trackorder", {
        params: { id: OrderID },
      });
      if (response.data && response.data.id) {
        console.log("Order details:", response.data);
        return response.data;
      } else {
        console.log("Invalid response data:", response.data);
        return null;
      }
    } catch (error: any) {
      console.error("Error fetching customer orders:", error.message);
      return null;
    }
  }

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
        setOrders(response.data);
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
          <Button
            onClick={handleGoBack}
            className="h-4 text-sm text-white dark:text-black mt-2 cursor-pointer bg-transparent"
          >
            {" "}
            &lt; &nbsp; <span className="underline">Order History</span>
          </Button>
        </div>
        <br></br>
        <div className="rounded-lg border py-8 bg-gray-700 dark:bg-gray-200 border-gray-700 dark:border-gray-200 hidden md:block flex justify-center">
          {orderDetails && <OrderStatus status={orderStatus}></OrderStatus>}
        </div>
        {orderDetails && <OrderTracking order={orderDetails} />}
      </div>
    </div>
  );
}
