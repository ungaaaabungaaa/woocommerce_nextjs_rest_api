'use client'

import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { Input } from "@nextui-org/input";
import MiniCart from '../component/minicart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useCartKey } from '../../hooks/useCartKey';
import { useRouter } from "next/navigation";

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


// on capture make the api with the trascation details & Paypal Details 
// then route the thank you page & Clear the cart


function Checkout() {
  
  const { cartKey } = useCartKey();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [cartTotal, setCartTotal] = useState<string>("0.00");
  const [lineItems, setLineItems] = useState<{ product_id: number; quantity: number }[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const wooCommerceOrderIdRef = useRef(null);
    const router = useRouter();

  


  const createOrderWoocommerce = async (formData: any, formattedTotal: string, lineItems: any[]) => {
    
    try {
      // Prepare the order data
      const orderData = {
        payment: {
          method: 'Paypal',
          title: 'PayPal Payment',
          transactionID: '',
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
            method_id: 'flat_rate',
            method_title: 'Flat Rate',
            total: '0'
          }
        ]
      };
  
      // Make the API call
      const response = await axios.post('/api/placeorder', orderData);
      // Log the order ID from the response
      console.log('Order created successfully! Order ID:', response.data.id);
      wooCommerceOrderIdRef.current = response.data.id;
      return response.data;

    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
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

 
  const handleApprove = async (paypalOrderId: string, woocommerceOrderId: string) => {
    console.log("PayPal Order ID:", paypalOrderId);
    console.log("WooCommerce Order ID:", woocommerceOrderId);
  
    try {
      // Construct the API URL
      const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/paymentcompleted?orderId=${woocommerceOrderId}&transactionId=${paypalOrderId}`;
      
      // Make the API call using axios.put instead of axios.get
      const response = await axios.put(apiUrl);
  
      // Check if the response is successful
      if (response.status === 200) {

        // Display a success toast
        toast.success("Payment processed successfully!", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });

        // Dynamically route to the thank you page
      router.push(`/thankyou/${woocommerceOrderId}`);


      } else {
        // Handle non-200 status responses
        toast.error("Payment processed, but there was an issue!", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    } catch (error) {
      // Handle API call errors
      console.error("Error during API call:", error);
      
      // More detailed error handling
      if (axios.isAxiosError(error)) {
        const serverError = error.response;
        if (serverError) {
          toast.error(`Payment error: ${serverError.data.error}`, {
            position: "top-center",
            theme: "dark",
            autoClose: 5000,
          });
        } else {
          toast.error("Network error. Please try again later.", {
            position: "top-center",
            theme: "dark",
            autoClose: 5000,
          });
        }
      } else {
        toast.error("Failed to process payment. Please try again later.", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
      }
    }
  };



  






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
          createOrder={async (data, actions) => {
            const formattedTotal = parseFloat(cartTotal).toFixed(2);
            
            try {
              // Create WooCommerce order first
              const wooCommerceOrder = await createOrderWoocommerce(formData, formattedTotal, lineItems);
         
              // Then create PayPal order
              return actions.order.create({
                
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: formattedTotal,
                    },
                    custom_id: wooCommerceOrder.id, // Passing WooCommerce order ID as custom_id
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
              // Call handleSubmit with the captured order ID and WooCommerce Order ID
              handleApprove(order.id, wooCommerceOrderIdRef.current);
  
            } catch (error) {
              console.error("Error capturing order:", error);
              toast.error(
                error instanceof Error ? error.message : "Payment failed. Please try again.", 
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

export default Checkout;