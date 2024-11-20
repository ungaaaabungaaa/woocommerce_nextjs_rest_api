"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';

// Mock API call
const fetchOrderDetails = async (orderNumber: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  // This is where you'd typically make an API call
  // For this example, we'll return mock data based on the provided API response
  return {
    id: 727,
    number: "727",
    status: "processing",
    date_created: "2017-03-22T16:28:02",
    total: "329.35",
    billing: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US",
      email: "john.doe@example.com",
      phone: "(555) 555-5555"
    },
    line_items: [
      { name: "Woo Single #1", quantity: 2, total: "68.00" },
      { name: "Ship Your Idea – Color: Black, Size: M Test", quantity: 1, total: "12.00" },
      { name: "Woo Single #1", quantity: 2, total: "21.00" },
      { name: "Ship Your Idea – Color: Black, Size: M Test", quantity: 1, total: "12.00" },
      { name: "Woo Single #52", quantity: 2, total: "21.00" },
      { name: "Ship Your Idea – Color: Black, Size: M Test", quantity: 4, total: "12.00" },
    ],
    shipping_total: "123.00"
  }
}

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setOrderDetails(null)

    try {
      const details = await fetchOrderDetails(orderNumber)
      setOrderDetails(details)
    } catch (err) {
      setError("Failed to fetch order details. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <br></br>
    <br></br>
    <br></br>
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="flex align-middle justify-center flex-col">
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-lg font-semibold">Track Your Order</h3>
              <p className="text-sm text-gray-500">
                Enter your order number to see the details
              </p>
              <h3 className="text-lg font-semibold">Order Number</h3>
              <Input
                isRequired
                isClearable
                id="orderNumber"
                placeholder="Enter your order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Track Order"}
            </Button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {orderDetails && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <p>Order Number: {orderDetails.number}</p>
              <p>Status: {orderDetails.status}</p>
              <p>Date: {new Date(orderDetails.date_created).toLocaleDateString()}</p>
              <p>Total: ${orderDetails.total}</p>

              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc pl-5">
                {orderDetails.line_items.map((item: any, index: number) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}, Total: ${item.total}
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold">Shipping Address:</h4>
              <p>
                {orderDetails.billing.first_name} {orderDetails.billing.last_name}
                <br />
                {orderDetails.billing.address_1}
                <br />
                {orderDetails.billing.city}, {orderDetails.billing.state} {orderDetails.billing.postcode}
                <br />
                {orderDetails.billing.country}
              </p>

              <p>Shipping Total: ${orderDetails.shipping_total}</p>
            </div>
          )}
        </CardBody>
        <CardFooter>
          <p className="text-sm text-gray-500">
            If you have any questions about your order, please contact our support team.
          </p>
        </CardFooter>
      </Card>
    </div>
    <br></br>
    <br></br>
    <br></br>
    </>
  )
}