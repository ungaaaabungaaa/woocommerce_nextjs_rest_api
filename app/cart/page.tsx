'use client'

import { useCartKey } from '../../hooks/useCartKey';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import Image from 'next/image';
import { Divider } from "@nextui-org/divider";

interface CartItem {
  item_key: string;
  id: number;
  name: string;
  price: string;
  quantity: { value: number };
  featured_image: string;
}

interface CartData {
  items: CartItem[];
  totals: { 
    subtotal: string;
    total: string;
  };
}

function Cart() {
  const { cartKey, loading, error } = useCartKey();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [couponCode, setCouponCode] = useState('');

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
    } catch (err) {
      console.error('Error fetching cart details:', err);
    }
  };

  const updateItemQuantity = async (itemKey: string, quantity: number) => {
    // try {
    //   // cart/item/<item_key>
    //   const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`;
    //   await axios.post(url, { quantity }, { params: { cart_key: cartKey } });
    //   console.log('Updated item ID:', itemKey);
    //   fetchCartDetails();
    // } catch (err) {
    //   console.error('Error updating item quantity:', err);
    // }
    console.log(itemKey);
  };

  const removeItem = async (itemKey: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/item/${itemKey}`;
      await axios.delete(url, { params: { cart_key: cartKey } });
      fetchCartDetails();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const clearCart = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cocart/v2/cart/clear`;
      await axios.post(url, {}, { params: { cart_key: cartKey } });
      fetchCartDetails();
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const applyCoupon = async () => {
    // Implement coupon logic here
    console.log('Applying coupon:', couponCode);
  };

  

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-center">Your Shopping Cart</h1>
        {cartData && cartData.items.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <Card className="mb-4">
                <CardBody className='bg-black'>
                  <Table aria-label="Cart items">
                    <TableHeader className='bg-black text-white'>
                      <TableColumn className='bg-black text-white'>CART</TableColumn>
                      <TableColumn className='bg-black text-white'>PRICE</TableColumn>
                      <TableColumn className='bg-black text-white'>QUANTITY</TableColumn>
                      <TableColumn className='bg-black text-white'>TOTAL</TableColumn>
                      <TableColumn className='bg-black text-white'>REMOVE</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {cartData.items.map((item) => (
                        <TableRow key={item.item_key}>
                          <TableCell>
                            <div className="flex items-center">
                              <Image
                                src={item.featured_image}
                                alt={item.name}
                                width={60}
                                height={60}
                                className="rounded-md mr-4"
                              />
                              <span>{item.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>${parseFloat(item.price) / 100}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Button className='bg-black text-white' size="sm" onClick={() => updateItemQuantity(item.item_key, item.quantity.value - 1)}>-</Button>
                              <span className="mx-2">{item.quantity.value}</span>
                              <Button className='bg-black text-white' size="sm" onClick={() => updateItemQuantity(item.item_key, item.quantity.value + 1)}>+</Button>
                            </div>
                          </TableCell>
                          <TableCell>${(parseFloat(item.price) * item.quantity.value / 100).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button size="sm" color="danger" onClick={() => removeItem(item.item_key)}>Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
              <div className="flex justify-between items-center">
                <Button color="primary" className='text-black bg-white rounded-full' onClick={() => window.history.back()}>Continue Shopping</Button>
                <Button color="danger" className='text-white  rounded-full' onClick={clearCart}>Clear Cart</Button>
              </div>
            </div>
            <div className="md:w-1/3">
              <Card className='bg-black text-white'>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${parseFloat(cartData.totals.subtotal) / 100}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Divider className="my-4" />
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${parseFloat(cartData.totals.total) / 100}</span>
                  </div>
                  <div className="mb-4">
                    <Input
                      isClearable
                      isRequired
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button className="mt-2 w-full rounded-full bg-white text-black" onClick={applyCoupon}>Apply Coupon</Button>
                  </div>
                  <Button className="mt-2 w-full rounded-full bg-white text-black">Proceed to Checkout</Button>
                </CardBody>
              </Card>
            </div>
          </div>
        ) : (
          <Card className='bg-black text-white border-none outline-none'>
            <CardBody className='bg-black text-white border-none outline-none'>
              <p className="text-center">Your cart is empty.</p>
              <Button  className="mt-4 bg-white text-black rounded-full mx-auto block" onClick={() => window.history.back()}>Continue Shopping</Button>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Cart;