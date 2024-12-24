"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCartKey } from "../../hooks/useCartKey";

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

export default function MiniCart() {
  const { cartKey, loading, error } = useCartKey();
  const [cartData, setCartData] = useState<CartData | null>(null);

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
      console.error("Error fetching cart details:", err);
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>Error loading cart. Please try again.</p>;
  }

  return (
    <div className="bg-black dark:bg-white text-white dark:text-black rounded-lg  p-4">
      {cartData && cartData.items.length > 0 ? (
        <div>
          {cartData.items.map((item) => (
            <div key={item.item_key} className="flex items-center mb-4 pb-4">
              <div className="relative w-16 h-16 mr-4">
                <Image
                  src={item.featured_image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm ">
                  Qty: {item.quantity.value} x ${parseFloat(item.price) / 100}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  $
                  {(
                    (parseFloat(item.price) * item.quantity.value) /
                    100
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-4 pt-4">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">
                ${parseFloat(cartData.totals.subtotal) / 100}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium">Total</span>
              <span className="font-semibold">
                ${parseFloat(cartData.totals.total) / 100}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
