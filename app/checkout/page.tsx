'use client'

import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input } from "@nextui-org/input";
import MiniCart from '../component/minicart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useCartKey } from '../../hooks/useCartKey';

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


function Checkout() {
  
  const { cartKey, loading, error } = useCartKey();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [cartTotal, setCartTotal] = useState<string>("0.00");
  const [lineItems, setLineItems] = useState<{ product_id: number; quantity: number }[]>([]);


  const [isFormValid, setIsFormValid] = useState(false);


  const createOrderWoocommerce = async (formData: FormData, formattedTotal: string, lineItems: any[]) => {
    console.log('Form Data:', formData);
    console.log('Total:', formattedTotal);
    console.log('Line Items:', lineItems);
  };







  useEffect(() => {
    if (cartKey) {
      fetchCartDetails();
    }
  }, [cartKey]);

  const formatLineItems = (cartItems: CartItem[]) => {
    return cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity.value
    }));
  };

  const fetchCartDetails = async () => {
    try 
    {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`;
      const response = await axios.get(url, { params: { cart_key: cartKey } });
      setCartData(response.data);
      const rawTotal = response.data.totals.total;
      const cleanedTotal = (typeof rawTotal === 'number' ? rawTotal : parseFloat(rawTotal)) / 100;
      const formattedTotal = cleanedTotal.toFixed(2);
      const formattedLineItems = formatLineItems(response.data.items);
      setLineItems(formattedLineItems); // Store lineItems in state
      setCartTotal(formattedTotal);
    } catch (err) {
      console.error('Error fetching cart details:', err);
    }
  };

  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    country: "",
    postCode: "",
    phoneNumber: ""
  });

  const [isPaid, setIsPaid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Check form validity
    const requiredFields: (keyof FormData)[] = [
      'email', 'firstName', 'lastName', 'address', 
      'city', 'country', 'postCode', 'phoneNumber'
    ];
    const allFieldsFilled = requiredFields.every(field => 
      updatedFormData[field]?.trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields: Record<keyof FormData, string> = {
      email: "Email address",
      firstName: "First Name",
      lastName: "Last Name",
      address: "Address",
      apt: "Apt, suite, etc.",
      country: "Country",
      postCode: "PostCode",
      phoneNumber: "PhoneNumber",
      city: "City"
    };
  
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !formData[key as keyof FormData]?.trim()
    );
  
    if (missingFields.length > 0) {
      const errorMessage = `Missing fields: ${missingFields
        .map((key) => requiredFields[key as keyof FormData])
        .join(", ")}`;
  
      toast.error(errorMessage, {
        position: "top-center",
        theme: "dark",
        autoClose: 5000,
      });
  
      return;
    }
  
    toast.success("Form submitted successfully!", {
      position: "top-center",
      theme: "dark",
      autoClose: 5000,
    });
  
    console.log("Form submitted successfully!", formData);
  };

  const handleApprove = (orderId: string) => {
    setIsPaid(true);
  };

  if (isPaid) {
    return <div>Thank you for your purchase!</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row-reverse lg:space-x-4">
      <ToastContainer />
      <div className="w-full h-auto lg:order-2 p-6 lg:p-12 flex align-middle justify-start flex-col">
        <h1 className="text-3xl font-bold mb-6">Checkout Form</h1>
        <h3 className="text-xl text-gray-400 mb-6">Shipping Information</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              isRequired
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                isRequired
                placeholder="Enter your First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                isRequired
                placeholder="Enter your Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
                Address
              </label>
              <Input
                id="address"
                name="address"
                type="text"
                isRequired
                placeholder="Lane 1, Street 1"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="apt" className="block text-sm font-medium text-white mb-1">
                Apt, suite, etc.
              </label>
              <Input
                id="apt"
                name="apt"
                type="text"
                placeholder="Apartment, Studio, or floor"
                value={formData.apt}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="city" className="block text-sm font-medium text-white mb-1">
                City
              </label>
              <Input
                id="city"
                name="city"
                type="text"
                isRequired
                placeholder="Enter Your City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
                Country
              </label>
              <Input
                id="country"
                name="country"
                type="text"
                isRequired
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="postCode" className="block text-sm font-medium text-white mb-1">
                PostCode
              </label>
              <Input
                id="postCode"
                name="postCode"
                type="text"
                isRequired
                placeholder="12345"
                value={formData.postCode}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-1">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
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
        <h2 className="text-2xl font-bold mb-6">Cart Items</h2>
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
          createOrder={(data, actions) => {
            const formattedTotal = parseFloat(cartTotal).toFixed(2);
            console.log("Creating order with amount:", formattedTotal);
            createOrderWoocommerce(formData, formattedTotal, lineItems);
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: formattedTotal,
                  },
                },
              ],
              intent: "CAPTURE",
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const order = await actions.order?.capture();
              console.log("Order captured successfully:", order);
              handleApprove(data.orderID);
            } catch (error) {
              console.error("Error capturing order:", error);
              toast.error("Payment failed. Please try again.", {
                position: "top-center",
                theme: "dark",
                autoClose: 5000,
              });
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

export default Checkout;