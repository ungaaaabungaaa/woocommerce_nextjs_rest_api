"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cartcontext"; // Adjust the import path as necessary

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
  const { cartData, loading, error, fetchCartDetails } = useCart();

  useEffect(() => {
    if (!loading && !error) {
      fetchCartDetails();
    }
  }, [fetchCartDetails, loading, error]);

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
                  {cartData.items.map((product: any) => (
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
                <div className="pt-3 mt-2 ">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => (window.location.href = "/cart")}
                      className="w-1/2 text-center bg-white text-black dark:bg-black dark:text-white  rounded-full "
                    >
                      Bag
                    </button>
                    <button
                      onClick={() => (window.location.href = "/checkout")}
                      className="w-1/2 text-center bg-red text-white py-2 px-4  rounded-full "
                    >
                      Go to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </nav>
    </div>
  );
}
