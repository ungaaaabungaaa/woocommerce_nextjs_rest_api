'use client'

import { useCartKey } from '../../hooks/useCartKey'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Button } from '@nextui-org/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CartItem {
  item_key: string
  id: number
  name: string
  desc:string
  price: string
  quantity: { value: number }
  featured_image: string
}

interface CartData {
  items: CartItem[]
  totals: { 
    subtotal: string
    total: string
  }
}

export default function Cart() {
  const { cartKey, loading, error } = useCartKey()
  const [cartData, setCartData] = useState<CartData | null>(null)

  useEffect(() => {
    if (cartKey) {
      fetchCartDetails()
    }
  }, [cartKey])

  const fetchCartDetails = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart`
      const response = await axios.get(url, { params: { cart_key: cartKey } })
      setCartData(response.data)
    } catch (err) {
      console.error('Error fetching cart details:', err)
    }
  }

  const updateItemQuantity = async (itemKey: string, quantity: number) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`;
      const response = await axios({
        method: 'post',
        url: url,
        data: { quantity: quantity.toString() }, // Convert number to string
        headers: { 'Content-Type': 'application/json' },
        params: { cart_key: cartKey }
      });
  
      fetchCartDetails();
      return response.data;
    } catch (err: any) {
      console.error("Error:", err.response?.data);
      throw err;
    }
  };
  

  const removeItem = async (itemKey: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`
      await axios.delete(url, { params: { cart_key: cartKey } })
      fetchCartDetails()
    } catch (err) {
      console.error('Error removing item:', err)
    }
  }

  const clearCart = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/clear`
      await axios.post(url, {}, { params: { cart_key: cartKey } })
      fetchCartDetails()
    } catch (err) {
      console.error('Error clearing cart:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading cart. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Your Cart ({cartData?.items.length || 0})
        </h1>
        
        {cartData && cartData.items.length > 0 ? (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartData.items.map((item) => (
                <div key={item.item_key} className="bg-card rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.featured_image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.name}</h3>
                        <h3 className="font-medium">{item.desc}</h3>
                        <p className="text-lg font-semibold">
                          ${parseFloat(item.price) / 100}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center  rounded-full">
                          <button
                            onClick={() => updateItemQuantity(item.item_key, item.quantity.value - 1)}
                            className="p-2"
                            disabled={item.quantity.value <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-medium">{item.quantity.value}</span>
                          <button
                            onClick={() => updateItemQuantity(item.item_key, item.quantity.value + 1)}
                            className="p-2"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <Button
                          onClick={() => removeItem(item.item_key)}
                         
                          size="sm"
                          className="flex items-center gap-2 bg-red rounded-full text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-card rounded-lg p-6 space-y-4 shadow-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${parseFloat(cartData.totals.subtotal) / 100}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">$10.00</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${(parseFloat(cartData.totals.total) / 100 + 10).toFixed(2)}</span>
              </div>

              <Button className="w-full rounded-full bg-white text-black" size="lg">
                Checkout
              </Button>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button  onClick={() => window.history.back()} className="w-full sm:w-auto bg-black text-white">
                Continue Shopping
              </Button>
              <Button  onClick={clearCart} className="w-full rounded-full bg-red text-white sm:w-auto">
                Clear Cart
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => window.history.back()}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

