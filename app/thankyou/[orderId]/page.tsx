'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardHeader, CardBody } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import LottieAnimation from '../../component/LottieAnimation'
import axios from 'axios'

import { useCart } from '../../../context/cartcontext';
import { useCartKey } from '../../../hooks/useCartKey';

// test url : http://localhost:3000/thankyou/114

export default function ThankYouPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.orderId as string
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { cartKey } = useCartKey()
  const { fetchCartDetails } = useCart()

  // Function to fetch cart details
  const fetch_Cart_Details = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`
      const response = await axios.get(url, { params: { cart_key: cartKey } })
      await fetchCartDetails(cartKey) // Refresh cart data after adding an item
    } catch (err) {
      console.error('Error fetching cart details:', err)
    }
  }

  // Function to clear cart
  const clearCart = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/clear`
      await axios.post(url, {}, { params: { cart_key: cartKey } })
      await fetchCartDetails(cartKey) // Refresh cart data after clearing
      fetch_Cart_Details()
    } catch (err) {
      console.error('Error clearing cart:', err)
    }
  }

  useEffect(() => {
    const validateAndFetchOrder = async () => {
      if (!orderId) {
        router.push('/')
        return
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/trackorder?id=${orderId}`
        )
        if (response.data) {
          setOrderDetails(response.data)
          await clearCart()
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Error fetching order details:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    validateAndFetchOrder()
  }, [orderId, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-center text-white bg-black">Loading...</div>
  }

  if (!orderDetails) {
    return null // Prevent rendering if orderDetails is not available
  }

  const { billing, line_items, total, payment_method, date_created } = orderDetails

  return (
    <div className="min-h-screen text-white bg-black flex items-center justify-center p-4 relative z-10">
      <Card className="w-full max-w-4xl bg-black text-white shadow-xl">
        <CardHeader className="text-center flex flex-col items-center justify-center p-6  rounded-t-xl">
          <div className="mx-auto mb-4 w-60 h-60 flex items-center justify-center">
            <LottieAnimation />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Thank You for Your Order!</h2>
          <p className="text-gray-400">
            Your payment has been confirmed and your order is now being processed.
          </p>
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <Divider className="my-2" />
                <p className="flex justify-between"><span>Invoice Number:</span> <strong>{orderId}</strong></p>
                <p className="flex justify-between"><span>Total Amount:</span> <strong>${total}</strong></p>
                <p className="flex justify-between"><span>Payment Method:</span> <strong>{payment_method}</strong></p>
                <p className="flex justify-between"><span>Order Date:</span> <strong>{new Date(date_created).toLocaleDateString()}</strong></p>
              </div>
              <div className="p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Shipping Details</h3>
                <Divider className="my-2" />
                <p>
                  {billing.first_name} {billing.last_name}<br />
                  {billing.address_1}, {billing.address_2}<br />
                  {billing.city}, {billing.state}, {billing.postcode}<br />
                  {billing.country}<br />
                  Phone: {billing.phone}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Items Ordered</h3>
              <Divider className="my-2" />
              <ul className="space-y-2">
                {line_items.map((item: any) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>
                      <strong>{item.name}</strong> (x{item.quantity})
                    </span>
                    <span>${item.total}</span>
                  </li>
                ))}
              </ul>
              <Divider className="my-4" />
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Button 
              as="a" 
              href="/" 
              className="bg-white text-black px-6 py-2 rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
