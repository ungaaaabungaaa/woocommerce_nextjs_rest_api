'use client'
import React, { useState, ChangeEvent } from 'react';
import { Input } from "@nextui-org/input";
import MiniCart from '../component/minicart';
import { ToastContainer, toast } from 'react-toastify';
import { PayPalButtons } from "@paypal/react-paypal-js"



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

function Checkout() {
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
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };



  const handleSubmit = () => {
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
      console.log(
        "Missing fields:",
        missingFields.map((key) => requiredFields[key as keyof FormData]).join(", ")
      );
      return;
    }

    console.log("Form submitted successfully!", formData);
  };

  const [isPaid, setIsPaid] = useState(false)

  const handleApprove = (orderId: string) => {
    // Call your backend to process the order
    setIsPaid(true)
  }

  if (isPaid) {
    return <div>Thank you for your purchase!</div>
  }

  return (
    <div className="flex flex-col lg:flex-row-reverse lg:space-x-4">
      <div className="w-full h-auto lg:order-2 p-6 lg:p-12 flex align-middle justify-start flex-col">
        <h1 className="text-3xl font-bold mb-6">Chekout Form</h1>
        <h3 className="text-1xl text-gray-400 mb-6">Shipping Information</h3>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            isClearable
            size="lg"
            isRequired
            className="mt-1 w-full"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <br />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white">
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              isClearable
              size="lg"
              isRequired
              className="mt-1 w-full bg-black text-white"
              placeholder="Enter your First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-white">
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              isClearable
              size="lg"
              isRequired
              className="mt-1 w-full bg-black text-white"
              placeholder="Enter your Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="address" className="block text-sm font-medium text-white">
              Address
            </label>
            <Input
              id="address"
              name="address"
              type="text"
              isClearable
              size="lg"
              isRequired
              className="mt-1 w-full bg-black text-white"
              placeholder="Lane 1, Street 1"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="apt" className="block text-sm font-medium text-white">
              Apt, suite, etc.
            </label>
            <Input
              id="apt"
              name="apt"
              type="text"
              isClearable
              size="lg"
              className="mt-1 w-full bg-black text-white"
              placeholder="Apartment, Studio, or floor"
              value={formData.apt}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="city" className="block text-sm font-medium text-white">
              City
            </label>
            <Input
              id="city"
              name="city"
              type="text"
              isClearable
              size="lg"
              className="mt-1 w-full bg-black text-white"
              placeholder="Enter Your City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="country" className="block text-sm font-medium text-white">
              Country
            </label>
            <Input
              id="country"
              name="country"
              type="text"
              isClearable
              size="lg"
              isRequired
              className="mt-1 w-full bg-black text-white"
              placeholder="Enter Country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="postCode" className="block text-sm font-medium text-white">
              PostCode
            </label>
            <Input
              id="postCode"
              name="postCode"
              type="text"
              isClearable
              size="lg"
              isRequired
              className="mt-1 w-full bg-black text-white"
              placeholder="12345"
              value={formData.postCode}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">
              PhoneNumber
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              isClearable
              size="lg"
              isRequired
              className="mt-1 w-full bg-black text-white"
              placeholder="+1 (5555) 5555-5555"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        


       
      </div>
      <div className="w-full h-auto lg:order-1 p-6 lg:p-12 flex align-middle justify-center flex-col">
      <h1 className="text-2xl font-bold mb-6">Cart Items</h1>
       <MiniCart></MiniCart>
        <br></br>
        <button
          type="button"
          className="bg-white text-black px-4 py-2 rounded-full"
          onClick={handleSubmit}
        >
          Checkout
        </button>
        <br></br>

        <PayPalButtons 
        
        className='rounded-full'
       style={{ 
        layout: "vertical",
        color: "gold",
        shape: "pill",
        label: "pay",
       }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // The amount to charge
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          handleApprove(data.orderID);
        }}
      />

        
      </div>
    </div>
  );
}



export default Checkout;


// once only all the feilds are filled allow paypal button to be cliked 
// tosat all the error feild properly
// once paypal captures the order ID 
// take the order id , cartitems , form data .. use the woocommerce create order api endpoint 
// once order is confirmed get the woocommerce order id 
// clear the cart 
// thank you page redirection 




