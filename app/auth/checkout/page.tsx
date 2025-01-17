"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import MiniCart from "@/app/component/minicart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useCartKey } from "@/hooks/useCartKey";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  country: string;
  postCode: string;
  phoneNumber: string;
}

interface CartData {
  items: CartItem[];
  totals: {
    subtotal: string;
    total: string;
  };
}

interface CartItem {
  item_key: string;
  id: number;
  name: string;
  price: string;
  quantity: { value: number };
  featured_image: string;
}

function CheckoutCustomer() {
  const { cartKey } = useCartKey();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [cartTotal, setCartTotal] = useState<string>("0.00");
  const [lineItems, setLineItems] = useState<
    { product_id: number; quantity: number }[]
  >([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [firebaseUID, setFirebaseUID] = useState<string | null>(null);
  const [authProvider, setAuthProvider] = useState<string>("");
  const wooCommerceOrderIdRef = React.useRef<string | null>(null);
  const router = useRouter();
  const [CustomerName, setCustomerName] = useState<string | null>(null);
  const [hideEmail, setHideEmail] = React.useState(true);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    country: "",
    postCode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }
      const uid = user.uid;
      setFirebaseUID(uid);

      let provider = user.providerData[0]?.providerId || "Unknown";
      console.log(`Login provider: ${provider}`);
      if (provider !== "password") {
        setHideEmail(false); // Show email input
      } else {
        console.log("Bro this user used Emaillll Ewwww");
        setHideEmail(true); // Hide email input
      }

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
            setFormData({
              email: customerData.data.username || "",
              firstName: customerData.data.first_name || "",
              lastName: customerData.data.last_name || "",
              address: customerData.data.billing.address_1 || "",
              apt: customerData.data.billing.address_2 || "",
              city: customerData.data.billing.city || "",
              country: customerData.data.billing.country || "",
              postCode: customerData.data.billing.postcode || "",
              phoneNumber: customerData.data.billing.phone || "",
            });
            setCustomerName(customerData.data.first_name);
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  useEffect(() => {
    if (cartKey) {
      fetchCartDetails();
    }
  }, [cartKey]);

  const fetchCartDetails = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`;
      const response = await axios.get(url, { params: { cart_key: cartKey } });
      setCartData(response.data);
      const rawTotal = response.data.totals.total;
      const cleanedTotal =
        (typeof rawTotal === "number" ? rawTotal : parseFloat(rawTotal)) / 100;
      const formattedTotal = cleanedTotal.toFixed(2);
      const formattedLineItems = formatLineItems(response.data.items);
      setLineItems(formattedLineItems);
      setCartTotal(formattedTotal);
    } catch (err) {
      console.error("Error fetching cart details:", err);
      toast.error("Error fetching cart details", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
    }
  };

  const formatLineItems = (cartItems: CartItem[]) => {
    return cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity.value,
    }));
  };

  const clearCart = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/clear`;
      await axios.post(url, {}, { params: { cart_key: cartKey } });
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const requiredFields: (keyof FormData)[] = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "country",
      "postCode",
      "phoneNumber",
    ];
    const allFieldsFilled = requiredFields.every(
      (field) => updatedFormData[field]?.trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
  };

  const createOrderWoocommerce = async (
    formData: FormData,
    formattedTotal: string,
    lineItems: { product_id: number; quantity: number }[]
  ) => {
    try {
      const orderData = {
        payment: {
          method: "Paypal",
          title: "PayPal Payment",
          transactionID: "",
        },
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          address_2: formData.apt || "",
          city: formData.city,
          postcode: formData.postCode,
          country: formData.country,
          email: formData.email,
          phone: formData.phoneNumber,
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          address_2: formData.apt || "",
          city: formData.city,
          postcode: formData.postCode,
          country: formData.country,
          phone: formData.phoneNumber,
        },
        line_items: lineItems,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "0",
          },
        ],
      };

      const response = await axios.post("/api/placeorder", orderData);
      console.log("Order created successfully! Order ID:", response.data.id);
      wooCommerceOrderIdRef.current = response.data.id;
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order. Please contact us!", {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
      throw error;
    }
  };

  const handleApprove = async (
    paypalOrderId: string,
    woocommerceOrderId: string
  ) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/paymentcompleted?orderId=${woocommerceOrderId}&transactionId=${paypalOrderId}`;
      const response = await axios.put(apiUrl);

      if (response.status === 200) {
        toast.success("Payment processed successfully!", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
        await clearCart();
        router.push(`/thankyou/${woocommerceOrderId}`);
      } else {
        toast.error("Payment processed, but there was an issue!", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error during API call:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Payment error: ${error.response.data.error}`, {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      } else {
        toast.error("Failed to process payment. Please try again later.", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row-reverse lg:space-x-4 bg-black dark:bg-white">
      <ToastContainer />
      <div className="w-full h-auto lg:order-2 p-6 lg:p-12 flex align-middle justify-start flex-col">
        <h1 className="text-3xl text-white dark:text-black font-bold mb-6">
          Checkout Form
        </h1>
        <h3 className="text-xl text-white dark:text-black mb-6">
          Shipping Information
        </h3>

        <form onSubmit={(e) => e.preventDefault()}>
          {!hideEmail && (
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
                className="text-black dark:text-white"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          )}

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
                className="text-black dark:text-white"
                placeholder="Enter your First Name"
                value={formData.firstName}
                onChange={handleChange}
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
                className="text-black dark:text-white"
                isRequired
                placeholder="Enter your Last Name"
                value={formData.lastName}
                onChange={handleChange}
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
                className="text-black dark:text-white"
                isRequired
                placeholder="Lane 1, Street 1"
                value={formData.address}
                onChange={handleChange}
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
                className="text-black dark:text-white"
                placeholder="Apartment, Studio, or floor"
                value={formData.apt}
                onChange={handleChange}
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
                className="text-black dark:text-white"
                placeholder="Enter Your City"
                value={formData.city}
                onChange={handleChange}
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
                className="text-black dark:text-white"
                isRequired
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
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
                className="text-black dark:text-white"
                isRequired
                placeholder="12345"
                value={formData.postCode}
                onChange={handleChange}
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
                className="text-black dark:text-white"
                isRequired
                placeholder="+1 (555) 555-5555"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="w-full h-auto lg:order-1 p-6 lg:p-12 flex align-middle justify-center flex-col">
        <h2 className="text-2xl font-bold mb-6 text-white dark:text-black">
          Cart Items
        </h2>
        <MiniCart />
        <br />

        {isFormValid && (
          <PayPalButtons
            className="rounded-full"
            style={{
              layout: "vertical",
              color: "gold",
              shape: "pill",
              label: "pay",
            }}
            createOrder={async (data, actions) => {
              const formattedTotal = parseFloat(cartTotal).toFixed(2);

              try {
                const wooCommerceOrder = await createOrderWoocommerce(
                  formData,
                  formattedTotal,
                  lineItems
                );

                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: formattedTotal,
                      },
                      custom_id: wooCommerceOrder.id,
                    },
                  ],
                  intent: "CAPTURE",
                });
              } catch (error) {
                console.error("Error creating orders:", error);
                toast.error("Error creating order. Please try again.", {
                  position: "top-center",
                  theme: "dark",
                  autoClose: 5000,
                });
                throw error;
              }
            }}
            onApprove={async (data, actions) => {
              if (!actions.order) {
                throw new Error("PayPal order actions not available");
              }

              try {
                const order = await actions.order.capture();
                handleApprove(order.id!, wooCommerceOrderIdRef.current!);
              } catch (error) {
                console.error("Error capturing order:", error);
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "Payment failed. Please try again.",
                  {
                    position: "top-center",
                    theme: "dark",
                    autoClose: 5000,
                  }
                );
              }
            }}
            onError={(err) => {
              console.error("PayPal Button Error:", err);
              toast.error("An error occurred with PayPal. Please try again.", {
                position: "top-center",
                theme: "dark",
                autoClose: 5000,
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CheckoutCustomer;
