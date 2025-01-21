"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
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

export function CartPopUp() {
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

  return (
    <div className="w-full text-white bg-transparent z-40 sticky top-12 dark:text-black">
      <nav className="container mx-auto mt-1 max-w-7xl">
        <div className="flex align-middle items-end flex-col">
          {cartData && cartData.items.length === 0 ? (
            <div className="w-1/5 bg-black dark:bg-white p-4 rounded-lg border border-gray-700 dark:border-gray-200">
              <div className="w-full pb-2">
                <div className="bg-black text-white dark:bg-white dark:text-black">
                  <p className="text-start text-gray-200 dark:text-gray-700">
                    Your Cart Is Empty
                  </p>
                  <p className="text-start text-gray-200 dark:text-gray-700 text-sm mt-2">
                    0 products
                  </p>
                </div>
              </div>
            </div>
          ) : (
            cartData && (
              <div className="w-2/5 bg-black dark:bg-white p-4 rounded-lg border border-gray-700 dark:border-gray-200">
                <div className="border-b border-gray-700 dark:border-gray-200 pb-2">
                  <h2 className="font-semibold">Your Cart</h2>
                  <p className="text-sm text-gray-200 dark:text-gray-700">
                    {cartData.items.length} items
                  </p>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {cartData.items.map((product) => (
                    <div
                      key={product.item_key}
                      className="flex gap-4 py-4 border-b border-gray-700 dark:border-gray-200 group"
                    >
                      <div className="relative w-20 h-20 bg-gray-50 rounded">
                        <Image
                          src={product.featured_image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-medium font-semibold mt-1">
                          {product.name}
                        </p>
                        <p className="text-sm">${product.price}</p>
                        <p className="text-sm">
                          Quantity: {product.quantity.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 mt-2 border-t border-gray-700 dark:border-gray-200">
                  {/* add two buttons here  */}
                </div>
              </div>
            )
          )}
        </div>
      </nav>
    </div>
  );
}
